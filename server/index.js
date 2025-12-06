import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./src/db/index.js";
dotenv.config({
  path: "./.env",
});

// Start server first, then try to connect to DB
app.listen(process.env.PORT || 8000, () => {
  console.log(
    `✅ Server is running at http://localhost:${process.env.PORT || 8000}`
  );
});

// Try to connect to MongoDB (non-blocking)
connectDB()
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(
      "⚠️  MongoDB connection failed (server still running):",
      err.message
    );
    console.log(
      "💡 Add your IP to MongoDB Atlas whitelist: https://cloud.mongodb.com/"
    );
  });
