const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
const DB = require("./src/config/DB");

const PORT = process.env.PORT || 5000;
// connect db then start the server
DB(() => {
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
});
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
