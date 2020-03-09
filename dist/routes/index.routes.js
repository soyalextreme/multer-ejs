"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_extra_1 = __importDefault(require("fs-extra"));
//Cloudinary
const cloudinary_1 = require("cloudinary");
const cloudinary = cloudinary_1.v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// Models
const Photo_1 = __importDefault(require("../models/Photo"));
const router = express_1.Router();
router.get("/", (req, res) => {
    res.redirect("/images");
});
router.get("/image", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const photos = yield Photo_1.default.find();
    console.log(photos);
    res.render("images", { photos });
}));
router.get("/image/add", (req, res) => {
    res.render("imageForm");
});
router.post("/image/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    console.log(req.body);
    console.log(req.file);
    const result = yield cloudinary.uploader.upload(req.file.path);
    console.log(result);
    const newPhoto = new Photo_1.default({
        title,
        description,
        imageURL: result.url,
        public_id: result.public_id
    });
    yield newPhoto.save();
    yield fs_extra_1.default.unlink(req.file.path);
    res.json({ response: "recivido" });
}));
exports.default = router;
