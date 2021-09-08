const express = require("express");
const app = express();
const {
  sessions,
  sessionDetails,
  modifyAttendance,
  me,
  dashboard,
  coursework,
  courseworkDetails,
  updateSubmissionGrade,
} = require("./api");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Welcome to bootcampspot hidden apis!\n
You can access the following endpoints:\n
1. GET /sessions/{enrollmentId} - returns a list of sessions for a given enrollment(cohort)\n
2. GET /session/detail/{sessionId} - returns details for a given session(has attendance information)\n
3. POST /attendance/modify - modifies a student's attendance for a given session, body should be {sessionId, studentId, statusCode}\n
4. GET /me - returns data related to the authenticated user`);
});

app.get("/sessions/:eid", async ({ params: { eid } }, res) => {
  try {
    const { data } = await sessions(eid);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/session/detail/:sid", async (req, res) => {
  try {
    const { data } = await sessionDetails(req.params.sid);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.post(
  "/attendance/modify",
  async (
    { body: { sessionId = 1686222, statusCode = "Absent", studentId = 88433 } },
    res
  ) => {
    console.log(sessionId, statusCode, studentId);
    try {
      await modifyAttendance({
        sessionId: Number(sessionId),
        statusCode,
        studentId: Number(studentId),
      });
      res.json("Success!");
    } catch (err) {
      console.log(err);
    }
  }
);

app.get("/me", async (req, res) => {
  try {
    const { data } = await me();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/dashboard", async (req, res) => {
  try {
    const { data } = await dashboard();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/coursework/:eid", async (req, res) => {
  try {
    const { data } = await coursework(req.params.eid);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/courseworkdetail/:aid", async ({ params: { aid } }, res) => {
  try {
    const { data } = await courseworkDetails(aid);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.post(
  "/updatesubmissiongrade",
  async (
    { body: { id = 921805, submissionId = 1018451, grade = "C+" } },
    res
  ) => {
    try {
      const { data } = await updateSubmissionGrade({
        id,
        submissionId,
        grade,
      });
      res.json("updated!");
    } catch (err) {
      console.log(err);
    }
  }
);

app.listen(5000, () => console.log(`App is running on port ${5000}`));
