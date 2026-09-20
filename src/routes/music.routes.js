const express = require("express");
const musicController = require("../controllers/music.controllers")
const multer = require("multer");
const authmiddleware = require("../middlewares/auth.middlewares")

const upload = multer({
    storage:multer.memoryStorage()
})

const router = express.Router();

router.post("/upload", authmiddleware.authArtist, upload.single("music"), musicController.createMusic);
router.post("/album",authmiddleware.authArtist, musicController.createAlbum);
router.get("/",authmiddleware.authUser, musicController.getAllMusic);
router.get("/album",authmiddleware.authUser, musicController.getAllMusic);
router.get("/albums/:albumId",authmiddleware.authUser, musicController.getAlbumById);

module.exports = router;