const http = require('node:http');
const fs = require('node:fs').promises;
const express = require('express');
const app = express();

const PORT = 8000;

async function read(filename) {

    try {
        const data = await fs.readFile(`./${filename}`, 'utf8');
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }

}

app.get('/', async (req,res) => {
    res.send(await read('index.html'))
})
app.get('/about', async (req,res) => res.send(await read('about.html')))
app.get('/contact-me', async (req,res) => res.send(await read('contact-me.html')))
app.get('/', async (req,res) => res.send(await read('404.html')))

app.listen(PORT, () => console.log(`Basic site listening on port ${PORT}`));