const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connDB = require("./DB_connection/conn");
const authRoute = require("./routes/Auths");
const UserRoute = require("./routes/Users");
const PostRoute = require("./routes/Posts");
const CategoryRoute = require("./routes/Categorys");
const multer = require("multer");
const path = require("path");
var cors = require("cors");

const PORT = process.env.PORT || 5000;

app.use(cors());

//config env
dotenv.config();

//MONGO_BD Connection
connDB();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/api/auth", authRoute);
app.use("/api/users", UserRoute);
app.use("/api/posts", PostRoute);
app.use("/api/categories", CategoryRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  //route
  app.get("/", (req, res) => {
    res.send("hello world");
  });
}

app.listen(PORT, () => {
  console.log(`server is running on port no : ${PORT}`);
});
