import { app } from "./app.js";
import { connectMongo } from "./config/config.js";
const port = process.env.PORT;
const startServer = async () => {
  try {
    await connectMongo();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};
startServer();
