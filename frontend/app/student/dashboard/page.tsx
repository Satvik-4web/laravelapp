"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DashboardData {
  message: string;
  data: {
    role_info: string;
    enrolled_courses?: string[];
  };
}

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"}/logout`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.clear();
      router.push("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      localStorage.clear();
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userStr);
    setUser(parsedUser);

    if (parsedUser.role !== "Student" && parsedUser.role !== "Admin") {
      router.push("/unauthorized");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"}/student/dashboard`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.clear();
          router.push("/login");
          return;
        }

        if (response.status === 403) {
          router.push("/unauthorized");
          return;
        }

        const resData = await response.json();
        setData(resData);
      } catch (err) {
        console.error(err);
        setError("Could not connect to Laravel API.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <main className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="badge">STUDENT PORTAL</div>
          <h1>Student Dashboard</h1>
        </div>
        <div className="header-right">
          <button onClick={() => router.push("/change-password")} className="btn btn-secondary">
            Change Password
          </button>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </header>

      <section className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome, {user?.name}</h2>
          <p className="role-text">Role: <strong>{user?.role}</strong></p>
        </div>

        {error ? (
          <div className="error-card">{error}</div>
        ) : (
          <div className="info-grid">
            <div className="card">
              <h3>Enrolled Courses</h3>
              <ul className="course-list">
                {data?.data.enrolled_courses?.map((course, idx) => (
                  <li key={idx} className="course-item">{course}</li>
                ))}
              </ul>
              <p className="sub-text" style={{ marginTop: "15px" }}>{data?.data.role_info}</p>
            </div>
          </div>
        )}
      </section>

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background: #f1f5f9;
          font-family: Arial, Helvetica, sans-serif;
          padding: 40px 30px;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1150px;
          margin: 0 auto 30px;
        }
        .badge {
          display: inline-block;
          background: #e0e7ff;
          color: #4338ca;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        h1 {
          margin: 0;
          font-size: 36px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -1px;
        }
        .header-right {
          display: flex;
          gap: 12px;
        }
        .dashboard-content {
          max-width: 1150px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .welcome-card {
          background: #ffffff;
          padding: 30px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 5px 20px rgba(15, 23, 42, 0.04);
        }
        .welcome-card h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
        }
        .role-text {
          margin-top: 8px;
          margin-bottom: 0;
          color: #64748b;
          font-size: 15px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }
        .card {
          background: #ffffff;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 5px 20px rgba(15, 23, 42, 0.04);
        }
        .card h3 {
          margin-top: 0;
          margin-bottom: 12px;
          font-size: 16px;
          color: #64748b;
        }
        .course-list {
          padding-left: 20px;
          margin: 10px 0;
        }
        .course-item {
          font-size: 18px;
          font-weight: 700;
          color: #4f46e5;
          margin-bottom: 8px;
        }
        .sub-text {
          color: #94a3b8;
          font-size: 13px;
          margin: 0;
        }
        .btn {
          padding: 10px 18px;
          font-size: 14px;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }
        .btn-secondary {
          background: #ffffff;
          color: #334155;
          border: 1px solid #cbd5e1;
        }
        .btn-secondary:hover {
          background: #f8fafc;
        }
        .btn-danger {
          background: #fee2e2;
          color: #dc2626;
        }
        .btn-danger:hover {
          background: #fecaca;
        }
        .error-card {
          background: #fee2e2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 20px;
          border-radius: 12px;
        }
        .loader-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .loader {
          width: 32px;
          height: 32px;
          border: 3px solid #e2e8f0;
          border-top-color: #4f46e5;
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
