import cors from "cors";
import express from "express";
import { ENDPOINTS } from "./context/endpoints";
import aiRouter from "./routes/ai";
import albumsRouter from "./routes/albums";
import authRouter from "./routes/auth";
import collectionRouter from "./routes/collection";
import followsRouter from "./routes/follows";
import listensRouter from "./routes/listens";
import songsRouter from "./routes/songs";
import userRouter from "./routes/user";
import { ok } from "./utils/http";

const app = express(); // HTTP server

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: "*",
    }),
); // security thing
app.use(express.json()); // use JSON in request body

app.use("/api/auth", authRouter);
app.use("/api/ai", aiRouter);
app.use("/api/collections", collectionRouter);
app.use("/api/listens", listensRouter);
app.use("/api/users", userRouter);
app.use("/api/songs", songsRouter);
app.use("/api/albums", albumsRouter);

app.use("/api/follows", followsRouter);
app.get("/api/endpoints", (_, req) => {
    return ok(req, JSON.stringify(ENDPOINTS, null, 2));
});

const port = process.env.PORT ?? 3001;
app.listen(port, () => console.log(`API running on port ${port}`));
