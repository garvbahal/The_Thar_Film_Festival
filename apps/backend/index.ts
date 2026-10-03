import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthRoutes from "./routes/auth.routes";
import AdminRoutes from "./routes/admin.route";
import HomeRoutes from "./routes/home.route";
import ParticipantRoutes from "./routes/participant.routes";
import { dbConnect } from "./config/database";
const app = express();

app.use(express.json());

app.use(cookieParser());
const PORT = Number(process.env.PORT) || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/api/v1", AdminRoutes);
app.use("/api/v1", HomeRoutes);
app.use("/api/v1", AuthRoutes);
app.use("/api/v1", ParticipantRoutes);

dbConnect();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App is started at ${PORT} port number`);
});
