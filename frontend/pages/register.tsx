import { useState } from "react";
import { useRouter } from "next/router";
import api from "../lib/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/register", {
        name,
        email,
        password,
      }); // ✅ backend port 5000

      alert("Registration successful! Please login.");
      router.push("/login"); // ✅ redirect to login page
    } catch (err: any) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <button type="submit">Register</button>
      </form>

      {/* ✅ Quick navigation links */}
      <div style={{ marginTop: "1rem" }}>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
        <p>
          Or go back to <a href="/">Feed</a>
        </p>
      </div>
    </div>
  );
}
