import { InferSchemaType, model, Schema } from "mongoose";

const logSchema = new Schema({
    title: {type: String, required: true},
    cost: {type: Number, required: true},
}, {timestamps: true});

type Log = InferSchemaType<typeof logSchema>;

export default model<Log>("Log", logSchema);