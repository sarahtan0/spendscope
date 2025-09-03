import { InferSchemaType, model, Schema } from "mongoose";
import UserModel from "./user";

const logSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    title: {type: String, required: true},
    cost: {type: Number, required: true},
    section: {type: String, required: true},
}, {timestamps: true});

logSchema.post("save", async function(newLog){
    const month = newLog.createdAt.getMonth();
    try{
        const user = await UserModel.findById(newLog.userId);
        if(user){
            user.monthTotals[month] += newLog.cost;
            await user.save();
        }
    } catch(error){
        console.error(error);
    }
})

type Log = InferSchemaType<typeof logSchema>;

export default model<Log>("Log", logSchema);