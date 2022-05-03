import express from "express";
import mongoose from "./mongoDB.js";
import passport from "./passport.js";
import cors from "cors";
import path from "path";
import APIRouter from "./routes/api/index.js";
// import bodyParser from "body-parser";

// const __dirname = path.resolve();

const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "./client/build")));
// app.use(express.static(path.resolve(__dirname, "./build")));

// const corsOptions = {
//   origin: "https://aonye.github.io/",
//   credentials: true, // access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions)); // Use this after the variable declaration

// app.use(express.static(path.join(__dirname, "..", "build", "index.html")));
// app.use(express.static("public"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors());

// app.use(); // block paths to every API route until verified

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "oldpublic", "index.html"));
// });

app.use("/api", APIRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server started at Port: ${PORT}`);
});
