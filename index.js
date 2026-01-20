import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import fileUpload from "express-fileupload";
import fileRoutes from "./routes/file.routes.js";
import folderRoutes from "./routes/folder.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cloud-file-storage-client-fl6n.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// REQUIRED for preflight
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: false
  })
);

app.get("/", (req, res) => {
  res.send("Cloud File Storage Server is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/folders", folderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
