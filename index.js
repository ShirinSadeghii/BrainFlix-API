const express = require('express');
const app = express();
// const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const cors = require('cors');
require('dotenv').config();
const { PORT } = process.env

// const apiKey = "d4ab657f-5aa3-46ad-9d45-85406b23cd11"
// app.use("/videos", videoRouter);
app.use(express.json());
app.use(cors());
app.use(express.static(`public`));

app.get("/", (req, res) => {
    res.send("welcome to /");
});

// app.listen(8080, function() {
//     console.log("Hello there");
// });

app.listen(PORT, () => {
    console.log("Hello meow");
})

app.get("/videos", (req, res) => {
    console.log("my videos are working!");
    const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    res.send(videos);
})

app.get("/videos/:id", (req, res) => {
    const params = req.params;
    const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    const selectedVideo = videos.find((video) => video.id === params.id);
    if (selectedVideo) {
        res.send(JSON.stringify(selectedVideo));
    } else {
        res.status(400).send("video not found");
    }
});

app.post("/videos", (req, res) => {
    const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        channel: "Red Cow",
        image: "image0.jpeg",
        description: req.body.description,
        views: "0",
        likes: "0",
        duration: "4:01",
        video: "https://project-2-api.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: [],
    };
    videos.push(newVideo);
    console.log(newVideo);

    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
    res.send("Video Uploaded!");
});