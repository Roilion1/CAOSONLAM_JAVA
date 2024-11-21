import { AuthProvider } from "react-admin";
import axios from "axios";

interface LoginParams {
    username: string;
    password: string;
}

interface CheckParamsErr {
    status: number;
}

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    login: async ({ username, password }: LoginParams) => {
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                email: username,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            // Store the JWT token in local storage
            const token = response.data["jwt-token"];
            if (!token) {
                throw new Error("Token không tồn tại.");
            }
            localStorage.setItem("jwt-token", token);
            localStorage.setItem("username", username);

            // Fetch user data to get cartId
            const userResponse = await axios.get(`http://localhost:8080/api/public/users/email/${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const cartId = userResponse.data.cart?.cartId;
            if (cartId) {
                localStorage.setItem("cartId", cartId);
            }

            return Promise.resolve();
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            return Promise.reject(new Error("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại."));
        }
    },

    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem("jwt-token");
        localStorage.removeItem("username");
        localStorage.removeItem("cartId");
        return Promise.resolve();
    },

    // called when the API returns an error
    checkError: ({ status }: CheckParamsErr) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("jwt-token");
            localStorage.removeItem("username");
            localStorage.removeItem("cartId");
            return Promise.reject();
        }
        return Promise.resolve();
    },

    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        const token = localStorage.getItem("jwt-token");
        return token ? Promise.resolve() : Promise.reject();
    },

    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};

// Optional: Set up Axios interceptor to always include the token in headers
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem("jwt-token");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
