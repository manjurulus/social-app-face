"use client";
import { useState } from "react";
import axios from "../lib/api";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });

      // Save user to localStorage
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);

      router.push("/"); // redirect to homepage
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px 30px",
          borderRadius: 8,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          width: 350,
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>SocialApp</h1>

        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
            {error}
          </p>
        )}

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: 10,
              marginBottom: 15,
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: 10,
              marginBottom: 15,
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            style={{
              padding: 10,
              backgroundColor: "#1877f2",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Log In
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 15 }}>
          <a
            href="/register"
            style={{ color: "#1877f2", textDecoration: "none" }}
          >
            Create new account
          </a>
        </p>
      </div>
    </div>
  );
}
