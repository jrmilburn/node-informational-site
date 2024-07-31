const http = require('node:http');
const fs = require('node:fs').promises;
const url = require('url');

async function read(filename) {

    try {
        const data = await fs.readFile(`./${filename}`, 'utf8');
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }

}

async function returnFile(pageData, res) {

    res.writeHead(200, { 'Content-Type': 'text/html'});
    console.log(pageData);
    res.end(pageData);

}

const server = http.createServer(async (req, res) => {

    let data;

    try {
        switch (req.url) {
            case '/' :
                    data = await read('index.html');
                    returnFile(data, res);
                break;
            case '/about':
                    data = await read('about.html');
                    returnFile(data, res);
                break;
            case '/contact-me':
                    data = await read('contact-me.html');
                    returnFile(data, res);
                break;
            default:
                    data = await read('404.html');
                    returnFile(data, res);
                break;
            
        }
    } catch (err) {
        console.log(err);
    }

});

server.listen(8000);