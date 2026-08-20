"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <main className="unauthorized-container">
      <div className="unauthorized-card">
        <div className="alert-icon">⚠️</div>
        <h1>Access Denied</h1>
        <p>You do not have permission to access this resource.</p>
        
        <button onClick={() => router.push("/dashboard")} className="dashboard-button">
          Go to Dashboard
        </button>
      </div>

      <style jsx>{`
        .unauthorized-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f8fafc;
          font-family: Arial, Helvetica, sans-serif;
          padding: 20px;
        }
        .unauthorized-card {
          width: 100%;
          max-width: 440px;
          background: #ffffff;
          padding: 40px;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
          text-align: center;
        }
        .alert-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }
        h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.5px;
        }
        p {
          color: #64748b;
          font-size: 15px;
          margin-top: 10px;
          margin-bottom: 30px;
          line-height: 1.5;
        }
        .dashboard-button {
          background: #4f46e5;
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          font-size: 15px;
          font-weight: 700;
          border-radius: 9px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .dashboard-button:hover {
          background: #4338ca;
        }
      `}</style>
    </main>
  );
}
