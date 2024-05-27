const fs = require('fs');
const { buffer } = require('stream/consumers');


const routesHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {

        res.write('<html>');
        res.write('<head><title>george practice</title></head>');
        res.write('<body><form action="/create-users" method="POST"><input type="text" name="user" ></input><button type="submit">create user</button></form></body>');
        res.write('</html>')
        return res.end()
    }

    if (url === '/create-users' && method === 'POST') {

        const body = [];

        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const user = parsedBody.split('=')[0];
            console.log(user);
        })
        res.statusCode = 302;
        res.setHeader('location', '/');
        return res.end();
    }

    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>user page</title></head>');
        res.write('<body><ul><lil>user1</lil></ul></body>')
        res.write('</html>')
        return res.end()
    }

}


module.exports = routesHandler;