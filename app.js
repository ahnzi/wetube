import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet({ contentSecurityPolicy: false })); // application 의 안정성을 위한 미들웨어
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); // directory 에서 file 을 보내주는 미들웨어
app.use("/static", express.static("static"));
app.use(cookieParser()); // 사용자 인증 시 필요한 미들웨어
app.use(bodyParser.json()); // 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // application 에서 발생하는 모든 일들을 logging 하는 미들웨어
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new CookieStore({ mongooseConnection: mongoose.connection })
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware); // 지역 변수를 전역 변수로 사용할 수 있게 해주는 미들웨어

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app; 
