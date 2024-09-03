import express from "express"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { config } from "dotenv";
import { connection } from "./database/connection.js";
import { getUser, login, logout, register } from "./controllers/userController.js";
import { deletePost, editBlogPosts, getAll, getMyPosts, postBlog } from "./controllers/blogController.js";
import { isAuthenticated } from "./middlewares/auth.js";
import cloudinary from "cloudinary";

const app = express();


config({ path: "./config/.env" });

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

connection();


// User Routes 
app.post("/blog/register", register)
app.post("/blog/login", login)
app.get("/blog/logout", logout)
app.get("/blog/getuser", getUser)


// Blog Routes
app.post("/blog/postblog", isAuthenticated, postBlog);
app.get("/blog/getall", getAll);
app.get("/blog/myposts", isAuthenticated, getMyPosts);
app.put("/blog/editblog/:id", isAuthenticated, editBlogPosts);
app.delete("/blog/delete/:id", isAuthenticated, deletePost);


app.listen(process.env.PORT, () => {
    console.log(`App is listening at port ${process.env.PORT}`);

})

