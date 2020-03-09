import { Router, Request, Response } from "express";
import fs from "fs-extra";
//Cloudinary
import { v2 } from "cloudinary";
const cloudinary = v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Models
import PhotoSchema, { IPhoto } from "../models/Photo";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.redirect("/images");
});

router.get("/image", async (req: Request, res: Response) => {
  const photos = await PhotoSchema.find();
  console.log(photos);
  res.render("images", { photos });
});

router.get("/image/add", (req: Request, res: Response) => {
  res.render("imageForm");
});

router.post("/image/add", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  console.log(req.body);
  console.log(req.file);
  const result = await cloudinary.uploader.upload(req.file.path);
  console.log(result);
  const newPhoto: IPhoto = new PhotoSchema({
    title,
    description,
    imageURL: result.url,
    public_id: result.public_id
  });
  await newPhoto.save();
  await fs.unlink(req.file.path);
  res.redirect("/image");
});

export default router;
