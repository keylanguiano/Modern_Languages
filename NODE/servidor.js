import express from 'express'
import bcrypt from 'bcrypt'
import 'dotenv/config'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getFirestore, setDoc, getDocs, deleteDoc } from 'firebase/firestore'
// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: "crud-practica1-77322.firebaseapp.com",
    projectId: "crud-practica1-77322",
    storageBucket: "crud-practica1-77322.appspot.com",
    messagingSenderId: "258057367721",
    appId: "1:258057367721:web:bfdee2bc5302ef0ca4f9b8"
};

// Initialize Firebase

// Conecta a la base de datos con la configuración anteriormente indicada
const firebase = initializeApp(firebaseConfig);
const db = getFirestore ();
const app = express ();

app.use (express.json ())

app.get ('/', (req, res) =>
{
    res.send ('Respuesta de raiz 🌺')
})

// Validación general de información
app.post ('/signup', (req, res) =>
{
    const { nombre, apaterno, amaterno, telefono, usuario, password } = req.body
    console.log ('@Keyla body => ', req.body)
    
    if (nombre.length < 3)
    {
        res.json ({
            'alerta': 'El nombre debe tener una longitud mínima 3 caracteres'
        })
    }
    else if (!apaterno.length)
    {
        res.json ({
            'alerta': 'Se debe ingresar el apellido paterno '
        })
    }
    else if (!usuario.length)
    {
        res.json ({
            'alerta': 'Se debe ingresar el nombre de usuario'
        })
    }
    else if (password.length < 6)
    {
        res.json ({
            'alerta': 'La contraseña debe tener una longitud mínima de 6 caracteres'
        })
    }
    else
    {
        const usuarios = collection (db, 'usuarios')
        getDoc ( doc(usuarios, usuario) ).then (user => 
        {
            // Validación de nombre de usuario
            if (user.exists ())
            {
                res.json ({
                    'alerta': 'El nombre de usuario ya existe'
                })
            }
            // Encriptación de contraseña
            else
            {
                bcrypt.genSalt (10, (err, salt) => {
                    // La cadena ya encriptada
                    bcrypt.hash (password, salt, (err, hash) => 
                    {
                        req.body.password = hash

                        setDoc (doc (usuarios, usuario), req.body).then (registered => 
                        {
                            res.json ({
                                'alerta': 'Success', registered
                            })
                        })
                    })
                })
            }
        })
    }

})

app.post ('/login', (req, res) =>
{
    const {usuario, password} = req.body

    if (!usuario.length || !password.length)
    {
        return res.json ({
            'alerta': 'Algunos campos están vacíos'
        })
    }
    
    const usuarios = collection (db, 'usuarios')

    getDoc (doc (usuarios, usuario)). then (user =>
    {
        if (!user.exists ())
        {
            res.json ({
                'alerta': 'El usuario no existe'
            })
        }
        else
        {
            bcrypt.compare (password, user.data ().password, (err, result) =>
            {
                if (result)
                {
                    let userFound = user.data ()

                    res.json ({
                        'alerta': 'Success',
                        'usuario': userFound
                    })
                }
                else
                {
                    res.json ({
                        'alerta': 'La contraseña no coincide'
                    })
                }
            })
        }
    })
})

app.get ('/get-all', async (req, res) =>
{
    const usuarios = collection (db, 'usuarios')
    const docUsuarios = await getDocs (usuarios)
    const arrUsuarios = []

    docUsuarios.forEach ((usuario) =>
    {
        const obj =
        {
            nombre: usuario.data ().nombre,
            apaterno: usuario.data ().apaterno,
            amaterno: usuario.data ().amaterno,
            telefono: usuario.data ().telefono,
            usuario: usuario.data ().uauario
        }
        console.log ('@ Keyla => Usuarios ', usuarios)
        arrUsuarios.push (obj)
    })

    if (arrUsuarios.length > 0)
    {
        res.json
        ({
            'alerta': 'succes',
            'data': arrUsuarios
        })
    }
    else
    {
        res.json
        ({
            'alerta': 'error',
            'message': 'No hay usuarios en la base de datos'
        })
    }
})

app.post ('/delete-user', (req, res) =>
{
    const { usuario } = req.body
    deleteDoc (doc (collection (db, 'usuarios'), usuario  ) ).then (data =>
    {
        if (data)
        {
            res.json
            ({
                'alerta': 'El usuario fue borrado'
            })
        }
        else
        {
            res.json
            ({
                'alerta': 'El usuario no existe en la base de datos'
            })
        }
    })
    .catch (err =>
    {
        res.json
        ({
            'alerta': 'Fallo',
            'message': err
        })
    })
})


const port = process.env.PORT || 600

app.listen (port, () =>
{
    console.log (`Servidor escuchando: ${port} 🤍`)
})