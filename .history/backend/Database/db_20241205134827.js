const mongoose = require('mongoose');

const connectToMongo = () => {
  const mongoURI = process.env.MONGO_URI || "ppName=Cluster0"; // Đảm bảo rằng URI đúng

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
