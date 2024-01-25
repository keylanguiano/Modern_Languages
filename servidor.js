const express = require ('express')
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const app = express ()
const port = 600

// Conexion a la base de datos en Firebase

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEFDu2dwDq0-HMiGrJOmr3NnLIYDRr9NI",
  authDomain: "crud-practica1-77322.firebaseapp.com",
  projectId: "crud-practica1-77322",
  storageBucket: "crud-practica1-77322.appspot.com",
  messagingSenderId: "258057367721",
  appId: "1:258057367721:web:bfdee2bc5302ef0ca4f9b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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