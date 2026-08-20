"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"}/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            current_password: currentPassword,
            password: password,
            password_confirmation: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Password change failed.");
        setIsError(true);
        return;
      }

      setMessage("Password changed successfully!");
      setIsError(false);

      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to Laravel API. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="change-pwd-container">
      <div className="change-pwd-card">
        <div className="badge">SECURITY SETTINGS</div>
        <h1>Change Password</h1>
        <p>Update your account password securely.</p>

        {message && (
          <div className={isError ? "alert alert-danger" : "alert alert-success"}>
            {message}
          </div>
        )}

        <form onSubmit={handleChangePassword}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              id="currentPassword"
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Change Password"}
          </button>
        </form>

        <button onClick={() => router.push("/dashboard")} className="back-link">
          ← Back to Dashboard
        </button>
      </div>

      <style jsx>{`
        .change-pwd-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f1f5f9;
          font-family: Arial, Helvetica, sans-serif;
          padding: 20px;
        }
        .change-pwd-card {
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
        .alert {
          padding: 12px;
          border-radius: 9px;
          font-size: 14px;
          margin-bottom: 20px;
          text-align: left;
        }
        .alert-danger {
          background: #fee2e2;
          border: 1px solid #fecaca;
          color: #dc2626;
        }
        .alert-success {
          background: #d1fae5;
          border: 1px solid #a7f3d0;
          color: #065f46;
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
        .submit-button {
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
        .submit-button:hover {
          background: #4338ca;
        }
        .submit-button:disabled {
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
        .back-link {
          margin-top: 20px;
          background: none;
          border: none;
          color: #4f46e5;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          display: inline-block;
        }
        .back-link:hover {
          color: #4338ca;
          text-decoration: underline;
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
