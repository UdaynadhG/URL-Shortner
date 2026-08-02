import urls from './models/urlmodel.js'
import { nanoid } from "nanoid";

<<<<<<< HEAD
const urlShortner = async (req, res) => {
    const { longUrl } = req.body
    if (!longUrl) return res.status(422).json({ message: "Long URL is required" })
    const urlInDb = await urls.findOne({ longURL: longUrl })
    if (!urlInDb) return res.status(200).json({ message: "Short URL", url: urlInDb.shortUrl })

    const shortId = await nanoid(6);
    const newUrl = await urls.create({ longURL: longUrl, shortCode: shortId })
    return res.status(200).json({ message: "Short URL", url: newUrl.shortUrl })
=======
const urlShortner = async (req, res)=>{
    const {longUrl} = req.body
    if(!longUrl) return res.status(422).json({message:"Long URL is required"})
    const urlInDb = await urls.findOne({longURL:longUrl})
    if(!urlInDb) return res.status(200).json({message:"Short URL", url:urlInDb.shortUrl})
    
    const shortId = await nanoid(6);
    const newUrl = await urls.create({longURL:longUrl, shortCode:shortId})
    return res.status(200).json({message:"Short URL", url:newUrl.shortUrl}) 
>>>>>>> origin/Jeevan
}
