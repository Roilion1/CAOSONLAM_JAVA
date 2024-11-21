// import React from 'react';
// const Register = () => (
//   <section className="section-content padding-y">
//     <div className="card mx-auto" style={{ maxWidth: 520, marginTop: 40 }}>
//       <article className="card-body">
//         <header className="mb-4"><h4 className="card-title">Sign up</h4></header>
//         <form>
//           <div className="form-row">
//             <div className="col form-group">
//               <label>First name</label>
//               <input type="text" className="form-control" placeholder />
//             </div>
//             <div className="col form-group">
//               <label>Last name</label>
//               <input type="text" className="form-control" placeholder />
//             </div>
//           </div>
//           <div className="form-group">
//             <label>Email</label>
//             <input type="email" className="form-control" placeholder />
//             <small className="form-text text-muted">We'll never share your email with anyone else.</small>
//           </div>
//           <div className="form-group">
//             <label className="custom-control custom-radio custom-control-inline">
//               <input className="custom-control-input" defaultChecked type="radio" name="gender" defaultValue="option1" />
//               <span className="custom-control-label"> Male </span>
//             </label>
//             <label className="custom-control custom-radio custom-control-inline">
//               <input className="custom-control-input" type="radio" name="gender" defaultValue="option2" />
//               <span className="custom-control-label"> Female </span>
//             </label>
//           </div>
//           <div className="form-row">
//             <div className="form-group col-md-6">
//               <label>City</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="form-group col-md-6">
//               <label>Country</label>
//               <select id="inputState" className="form-control">
//                 <option> Choose...</option>
//                 <option>Uzbekistan</option>
//                 <option>Russia</option>
//                 <option selected>United States</option>
//                 <option>India</option>
//                 <option>Afganistan</option>
//               </select>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group col-md-6">
//               <label>Create password</label>
//               <input className="form-control" type="password" />
//             </div>
//             <div className="form-group col-md-6">
//               <label>Repeat password</label>
//               <input className="form-control" type="password" />
//             </div>
//           </div>
//           <div className="form-group">
//             <button type="submit" className="btn btn-primary btn-block"> Register</button>
//           </div>
//           <div className="form-group">
//             <label className="custom-control custom-checkbox"> <input type="checkbox" className="custom-control-input" defaultChecked /> <div className="custom-control-label"> I am agree with <a href="#">terms and contitions</a></div> </label>
//           </div>
//         </form>
//       </article>
//     </div>
//     <p className="text-center mt-4">Have an account? <a href='/login'>Log In</a></p>
//     <br /><br />

//   </section>

// );
// export default Register

import React, { useState } from 'react';
import axios from 'axios';  // Đảm bảo bạn đã cài đặt axios

const Register = () => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    country: '',
    gender: 'option1'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu đăng ký đến máy chủ
      await axios.post('/api/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      // Đăng nhập ngay sau khi đăng ký thành công
      const response = await axios.post('/api/login', {
        email: formData.email,
        password: formData.password
      });

      // Lưu trữ thông tin đăng nhập (ví dụ: token) vào localStorage
      localStorage.setItem('token', response.data.token);

      // Cập nhật thông báo và điều hướng đến trang chính
      setMessage('Đăng ký thành công! Đang chuyển hướng...');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (error) {
      // Xử lý lỗi nếu có
      setMessage('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <section className="section-content padding-y">
      <div className="card mx-auto" style={{ maxWidth: 520, marginTop: 40 }}>
        <article className="card-body">
          <header className="mb-4">
            <h4 className="card-title">Sign up</h4>
          </header>
          {message && (
            <div className="alert alert-success">
              {message}
            </div>
          )}
          <form onSubmit={handleRegister}>
            <div className="form-row">
              <div className="col form-group">
                <label>First name</label>
                <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} />
              </div>
              <div className="col form-group">
                <label>Last name</label>
                <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
              <small className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label className="custom-control custom-radio custom-control-inline">
                <input className="custom-control-input" type="radio" name="gender" value="option1" checked={formData.gender === 'option1'} onChange={handleChange} />
                <span className="custom-control-label"> Male </span>
              </label>
              <label className="custom-control custom-radio custom-control-inline">
                <input className="custom-control-input" type="radio" name="gender" value="option2" checked={formData.gender === 'option2'} onChange={handleChange} />
                <span className="custom-control-label"> Female </span>
              </label>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>City</label>
                <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
              </div>
              <div className="form-group col-md-6">
                <label>Country</label>
                <select id="inputState" className="form-control" name="country" value={formData.country} onChange={handleChange}>
                  <option> Choose...</option>
                  <option>Uzbekistan</option>
                  <option>Russia</option>
                  <option>United States</option>
                  <option>India</option>
                  <option>Afganistan</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Create password</label>
                <input className="form-control" type="password" name="password" value={formData.password} onChange={handleChange} />
              </div>
              <div className="form-group col-md-6">
                <label>Repeat password</label>
                <input className="form-control" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block"> Register</button>
            </div>
            <div className="form-group">
              <label className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" defaultChecked />
                <div className="custom-control-label"> I am agree with <a href="#">terms and conditions</a></div>
              </label>
            </div>
          </form>
        </article>
      </div>
      <p className="text-center mt-4">Have an account? <a href='/login'>Log In</a></p>
      <br /><br />
    </section>
  );
};

export default Register;
