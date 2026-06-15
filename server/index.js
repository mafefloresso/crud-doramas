import express from "express";
import authRoutes  from "./routes/auth.js"
import doramasRoutes  from "./routes/doramas.js"
import genresRoutes  from "./routes/genres.js"
import cookieParser from "cookie-parser";   

import cors from "cors";

const app= express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/doramas", doramasRoutes);
app.use("/api/genres", genresRoutes);

app.listen(8800, () => {
    console.log("Listen on port 8800");
});