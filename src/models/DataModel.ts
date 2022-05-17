import { Document, PopulatedDoc, Schema, model } from "mongoose";

import { BoardI } from "./BoardModel";

export interface DataI extends Document {
  data: number;
  board: PopulatedDoc<BoardI>;
  createdAt: Date;
}

const DataModelSchema = new Schema({
  data: {
    type: Number,
    required: true,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<DataI>("Data", DataModelSchema, "data");
