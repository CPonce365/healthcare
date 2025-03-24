import React from "react";

const Login = () => {
  return (
    <div className="container">
      <h2>Login</h2>
      <form>
        <input className="form-control mb-3" type="email" placeholder="Email" required />
        <input className="form-control mb-3" type="password" placeholder="Password" required />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
