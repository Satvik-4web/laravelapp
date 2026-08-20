"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  city: string;
}

const API_URL = "http://127.0.0.1:8000/api/students";

export default function Home() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    city: "",
  });

  /*
   * ---------------------------------------------------------
   * AUTH HEADERS
   * ---------------------------------------------------------
   */

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  /*
   * ---------------------------------------------------------
   * CHECK AUTHENTICATION
   * ---------------------------------------------------------
   */

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return false;
    }

    return true;
  };

  /*
   * ---------------------------------------------------------
   * GET STUDENTS
   * ---------------------------------------------------------
   */

  const fetchStudents = async () => {
    try {
      if (!checkAuthentication()) return;

      setLoading(true);

      const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      console.log("GET students response:", data);

      /*
       * Token expired / invalid
       */
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");
        return;
      }

      if (!response.ok) {
        console.error("Failed to fetch students:", data);
        alert(data.message || "Failed to fetch students.");
        return;
      }

      /*
       * Laravel can return either:
       *
       * [
       *   {...},
       *   {...}
       * ]
       *
       * OR
       *
       * {
       *   data: [
       *     {...},
       *     {...}
       *   ]
       * }
       */

      const studentData = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
        ? data.data
        : [];

      setStudents(studentData);
    } catch (error) {
      console.error("Fetch students error:", error);

      alert(
        "Could not connect to Laravel API. Make sure Laravel is running."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * LOAD STUDENTS WHEN PAGE OPENS
   * ---------------------------------------------------------
   */

  useEffect(() => {
    fetchStudents();
  }, []);

  /*
   * ---------------------------------------------------------
   * FORM INPUT CHANGE
   * ---------------------------------------------------------
   */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /*
   * ---------------------------------------------------------
   * ADD STUDENT
   * ---------------------------------------------------------
   */

  const addStudent = async () => {
    try {
      if (!checkAuthentication()) return;

      /*
       * Basic frontend validation
       */
      if (
        !form.first_name.trim() ||
        !form.last_name.trim() ||
        !form.email.trim() ||
        !form.mobile.trim() ||
        !form.city.trim()
      ) {
        alert("Please fill in all fields.");
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",

        /*
         * IMPORTANT:
         * Authentication token is now sent.
         */
        headers: getAuthHeaders(),

        body: JSON.stringify({
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          email: form.email.trim(),
          mobile: form.mobile.trim(),
          city: form.city.trim(),
        }),
      });

      const data = await response.json();

      console.log("POST student response:", data);

      /*
       * Unauthorized
       */
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");
        return;
      }

      /*
       * Laravel validation error
       */
      if (response.status === 422) {
        console.error("Validation error:", data);

        if (data.errors) {
          const messages = Object.values(data.errors)
            .flat()
            .join("\n");

          alert(messages);
        } else {
          alert(data.message || "Validation failed.");
        }

        return;
      }

      /*
       * Other errors
       */
      if (!response.ok) {
        console.error("Create student failed:", data);

        alert(
          data.message || "Failed to create student."
        );

        return;
      }

      /*
       * Success
       */
      alert("Student added successfully!");

      clearForm();

      await fetchStudents();
    } catch (error) {
      console.error("Add student error:", error);

      alert(
        "Something went wrong while creating the student."
      );
    }
  };

  /*
   * ---------------------------------------------------------
   * START EDIT
   * ---------------------------------------------------------
   */

  const startEdit = (student: Student) => {
    setEditingId(student.id);

    setForm({
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      mobile: student.mobile,
      city: student.city,
    });

    /*
     * Scroll back to form
     */
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * ---------------------------------------------------------
   * UPDATE STUDENT
   * ---------------------------------------------------------
   */

  const updateStudent = async () => {
    if (editingId === null) return;

    try {
      if (!checkAuthentication()) return;

      /*
       * Basic validation
       */
      if (
        !form.first_name.trim() ||
        !form.last_name.trim() ||
        !form.email.trim() ||
        !form.mobile.trim() ||
        !form.city.trim()
      ) {
        alert("Please fill in all fields.");
        return;
      }

      const response = await fetch(
        `${API_URL}/${editingId}`,
        {
          method: "PUT",

          /*
           * IMPORTANT:
           * Authentication token is sent here too.
           */
          headers: getAuthHeaders(),

          body: JSON.stringify({
            first_name: form.first_name.trim(),
            last_name: form.last_name.trim(),
            email: form.email.trim(),
            mobile: form.mobile.trim(),
            city: form.city.trim(),
          }),
        }
      );

      const data = await response.json();

      console.log("PUT student response:", data);

      /*
       * Unauthorized
       */
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");
        return;
      }

      /*
       * Validation error
       */
      if (response.status === 422) {
        console.error("Validation error:", data);

        if (data.errors) {
          const messages = Object.values(data.errors)
            .flat()
            .join("\n");

          alert(messages);
        } else {
          alert(data.message || "Validation failed.");
        }

        return;
      }

      if (!response.ok) {
        console.error("Update student failed:", data);

        alert(
          data.message || "Failed to update student."
        );

        return;
      }

      /*
       * Success
       */
      alert("Student updated successfully!");

      clearForm();

      await fetchStudents();
    } catch (error) {
      console.error("Update student error:", error);

      alert(
        "Something went wrong while updating the student."
      );
    }
  };

  /*
   * ---------------------------------------------------------
   * DELETE STUDENT
   * ---------------------------------------------------------
   */

  const deleteStudent = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      if (!checkAuthentication()) return;

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",

          /*
           * IMPORTANT:
           * Authentication token is sent here too.
           */
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      console.log("DELETE student response:", data);

      /*
       * Unauthorized
       */
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");
        return;
      }

      if (!response.ok) {
        console.error("Delete student failed:", data);

        alert(
          data.message || "Failed to delete student."
        );

        return;
      }

      /*
       * Success
       */
      alert("Student deleted successfully!");

      await fetchStudents();
    } catch (error) {
      console.error("Delete student error:", error);

      alert(
        "Something went wrong while deleting the student."
      );
    }
  };

  /*
   * ---------------------------------------------------------
   * CLEAR FORM
   * ---------------------------------------------------------
   */

  const clearForm = () => {
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      city: "",
    });

    setEditingId(null);
  };

  /*
   * ---------------------------------------------------------
   * LOGOUT
   * ---------------------------------------------------------
   */

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  /*
   * ---------------------------------------------------------
   * UI
   * ---------------------------------------------------------
   */

  return (
    <main className="page">

      {/* HEADER */}

      <div className="header">

        <div>
          <div className="badge">
            LARAVEL × NEXT.JS
          </div>

          <h1>Student Management</h1>

          <p>
            Manage your students through a modern REST API.
          </p>
        </div>

        <div className="header-right">

          <div className="student-count">
            <span>{students.length}</span>
            <small>Students</small>
          </div>

          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>


      {/* FORM */}

      <section className="card">

        <div className="section-header">

          <div>

            <h2>
              {editingId
                ? "Edit Student"
                : "Add New Student"}
            </h2>

            <p>
              {editingId
                ? "Update the student's information."
                : "Enter the student's details below."}
            </p>

          </div>

        </div>


        <div className="form-grid">

          {/* FIRST NAME */}

          <div className="field">

            <label>First Name</label>

            <input
              name="first_name"
              placeholder="e.g. Satvik"
              value={form.first_name}
              onChange={handleChange}
            />

          </div>


          {/* LAST NAME */}

          <div className="field">

            <label>Last Name</label>

            <input
              name="last_name"
              placeholder="e.g. Ganda"
              value={form.last_name}
              onChange={handleChange}
            />

          </div>


          {/* EMAIL */}

          <div className="field">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="student@example.com"
              value={form.email}
              onChange={handleChange}
            />

          </div>


          {/* MOBILE */}

          <div className="field">

            <label>Mobile</label>

            <input
              name="mobile"
              placeholder="9876543210"
              value={form.mobile}
              onChange={handleChange}
            />

          </div>


          {/* CITY */}

          <div className="field">

            <label>City</label>

            <input
              name="city"
              placeholder="e.g. Patiala"
              value={form.city}
              onChange={handleChange}
            />

          </div>

        </div>


        {/* FORM BUTTONS */}

        <div className="form-actions">

          {editingId ? (

            <>
              <button
                className="primary-button"
                onClick={updateStudent}
              >
                Save Changes
              </button>

              <button
                className="secondary-button"
                onClick={clearForm}
              >
                Cancel
              </button>
            </>

          ) : (

            <button
              className="primary-button"
              onClick={addStudent}
            >
              + Add Student
            </button>

          )}

        </div>

      </section>


      {/* STUDENTS */}

      <section className="card">

        <div className="section-header students-heading">

          <div>

            <h2>Students</h2>

            <p>
              All students stored in your database.
            </p>

          </div>


          <button
            className="refresh-button"
            onClick={fetchStudents}
          >
            ↻ Refresh
          </button>

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="empty">

            <div className="loader"></div>

            <p>Loading students...</p>

          </div>


        ) : students.length === 0 ? (

          /* EMPTY */

          <div className="empty">

            <div className="empty-icon">
              +
            </div>

            <h3>No students yet</h3>

            <p>
              Add your first student using the form above.
            </p>

          </div>


        ) : (

          /* TABLE */

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>ID</th>
                  <th>STUDENT</th>
                  <th>EMAIL</th>
                  <th>MOBILE</th>
                  <th>CITY</th>
                  <th>ACTIONS</th>

                </tr>

              </thead>


              <tbody>

                {students.map((student) => (

                  <tr key={student.id}>

                    {/* ID */}

                    <td>

                      <span className="id-badge">
                        #{student.id}
                      </span>

                    </td>


                    {/* STUDENT */}

                    <td>

                      <div className="student-name">

                        <div className="avatar">

                          {student.first_name
                            .charAt(0)
                            .toUpperCase()}

                        </div>


                        <div>

                          <strong>

                            {student.first_name}{" "}
                            {student.last_name}

                          </strong>

                        </div>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td className="email">
                      {student.email}
                    </td>


                    {/* MOBILE */}

                    <td>
                      {student.mobile}
                    </td>


                    {/* CITY */}

                    <td>

                      <span className="city-badge">
                        {student.city}
                      </span>

                    </td>


                    {/* ACTIONS */}

                    <td>

                      <div className="actions">

                        <button
                          className="edit-button"
                          onClick={() =>
                            startEdit(student)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-button"
                          onClick={() =>
                            deleteStudent(student.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </section>


      {/* FOOTER */}

      <footer>
        Student Management System · Laravel REST API
      </footer>


      {/* STYLES */}

      <style jsx>{`

        * {
          box-sizing: border-box;
        }


        .page {
          min-height: 100vh;
          background: #f1f5f9;
          color: #0f172a;
          padding: 55px 30px;
          font-family: Arial, Helvetica, sans-serif;
        }


        .header {
          max-width: 1150px;
          margin: 0 auto 35px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 25px;
        }


        .badge {
          display: inline-block;
          background: #e0e7ff;
          color: #4338ca;
          padding: 7px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 15px;
        }


        h1 {
          margin: 0;
          font-size: 42px;
          font-weight: 800;
          letter-spacing: -1.5px;
          color: #0f172a;
        }


        .header p {
          margin: 10px 0 0;
          color: #64748b;
          font-size: 16px;
        }


        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }


        .student-count {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 14px 20px;
          border-radius: 14px;
          text-align: center;
          box-shadow: 0 5px 20px rgba(15, 23, 42, 0.06);
          min-width: 100px;
        }


        .student-count span {
          display: block;
          font-size: 26px;
          font-weight: 800;
          color: #4f46e5;
        }


        .student-count small {
          color: #64748b;
          font-size: 12px;
        }


        .logout-button {
          border: none;
          background: #fee2e2;
          color: #dc2626;
          padding: 11px 15px;
          border-radius: 9px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s ease;
        }


        .logout-button:hover {
          background: #fecaca;
        }


        .card {
          max-width: 1150px;
          margin: 0 auto 25px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
        }


        .section-header {
          margin-bottom: 25px;
        }


        .section-header h2 {
          margin: 0;
          color: #0f172a;
          font-size: 21px;
        }


        .section-header p {
          margin: 6px 0 0;
          color: #64748b;
          font-size: 14px;
        }


        .students-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }


        .form-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }


        .field label {
          display: block;
          margin-bottom: 7px;
          font-size: 13px;
          font-weight: 700;
          color: #334155;
        }


        .field input {
          width: 100%;
          padding: 12px 13px;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          background: #ffffff;
          color: #0f172a;
          font-size: 14px;
          outline: none;
        }


        .field input::placeholder {
          color: #94a3b8;
        }


        .field input:focus {
          border-color: #6366f1;
          box-shadow:
            0 0 0 3px rgba(99, 102, 241, 0.12);
        }


        .form-actions {
          margin-top: 22px;
          display: flex;
          gap: 10px;
        }


        button {
          font-family: inherit;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s ease;
        }


        .primary-button {
          border: none;
          background: #4f46e5;
          color: white;
          padding: 12px 20px;
          border-radius: 9px;
        }


        .primary-button:hover {
          background: #4338ca;
          transform: translateY(-1px);
        }


        .secondary-button {
          border: 1px solid #cbd5e1;
          background: white;
          color: #334155;
          padding: 12px 20px;
          border-radius: 9px;
        }


        .secondary-button:hover {
          background: #f8fafc;
        }


        .refresh-button {
          border: 1px solid #cbd5e1;
          background: white;
          color: #334155;
          padding: 9px 14px;
          border-radius: 8px;
        }


        .refresh-button:hover {
          background: #f8fafc;
        }


        .table-wrapper {
          overflow-x: auto;
        }


        table {
          width: 100%;
          border-collapse: collapse;
        }


        th {
          padding: 13px 12px;
          text-align: left;
          font-size: 11px;
          letter-spacing: 0.7px;
          color: #64748b;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }


        td {
          padding: 16px 12px;
          color: #334155;
          font-size: 14px;
          border-bottom: 1px solid #f1f5f9;
        }


        tbody tr:hover {
          background: #fafafa;
        }


        .id-badge {
          color: #6366f1;
          font-weight: 800;
        }


        .student-name {
          display: flex;
          align-items: center;
          gap: 11px;
        }


        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e0e7ff;
          color: #4338ca;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }


        .student-name strong {
          color: #0f172a;
        }


        .email {
          color: #475569;
        }


        .city-badge {
          background: #f1f5f9;
          color: #475569;
          padding: 6px 10px;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 700;
        }


        .actions {
          display: flex;
          gap: 7px;
        }


        .edit-button {
          border: none;
          background: #4f46e5;
          color: white;
          padding: 8px 12px;
          border-radius: 7px;
        }


        .edit-button:hover {
          background: #4338ca;
        }


        .delete-button {
          border: none;
          background: #fee2e2;
          color: #dc2626;
          padding: 8px 12px;
          border-radius: 7px;
        }


        .delete-button:hover {
          background: #fecaca;
        }


        .empty {
          text-align: center;
          padding: 55px 20px;
          color: #64748b;
        }


        .empty-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 15px;
          border-radius: 50%;
          background: #eef2ff;
          color: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
          font-weight: 300;
        }


        .empty h3 {
          margin: 0;
          color: #334155;
        }


        .empty p {
          margin-top: 7px;
          color: #94a3b8;
        }


        .loader {
          width: 28px;
          height: 28px;
          border: 3px solid #e2e8f0;
          border-top-color: #4f46e5;
          border-radius: 50%;
          margin: 0 auto 15px;
          animation: spin 0.8s linear infinite;
        }


        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }


        footer {
          max-width: 1150px;
          margin: 35px auto 0;
          text-align: center;
          color: #94a3b8;
          font-size: 12px;
        }


        @media (max-width: 1000px) {

          .form-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }


        @media (max-width: 900px) {

          .header {
            align-items: flex-start;
            gap: 20px;
          }

          .header-right {
            flex-direction: column;
            align-items: stretch;
          }

        }


        @media (max-width: 600px) {

          .page {
            padding: 30px 15px;
          }


          h1 {
            font-size: 32px;
          }


          .header {
            flex-direction: column;
          }


          .header-right {
            flex-direction: row;
            width: 100%;
          }


          .form-grid {
            grid-template-columns: 1fr;
          }


          .card {
            padding: 20px;
          }


          .students-heading {
            align-items: flex-start;
            gap: 15px;
          }

        }

      `}</style>

    </main>
  );
}