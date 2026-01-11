const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const route = require("./routes/route");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
require("dotenv").config();
const { dbConnect } = require("./config/database");
const PORT = process.env.PORT || 4000;
const cors = require("cors");

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use("/api/v1/", route);

dbConnect();

app.listen(PORT, () => {
    console.log(`App is started at ${PORT} port number`);
});
