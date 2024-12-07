// Import các thư viện cần thiết
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectToMongo = require("./Database/db"); // Kết nối MongoDB

// Khởi tạo ứng dụng Express
const app = express();

// Kết nối đến MongoDB
connectToMongo();

// Cổng server (hoặc lấy từ biến môi trường)
const port = process.env.PORT || 5000;

// Cấu hình CORS để cho phép yêu cầu từ Frontend API
app.use(cors({
  origin: process.env.FRONTEND_API_LINK || "http://localhost:3000" // Thay đổi nếu cần
}));

// Middleware để phân tích dữ liệu JSON trong các yêu cầu
app.use(express.json());

// Định nghĩa tuyến mặc định (Hello World)
app.get("/", (req, res) => {
  res.send("Hello 👋 I am Working Fine 🚀");
});

// Xử lý các tệp tĩnh (media) từ thư mục 'media'
app.use('/media', express.static(path.join(__dirname, 'media')));

// Định nghĩa các API cho từng loại người dùng
app.use("/api/student/auth", require("./routes/Student Api/credential.route"));
app.use("/api/faculty/auth", require("./routes/Faculty Api/credential.route"));
app.use("/api/admin/auth", require("./routes/Admin Api/credential.route"));

// Định nghĩa các API khác (Thời khóa biểu, tài liệu, thông báo, v.v.)
app.use("/api/student/details", require("./routes/Student Api/details.route"));
app.use("/api/faculty/details", require("./routes/Faculty Api/details.route"));
app.use("/api/admin/details", require("./routes/Admin Api/details.route"));
app.use("/api/timetable", require("./routes/Other Api/timetable.route"));
app.use("/api/material", require("./routes/Other Api/material.route"));
app.use("/api/notice", require("./routes/Other Api/notice.route"));
app.use("/api/subject", require("./routes/Other Api/subject.route"));
app.use("/api/marks", require("./routes/Other Api/marks.route"));
app.use("/api/branch", require("./routes/Other Api/branch.route"));

// Lắng nghe trên cổng đã cấu hình
app.listen(port, () => {
  console.log(`Server Listening On http://localhost:${port}`);
});
