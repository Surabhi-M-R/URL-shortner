import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { loadLinks,saveLinks } from '../models/shortener.model.js';


export const getURLshortener= async (req, res) => {
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
};

export const postURLshortener =async (req, res) => {
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
};
 export const getURLshortenersub=async (req, res) => {
    try{
    const { shortCode } = req.params;
    const links = await loadLinks();
    if (!links[shortCode]) return res.status(404).send("404 error occurred");
    return res.redirect(links[shortCode]);
    }catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
};