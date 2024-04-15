const http = require ('http')
const port = 510

const server = http.createServer ( (req, res) => 
{
    res.end ('Hola 🌺')
})

server.listen (port, () => 
{
    console.log ('Servidor trabajando 🦋')
})