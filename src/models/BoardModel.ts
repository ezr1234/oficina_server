import { Document, Schema, model } from "mongoose";

export interface BoardI extends Document {
  mac: string;
  createdAt: Date;
}

const Board = new Schema({
  mac: {
    type: String,
    required: true,
    unique: true,
  },
  serial: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["transmitter", "receptor"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<BoardI>("Board", Board, "boards");
