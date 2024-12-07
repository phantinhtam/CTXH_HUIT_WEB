const adminDetails = require("./models/Admin/details.model.js");
const adminCredential = require("./models/Admin/credential.model.js");
const connectToMongo = require("./Database/db");
const mongoose = require("mongoose");

const seedData = async () => {
    try {
        await connectToMongo();

        await adminCredential.deleteMany({})
        await adminDetails.deleteMany({})

        await adminCredential.create({
            loginid: 123456,
            password: "admin123"
        });
        await adminCredential.create({
            loginid: 2001210916,
            password: "tinhtam123"
        });

        const adminDetail = {
            employeeId: "123456",
            firstName: "Sundar",
            middleName: "R",
            lastName: "Pichai",
            email: "sundarpichar@gmail.com",
            phoneNumber: "1234567890",
            gender: "Male",
            type: "Admin",
            profile: "Faculty_Profile_123456.jpg",
        };

        

        console.log("Seeding completed successfully!");
    } catch (error) {
        console.error("Error while seeding:", error);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
};

seedData();
