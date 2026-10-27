import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    redirectURL: { type: String, required: true }
});

const URL = mongoose.model("URL", UrlSchema);
export default URL;