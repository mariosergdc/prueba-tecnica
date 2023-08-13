import { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({ name: "", password: "" });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const login = (e) => {
    e.preventDefault();
    console.log("login");
  };
  return (
    <div className="login">
      <main className="login-box">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button onClick={login}>Login</button>
      </main>
    </div>
  );
};
export default Login;
