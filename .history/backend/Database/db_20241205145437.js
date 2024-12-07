const mongoose = require('mongoose');

const connectToMongo = () => {
  const mongoURI = process.env.MONGO_URI || "mongodb+srv://tamphantinh:<db_password>@cluster0.lcgal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Đảm bảo rằng URI đúng

  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
};

module.exports = connectToMongo;
