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
    credentials: true
  })
);


app.use(cors());
app.use(
  fileUpload({
    useTempFiles: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Cloud File Storage Server is running");
});


app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/folders", folderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
