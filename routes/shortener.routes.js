import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import {Router} from 'express';
import {postURLshortener} from "../controllers/postshortener.controller.js";

const router=Router();
const DATA_FILE=path.join("data","links.json");


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

const loadLinks = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return data.trim() === "" ? {} : JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

const saveLinks=async(links)=>{
    await fs.writeFile(DATA_FILE,JSON.stringify(links)); 
}


router.get("/", async (req, res) => {
    try {
        const file = await fs.readFile(path.join("views", "index.html"));
        const links = await loadLinks();
        const content = file.toString().replaceAll(
            "{{ shortened_urls }}",
            Object.entries(links)
                .map(
                    ([shortCode, url]) =>
                        `<li><a href="/${shortCode}" target="_blank">${req.headers.host}/${shortCode}</a> - ${url}</li>`
                )
                .join("")
        );
        return res.send(content);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
});

router.get("/:shortCode", async (req, res) => {
    try{
    const { shortCode } = req.params;
    const links = await loadLinks();
    if (!links[shortCode]) return res.status(404).send("404 error occurred");
    return res.redirect(links[shortCode]);
    }catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
});
//controller
router.post("/", postURLshortener(loadLinks,saveLinks))
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
