import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://saksham:dummy@taskmanager.q6uop.mongodb.net/?retryWrites=true&w=majority&appName=TaskManager";

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined. Check your .env.local file.");
    process.exit(1);
  }
  
  export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
      console.log("✅ Already connected to MongoDB");
      return;
    }
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("🚀 MongoDB Connected Successfully!");
    } catch (error) {
      console.error("❌ MongoDB Connection Failed!", error.message);
      process.exit(1);
    }
  };