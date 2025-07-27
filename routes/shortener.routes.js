import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import {Router} from 'express';
import {postURLshortener,getURLshortener,getURLshortenersub} from "../controllers/postshortener.controller.js";

const router=Router();


const serveFile= async (res, filePath,contentType)=>{
    try {
        const data =await fs.readFile(filePath); 
        res.writeHead(200, {'Content-Type':contentType});
        res.end(data);
    } catch (error) {
        res.writeHead(404, {'Content-Type':contentType});
        res.end("404 page not found");
    }
}





//controller
router.get("/",getURLshortener)
router.post("/", postURLshortener)
router.get("/:shortCode",getURLshortenersub);
// POST "/" - Handle URL shortening
// router.post("/", async (req, res) => {
//     try {
//         const { url, shortCode } = req.body;
//         const links = await loadLinks();

//         if (links[shortCode]) {
//             //  Short code already exists
//             const file = await fs.readFile(path.join("views", "index.html"));
//             const content = file.toString()
//                 .replace("{{ alert_message }}", `<script>alert("Short code already exists! Try another.");</script>`)
//                 .replace("{{ shortened_urls }}", Object.entries(links)
//                     .map(([code, originalUrl]) =>
//                         `<li><a href="/${code}" target="_blank">${req.headers.host}/${code}</a> - ${originalUrl}</li>`
//                     ).join("")
//                 );
//             return res.send(content);
//         }

//         // Save new short code
//         const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
//         links[finalShortCode] = url;
//         await saveLinks(links);

//         // Send success alert
//         const file = await fs.readFile(path.join("views", "index.html"));
//         const content = file.toString()
//             .replace("{{ alert_message }}", `<script>alert("URL shortened successfully!");</script>`)
//             .replace("{{ shortened_urls }}", Object.entries(links)
//                 .map(([code, originalUrl]) =>
//                     `<li><a href="/${code}" target="_blank">${req.headers.host}/${code}</a> - ${originalUrl}</li>`
//                 ).join("")
//             );
//         return res.send(content);

//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("Internal Server Error");
//     }
// });

router.get("/report",(req,res)=>{
    res.render("report");
})


// default export
//export default router;

// named export
export const shortenedRoutes=router;
