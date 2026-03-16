import serverless from "serverless-http";
import app from "../Backend/index.js";

export default serverless(app);