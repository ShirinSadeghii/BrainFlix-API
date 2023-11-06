const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();
const { PORT } = process.env;
const videoRouter = require('./routes/videoRouter');

app.use(express.json());
app.use(cors());
app.use(express.static(`public`));
app.use("/videos",videoRouter);

app.get("/", (req, res) => {
    res.send("Made it to the server");
})

app.listen(PORT, () => {
    
})

