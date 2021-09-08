const express = require("express");
const app = express();
const {
  sessions,
  sessionDetails,
  modifyAttendance,
  me,
  dashboard,
} = require("./api");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/sessions/:eid", async ({ params: { eid } }, res) => {
  try {
    const { data } = await sessions(eid);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/session/detail", async (req, res) => {
  try {
    const { data } = await sessionDetails();
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

app.listen(5000, () => console.log(`App is running on port ${5000}`));
