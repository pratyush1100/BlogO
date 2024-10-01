import mongoose from "mongoose";

export const connection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "BLOG_WEBSITE",

    }).then(() => {
        console.log("Connected to Database");
    }).catch((err) => {
        console.log("Error while connecting to database: ", err);
    })
}