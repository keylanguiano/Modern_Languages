const express = require ('express')
const app = express ()
const port = 600

app.get ('/', (req, res) =>
{
    res.send ('Respuesta de raiz 🌺')
})

app.get ('/contacto', (req, res) =>
{
    res.send ('Respuesta desde contacto 📱')
})

app.listen (port, () =>
{
    console.log (`Servidor escuchando: ${port} 🤍`)
})