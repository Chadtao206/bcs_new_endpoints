const axios = require("axios");
const authtoken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ1NzYzLCJtaW51dGVzVGltZW91dCI6NjAsImNyZWF0aW9uVGltZSI6IjIwMjEtMDktMDhUMTc6NTY6MjguOTQxOTg4MDE2WiJ9._UzuSUPrzoAlUZRghD6_fvXvEmqb-fcWyXPDdZfxosQ";
axios.defaults.headers.common["authtoken"] = authtoken;

module.exports.sessions = (eid) =>
  axios.post(
    "https://bootcampspot.com/api/instructor/v1/sessions",
    JSON.stringify({
      enrollmentId: Number(eid),
    })
  );

module.exports.sessionDetails = (sid = 1686222) =>
  axios.post(
    "https://bootcampspot.com/api/instructor/v1/sessionDetail",
    JSON.stringify({
      sessionId: Number(sid),
    })
  );

module.exports.modifyAttendance = ({ sessionId, statusCode, studentId }) =>
  axios.post(
    "https://bootcampspot.com/broker/setAttendanceStatus",
    JSON.stringify({
      sessionId: Number(sessionId),
      statusCode,
      studentId,
    })
  );

module.exports.me = () =>
  axios.post("https://bootcampspot.com/api/instructor/v1/me");

module.exports.dashboard = (eid = 720326) =>
  axios.post(
    "https://bootcampspot.com/broker/dashboard",
    JSON.stringify({
      enrollmentId: Number(eid),
    })
  );
