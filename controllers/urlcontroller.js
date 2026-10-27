import shortid from "shortid";
import URL from "../models/urlmodel.js";

export const createShortURL = async (longURL) => {

        const newId = shortid.generate();
        await URL.create({
            shortId: newId,
            redirectURL: longURL
        });

        return newId;
};

export const checkShortURL = async (id) => {
    const user = await URL.findOne(
        { shortId: id }
    );
    if (!user) throw new Error("No URL found for this Short ID");
    const longURL = user.redirectURL;
    return longURL;
}
