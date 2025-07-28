import { InferSchemaType, model, Schema } from "mongoose";

const logSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    title: {type: String, required: true},
    cost: {type: Number, required: true},
    section: {type: String, required: true},
}, {timestamps: true});

type Log = InferSchemaType<typeof logSchema>;

export default model<Log>("Log", logSchema);