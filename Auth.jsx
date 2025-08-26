import { useState } from "react";
import { api } from "../lib/api";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const endpoint = mode === "register" ? "/auth/register" : "/auth/login";
      const { data } = await api.post(endpoint, { email, password });

      if (mode === "login") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("Login successful! Welcome " + data.user.email);
      } else {
        setMessage("Registration successful! Please login now.");
        setMode("login");
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(err.response ? err.response.data.error : "Something went wrong");
    }
  }

  return (
    <div className="container py-3">
      <h2 className="h4 mb-3">{mode === "register" ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="w-50">
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100">
          {mode === "register" ? "Register" : "Login"}
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}

      <button
        className="btn btn-link mt-2"
        onClick={() => setMode(mode === "register" ? "login" : "register")}
      >
        Switch to {mode === "register" ? "Login" : "Register"}
      </button>
    </div>
  );
}