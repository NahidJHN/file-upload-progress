const express = require("express");
const multer = require("multer");
const app = express();

app.use(express.static(__dirname + "/public"));
let storage = multer.diskStorage({
    filename: (req, file, cb) => {
        let filename = file.originalname;

        cb(null, Date.now() + filename);
    },
    destination: (req, file, cb) => {
        cb(null, __dirname + "/upload");
    },
});

let upload = multer({
    storage,
});

app.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/upload", upload.single("file"), (req, res, next) => {
    res.status(200).json({
        msg: "File Upload Complete",
    });
});

app.listen(8080, () => {
    console.log("Server runnning on port 8080");
});
