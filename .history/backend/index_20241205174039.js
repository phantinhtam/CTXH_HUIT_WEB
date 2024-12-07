require('dotenv').config();
const connectToMongo = require("./Database/db");
const express = require("express");
const path = require("path");
const app = express();

connectToMongo();
const port = process.env.PORT || 5000; // Đảm bảo có giá trị mặc định cho port

var cors = require("cors");

app.use(cors({
  origin: process.env.FRONTEND_API_LINK || "*", // Cấu hình cho môi trường phát triển
}));

app.use(express.json()); // Chuyển đổi dữ liệu yêu cầu thành JSON

app.get("/", (req, res) => {
  res.send("Hello 👋 I am Working Fine 🚀");
});

app.use('/media', express.static(path.join(__dirname, 'media')));

// Credential APIs
app.use("/api/student/auth", require("./routes/Student Api/credential.route"));
app.use("/api/faculty/auth", require("./routes/Faculty Api/credential.route"));
app.use("/api/admin/auth", require("./routes/Admin Api/credential.route"));

// Details APIs
app.use("/api/student/details", require("./routes/Student Api/details.route"));
app.use("/api/faculty/details", require("./routes/Faculty Api/details.route"));
app.use("/api/admin/details", require("./routes/Admin Api/details.route"));

// Other APIs
app.use("/api/timetable", require("./routes/Other Api/timetable.route"));
app.use("/api/material", require("./routes/Other Api/material.route"));
app.use("/api/notice", require("./routes/Other Api/notice.route"));
app.use("/api/subject", require("./routes/Other Api/subject.route"));
app.use("/api/marks", require("./routes/Other Api/marks.route"));
app.use("/api/branch", require("./routes/Other Api/branch.route"));

app.listen(port, () => {
  console.log(`Server Listening On http://localhost:${port}`);
});
