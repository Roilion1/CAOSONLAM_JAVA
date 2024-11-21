import React, { useState } from "react";
import { LOGIN } from "../../api/apiService";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const body = { email, password };

    try {
      const response = await LOGIN(body);

      if (response && response.data) {
        const token = response.data['jwt-token'];
        if (token) {
          localStorage.setItem('authToken', token);
          window.alert("Login successful!");
          navigate("/"); // Redirect to the homepage using navigate
        } else {
          window.alert("Token not found in response");
        }
      } else {
        window.alert("Login response is missing data");
      }
    } catch (error) {
      window.alert("Login failed: " + error.message);
    }
  };

  return (
    <section class="section-content padding-y" style={{ min_height: "85vh" }} >


      <div class="card mx-auto" style={{ width: '380px', margin_top: "100px" }}>
        <div class="card-body">
          <h4 class="card-title mb-4">Sign in</h4>
          <form onSubmit={handleSubmit}>
            <a href="#" class="btn btn-facebook btn-block mb-2"> <i class="fab fa-facebook-f"></i> &nbsp;  Sign in with Facebook</a>
            <a href="#" class="btn btn-google btn-block mb-4"> <i class="fab fa-google"></i> &nbsp;  Sign in with Google</a>
            <div class="form-group">
              <input name="email" className="form-control" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div class="form-group">
              <input name="password" className="form-control" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div class="form-group">
              <a href="#" class="float-right">Forgot password?</a>
              <label class="float-left custom-control custom-checkbox"> <input type="checkbox" class="custom-control-input" checked="" /> <div class="custom-control-label"> Remember </div> </label>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block"> Login  </button>
            </div>
          </form>
        </div>
      </div>

      <p class="text-center mt-4">Don't have account? <a href="#">Sign up</a></p>
      <br></br>



    </section>

  );
};
export default Login

