import {createServer} from 'http';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs/promises';
import express from 'express';



const app=express();




const PORT=3005;
const DATA_FILE=path.join("data","links.json");

app.use(express.static("public")); //middleware
app.use(express.urlencoded({ extended: true }));

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
app.get("/", async (req, res) => {
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

app.get("/:shortCode", async (req, res) => {
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
// POST "/" - Handle URL shortening
app.post("/", async (req, res) => {
    try {
        const { url, shortCode } = req.body;
        const links = await loadLinks();

        if (links[shortCode]) {
            //  Short code already exists
            const file = await fs.readFile(path.join("views", "index.html"));
            const content = file.toString()
                .replace("{{ alert_message }}", `<script>alert("Short code already exists! Try another.");</script>`)
                .replace("{{ shortened_urls }}", Object.entries(links)
                    .map(([code, originalUrl]) =>
                        `<li><a href="/${code}" target="_blank">${req.headers.host}/${code}</a> - ${originalUrl}</li>`
                    ).join("")
                );
            return res.send(content);
        }

        // Save new short code
        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
        links[finalShortCode] = url;
        await saveLinks(links);

        // Send success alert
        const file = await fs.readFile(path.join("views", "index.html"));
        const content = file.toString()
            .replace("{{ alert_message }}", `<script>alert("URL shortened successfully!");</script>`)
            .replace("{{ shortened_urls }}", Object.entries(links)
                .map(([code, originalUrl]) =>
                    `<li><a href="/${code}" target="_blank">${req.headers.host}/${code}</a> - ${originalUrl}</li>`
                ).join("")
            );
        return res.send(content);

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});



// const server=createServer(async (req,res)=>{
//     if(req.method==="GET"){
//         if(req.url==="/"){
//             return serveFile(res, path.join("public","index.html"),"text/html" );
//         }
//         else if(req.url==="/style.css"){
//             return serveFile(res,path.join("public","style.css"),"text/css");
//         }else if(req.url==="/links"){
//             const links=await loadLinks();
//             res.writeHead(200,{"Content-Type":"text/plain"})
//            return  res.end(JSON.stringify(links));
//         }else{
//             const links=await loadLinks();
//             const shortCode=req.url.slice(1);
//             console.log("link red",req.url);
//             if(links[shortCode]){
//                 res.writeHead(302,{location: links[shortCode]})
//                 return res.end();
//             }
//             res.writeHead(404,{"Content-Type":"text/plain"});
//             return res.end("Shortened URL is not found");
//         }
//     }

//     // if(req.method==="POST" && req.url==="/shorten"){

//     //     const links=await loadLinks();

//     //     let body="";
//     //     req.on("data",(chunk)=>{
//     //         body+=chunk;
//     //     })
//     //     req.on("end",async()=>{
//     //         console.log(body);
//     //         const {url,shortCode}=JSON.parse(body);

//     //         if(!url){
//     //             res.writeHead(400,{"Content-Type":"text/plain"});
//     //             return res.end(" URL is required");
//     //         }
//     //         const finalShortCode=shortCode || crypto.randomBytes(4).toString("hex");
//     //         if(links[shortCode]){
//     //             res.writeHead(400,{"Content-Type":"text/plain"});
//     //             return res.end(" Short code already exist ! try enter another");
//     //         }
//     //         links[finalShortCode]=url;
//     //         await saveLinks(links);
//     //         res.writeHead(200,{"Content-Type":"application/json"});
//     //         res.end(JSON.stringify({success:true,shortCode:finalShortCode}))
//     //     })

//     // }
// })

app.listen(PORT,()=>{
    console.log(`server running at https://localhost:${PORT}`);
});


// import express from 'express';
// import path from 'path';
// import { readFile, writeFile } from 'fs/promises';
// import crypto from 'crypto';

// const app = express();
// const PORT = 3005;
// const DATA_FILE = path.join("data", "links.json");

// // Middleware to serve static files and parse JSON
// app.use(express.static("public"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// // Helper to load links from JSON
// const loadLinks = async () => {
//     try {
//         const data = await readFile(DATA_FILE, "utf-8");
//         return data.trim() === "" ? {} : JSON.parse(data);
//     } catch (error) {
//         if (error.code === "ENOENT") {
//             await writeFile(DATA_FILE, JSON.stringify({}));
//             return {};
//         }
//         throw error;
//     }
// };

// // Helper to save links
// const saveLinks = async (links) => {
//     await writeFile(DATA_FILE, JSON.stringify(links));
// };

// // GET "/" - Serve home page and list of shortened URLs
// app.get("/", async (req, res) => {
//     try {
//         const file = await readFile(path.join("views", "index.html"));
//         const links = await loadLinks();
//         const content = file.toString().replaceAll(
//             "{{ shortened_urls }}",
//             Object.entries(links)
//                 .map(
//                     ([shortCode, url]) =>
//                         `<li><a href="/${shortCode}" target="_blank">${req.headers.host}/${shortCode}</a> - ${url}</li>`
//                 )
//                 .join("")
//         );
//         return res.send(content);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("Internal server error");
//     }
// });

// // GET "/:shortCode" - Redirect to the original URL
// app.get("/:shortCode", async (req, res) => {
//     const { shortCode } = req.params;
//     const links = await loadLinks();
//     if (!links[shortCode]) return res.status(404).send("404 error occurred");
//     return res.redirect(links[shortCode]);
// });

// // POST "/" - Handle URL shortening
// app.post("/", async (req, res) => {
//     try {
//         const { url, shortCode } = req.body;
//         const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
//         const links = await loadLinks();

//         if (links[finalShortCode]) {
//             return res.status(400).send("Short code already exists! Try another.");
//         }

//         links[finalShortCode] = url;
//         await saveLinks(links);

//         return res.status(200).json({ success: true, shortCode: finalShortCode });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("Internal Server Error");
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });
