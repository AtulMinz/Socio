import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.js";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(morgan("combined"));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assests");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3001;
try {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() =>
      app.listen(PORT, () =>
        console.log(`Running on PORT: http://localhost:${PORT}`)
      )
    )
    .catch((error) => console.log("Error", error));
} catch (error) {
  console.log("Error", error);
}
