const { Telegraf } = require("telegraf");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

//
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
// Middleware to parse JSON requests
// connecting db
let dbURL = process.env.DBURL;
// initializing port
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these HTTP methods
    credentials: true, // Allow cookies to be sent
  })
);

// connecting the db

mongoose
  .connect(dbURL)
  .then((result) => {
    app.listen(PORT);
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const web_link = "https://coremining.netlify.app/";
const bot_link = "https://t.me/News_Pointsbot";

bot.start((ctx) => {
  const referrerId = ctx.startPayload;
  const userId = ctx.from.id; // Get referrer's user ID
  const referralLink = `${web_link}?referrerId=${referrerId}`; // Corrected referral link
  const username = ctx.from.username ? `@${ctx.from.username}` : "there";
  // Send the initial message with inline keyboard
  ctx.reply(
    `Hey ${username}! It's CoreMining! ⛏️ Your ultimate app for digging deep into the riches of the Earth, right at your fingertips! 📲\n\We're thrilled to launch our new Telegram mini app! Start mining points now, and who knows what ancient treasures you'll uncover soon! 🚀\n\nGot friends? Bring 'em into the fold! The more, the stronger our mining community! ⛏️ \n\nRemember: CoreMining is where prosperity is forged and endless opportunities await!!! 🌟`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Launch CoreMining",
              web_app: { url: referralLink },
            },
          ],
          [
            {
              text: "Join Community",
              url: "https://t.me/earnthroughnews",
            },
          ], // Replace with the actual link to your community
        ],
      },
    }
  );
});

bot.launch();

// Health check route
app.get("/", (req, res) => {
  res.status(200).send("OK");
});
// ROUTES
app.use("/api/user", require("./routes/user"));
app.use("/api/task", require("./routes/task"));
//https://x.com/intent/user?screen_name=nuelyoungtech