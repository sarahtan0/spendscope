import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, select: false},
    password: {type: String, required: true, select: false},
    monthBudget: {type: Number, default: 0},
    monthTotals: {type: [Number], default: [0,0,0,0,0,0,0,0,0,0,0,0]},
})

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);