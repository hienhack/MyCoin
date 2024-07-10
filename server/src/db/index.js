import mongoose from "mongoose";

const uri =
    "mongodb+srv://my-coin:hienthai@cluster0.9covuig.mongodb.net/my-coin?retryWrites=true&w=majority";

export default function connectDB() {
    mongoose.connect(uri).then(async () => {
        console.log("db connected");
    });
}