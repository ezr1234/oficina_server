import { Document, Schema, model } from "mongoose";

export interface BoardI extends Document {
  mac: string;
  name: string;
  serial: string;
  createdAt: Date;
}

const Board = new Schema({
  mac: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
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
