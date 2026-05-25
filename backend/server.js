const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*", // Allows requests from your Vercel domain link
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("/*", cors());

// ✅ ADD HERE
app.use("/uploads", express.static("uploads"));

// routes
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/health" , (req , res) => 
{
    res.send("Backend is running");
})
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.log(err));