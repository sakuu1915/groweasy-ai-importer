import express from "express";
import cors from "cors";
import importRoutes from "./routes/import.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/import", importRoutes);
app.get("/", (_, res) => {
  res.json({
    message: "GrowEasy Backend Running",
  });
});

export default app;