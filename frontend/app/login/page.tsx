"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://127.0.0.1:8000/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        setError(
          data.message || "Invalid email or password."
        );
        return;
      }

      /*
       * Laravel Sanctum should return the token.
       * Usually the response contains:
       *
       * {
       *   message: "...",
       *   user: {...},
       *   token: "..."
       * }
       */

      const token = data.token || data.access_token;

      if (!token) {
        console.error("No token received:", data);
        setError("Login succeeded but no authentication token was returned.");
        return;
      }

      // Store authentication token
      localStorage.setItem("token", token);

      // Store user information if returned
      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // Go to student dashboard
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      setError(
        "Could not connect to Laravel API. Make sure Laravel is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginBottom: "8px" }}>
          Login
        </h1>

        <p
          style={{
            marginBottom: "24px",
            color: "#666",
          }}
        >
          Login to Student Management
        </p>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#b91c1c",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: loading
                ? "#999"
                : "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}