const mongoose = require('mongoose');
const AdminCredential = require("./models/Admin/credential.model");  // Sử dụng mô hình AdminCredential

const seedData = async () => {
  try {
    // Kiểm tra xem MongoDB đã kết nối chưa
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // Tạo dữ liệu mẫu để thêm vào cơ sở dữ liệu
    const adminData = [
      {
        loginid: 1,
        password: 'admin123',
      },
      {
        loginid: 2,
        password: 'admin456',
      },
    ];

    // Xóa tất cả dữ liệu hiện tại (nếu có) trong bộ sưu tập AdminCredential
    await AdminCredential.deleteMany({});

    // Chèn dữ liệu mẫu vào MongoDB
    await AdminCredential.insertMany(adminData);
    
    console.log("Data seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Đóng kết nối MongoDB sau khi hoàn tất
    mongoose.connection.close();
  }
};

seedData();
