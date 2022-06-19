import { Document, PopulatedDoc, Schema, model } from "mongoose";

import { BoardI } from "./BoardModel";

const dataType = ["CALL", "CHECK", "CANCEL"];

export interface DataI extends Document {
  data: number;
  dataType: typeof dataType[number];
  board: PopulatedDoc<BoardI>;
  createdAt: Date;
}

const DataModelSchema = new Schema({
  data: {
    type: Number,
    required: true,
  },
  dataType: {
    type: String,
    enum: dataType,
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
