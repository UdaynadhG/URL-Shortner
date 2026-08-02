import urls from '../models/urlmodel.js'
import { nanoid } from "nanoid";

const urlShortner = async (req, res) => {
    const { longUrl } = req.body
    if (!longUrl) return res.status(422).json({ message: "Long URL is required" })
    const urlInDb = await urls.findOne({ longURL: longUrl });
    if (urlInDb !== null) return res.status(200).json({ message: "Short URL", url: urlInDb.shortUrl })

    const shortId = await nanoid(6);
    const newUrl = await urls.create({ longURL: longUrl, shortCode: shortId });
    return res.status(200).json({ message: "Short URL", url: newUrl.shortUrl })
}

const urlRedirect = async (req, res) => {
    const shortCode = req.params.id;
    const url = await urls.findOne({ shortCode });
    if (!url) {
        return res.status(404).send("URL not found");
    }
    return res.redirect(url.longURL);
};

export { urlShortner, urlRedirect };