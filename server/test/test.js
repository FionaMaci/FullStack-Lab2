// Add this if you are using CommonJS and not modules
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const id = 102;
const code = "011";
const num = 4;

const employee = {
  employee_id: id,
  full_name: `fiona maci`,
  email: `fiona@email.com`,
  hashed_pwd: `pwd${num}`
};

const project = {
  project_code: code,
  project_name: `${num} FM`,
  project_discription: `A solution to all yor fashion problems `
};

const assignments = {
  employee_id: id,
  project_code: code,
  start_date: Date.now()
};

(async () => {
  try {
    await fetch("http://localhost:8080/api/employee", {
      method: "POST",
      body: JSON.stringify(employee),
      headers: { "content-type": "application/json" }
    });

    await fetch("http://localhost:8080/api/project", {
      method: "POST",
      body: JSON.stringify(project),
      headers: { "content-type": "application/json" }
    });

    await fetch("http://localhost:8080/api/project_assignments", {
      method: "POST",
      body: JSON.stringify(assignments),
      headers: { "content-type": "application/json" }
    });

    const res = await fetch("http://localhost:8080/api/project_assignments");
    const data = await res.json();
    console.log("✅ Assignments:", data);

  } catch (err) {
    console.error("❌ Error during fetch:", err);
  }
})();
