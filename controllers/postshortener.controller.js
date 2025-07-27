import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

export const postURLshortener= (loadLinks,saveLinks)=>async (req, res) => {
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