"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      const role = user.role;

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
        router.push("/login");
      }
    } catch (e) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <p>Redirecting to your dashboard...</p>
    </div>
  );
}
