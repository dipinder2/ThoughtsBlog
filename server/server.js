const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');


require('dotenv').config();

require("./config/mongoose.config");
app.use(cookieParser());

app.use(express.json(), express.urlencoded({ extended: true }));



// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


const AllMyUserRoutes = require("./routes/user.routes");
const AllMyPostRoutes = require("./routes/post.routes");
AllMyUserRoutes(app);
AllMyPostRoutes(app);

app.listen(process.env.PORT||8000, () => console.log("The server is all fired up on port 8000"));
