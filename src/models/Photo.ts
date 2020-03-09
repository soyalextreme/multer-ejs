import { model, Schema, Document } from "mongoose";

export interface IPhoto extends Document {
  title: String;
  description: String;
  imageURL: String;
  public_id: String;
}

const PhotoSchema = new Schema({
  title: String,
  description: String,
  imageURL: String,
  public_id: String
});

export default model<IPhoto>("Photo", PhotoSchema);
