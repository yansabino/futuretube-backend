import express from "express";
import { signUpEndpoint } from "./endpoints/user/signUp";
import { loginEndpoint } from "./endpoints/user/login";
import { changePasswordEndpoint } from "./endpoints/user/changePassword";
import { uploadVideoEndPoint } from "./endpoints/video/uploadVideo";
import { getUserVideosEndPoint } from "./endpoints/video/getUserVideos";
import { changeVideoInfosEndPoint } from "./endpoints/video/changeVideoInfos";
import { deleteVideoEndPoint } from "./endpoints/video/deleteVideo";
import { getAllVideosEndPoint } from "./endpoints/video/getAllVideos";
import { getAllVideoInfos } from "./endpoints/video/getAllVideoInfos";
import { getUserByIdEndPoint } from "./endpoints/user/getUserById";

var cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())

app.post("/signup", signUpEndpoint);
app.post("/users/changePassword", changePasswordEndpoint);
app.post("/login", loginEndpoint);
app.post("/videos/upload", uploadVideoEndPoint);
app.get("/users/videos/", getUserVideosEndPoint);
app.post("/videos/changeInfos", changeVideoInfosEndPoint)
app.delete("/videos/delete/:videoId", deleteVideoEndPoint)
app.get("/videos/", getAllVideosEndPoint)
app.get("/videos/info", getAllVideoInfos)
app.get("/user", getUserByIdEndPoint)

export default app;
