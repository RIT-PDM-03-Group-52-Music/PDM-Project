import cors from "cors";
import express from "express";
import aiRouter from "./routes/ai";
import authRouter from "./routes/auth";

const app = express(); // HTTP server

app.use(cors()); // security thing
app.use(express.json()); // use JSON in request body

app.use("/api/auth", authRouter);
app.use("/api/ai", aiRouter);

const port = process.env.PORT ?? 3001;
app.listen(port, () => console.log(`API running on port ${port}`));
