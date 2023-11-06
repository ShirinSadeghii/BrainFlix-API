const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");


router.get("/", (req, res) => {
    const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    res.send(videos);
})


router.get("/:id", (req, res) => {
    const params = req.params;
    const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    const selectedVideo = videos.find((video) => video.id === params.id);
    if (selectedVideo) {
        res.send(JSON.stringify(selectedVideo));
    } else {
        res.status(400).send("video not found");
    }
});

router.post("/", (req, res) => {
    const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        channel: "Red Cow",
        image: "default.jpeg",
        description: req.body.description,
        views: "10,500",
        likes: "2,675",
        duration: "4:01",
        video: "https://project-2-api.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: [],
    };
    videos.push(newVideo);

    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
    res.send("Video Uploaded!");
});



module.exports = router;