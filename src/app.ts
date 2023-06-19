import express from "express";
import moviesRoutes from "./routes/moviesrote.js";
import authroute from "./routes/authroute.js";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cors());
server.use(moviesRoutes);
server.use(authroute)

server.get("/vida", (req, res) => {
    res.send("alou")
})

server.listen(5000, () => {
    console.log("executando....")
})