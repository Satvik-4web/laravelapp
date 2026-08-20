"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError(data.message || "Invalid credentials");
        } else if (response.status === 422) {
          setError(data.message || "Validation errors occurred");
        } else {
          setError("An unexpected server error occurred.");
        }
        return;
      }

      // Save token and user details to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to correct dashboard
      const role = data.user.role;
      if (role === "Admin") {
        router.push("/admin/dashboard");
      } else if (role === "Principal") {
        router.push("/principal/dashboard");
      } else if (role === "HOD") {
        router.push("/hod/dashboard");
      } else if (role === "Faculty") {
        router.push("/faculty/dashboard");
      } else if (role === "Student") {
        router.push("/student/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setError("Could not connect to Laravel API. Please verify the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-container">
      <div className="login-card">
        <div className="badge">SECURE AUTHENTICATION</div>
        <h1>Welcome Back</h1>
        <p>Login to your Student Management Portal</p>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="e.g. admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Sign In"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f1f5f9;
          font-family: Arial, Helvetica, sans-serif;
          padding: 20px;
        }
        .login-card {
          width: 100%;
          max-width: 440px;
          background: #ffffff;
          padding: 40px;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
          text-align: center;
        }
        .badge {
          display: inline-block;
          background: #e0e7ff;
          color: #4338ca;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }
        h1 {
          margin: 0;
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -1px;
        }
        p {
          color: #64748b;
          font-size: 15px;
          margin-top: 8px;
          margin-bottom: 30px;
        }
        .error-alert {
          background: #fee2e2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 12px;
          border-radius: 9px;
          font-size: 14px;
          margin-bottom: 20px;
          text-align: left;
        }
        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }
        label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #334155;
          margin-bottom: 8px;
        }
        input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          outline: none;
          font-size: 14px;
          color: #0f172a;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }
        input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
        }
        .login-button {
          width: 100%;
          background: #4f46e5;
          color: #ffffff;
          border: none;
          padding: 14px;
          font-size: 15px;
          font-weight: 700;
          border-radius: 9px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .login-button:hover {
          background: #4338ca;
        }
        .login-button:disabled {
          background: #a5b4fc;
          cursor: not-allowed;
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
