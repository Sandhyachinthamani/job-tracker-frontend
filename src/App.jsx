import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "applied",
  });

  useEffect(() => {
    API.get("/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", form);
    API.post("/jobs/add", form)
      .then((res) => {
        setJobs([res.data, ...jobs]);
        setForm({ company: "", position: "", status: "applied" });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Job Tracker</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
        <input
          placeholder="Position"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>applied</option>
          <option>interview</option>
          <option>offer</option>
          <option>rejected</option>
        </select>
        <button type="submit">Add Job</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
  {jobs.map((job) => (
    <li
      key={job._id}
      style={{
        marginBottom: "1rem",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <div>
        <strong>{job.company}</strong> — {job.position} [{job.status}]
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <select
          value={job.status}
          onChange={(e) => {
            const newStatus = e.target.value;
            API.put(`/jobs/update/${job._id}`, { status: newStatus })
              .then((res) =>
                setJobs(jobs.map((j) => (j._id === job._id ? res.data : j)))
              )
              .catch((err) => console.error(err));
          }}
        >
          <option value="applied">applied</option>
          <option value="interview">interview</option>
          <option value="offer">offer</option>
          <option value="rejected">rejected</option>
        </select>

        <button
          style={{
            padding: "4px 8px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => {
            API.delete(`/jobs/delete/${job._id}`)
              .then(() => setJobs(jobs.filter((j) => j._id !== job._id)))
              .catch((err) => console.error(err));
          }}
        >
          ❌
        </button>
      </div>
    </li>
  ))}
</ul>


    </div>
  );
}

export default App;
