const bcrypt = require ('bcrypt')
const jsonwebtoken = require ('jsonwebtoken')
const { createUser, findUserByEmail, getAllUsers, deleteUser, updateUser } = require ('../services/userService')

exports.signup = async (req, res) =>
{
    try 
    {
        // Código para registrarse
        const { email, password, id } = req.body
        const existingUser = await findUserByEmail (email)

        if (existingUser.success)
        {
            return res.status (400).json
            ({
                message: 'Already registered user'
            })
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash (password, saltRounds)

        const newUser =
        {
            email: email,
            password: hashedPassword, 
            id: id
            // Agregar más campos
        }

        const userResult = await createUser (newUser)
        
        if (userResult.success)
        {
            res.status (201).json
            ({
                message: 'Registered user'
            })
        }
        else
        {
            res.status (500).json
            ({
                message: 'Error when registering user b'
            })
        }
    } 
    catch (err) 
    {
        res.status (500).json
        ({
            message: err.message
        })
    }
}

exports.login = async (req, res) =>
{
    try 
    {
        // Código para logearse
        const { email, password } = req.body
        const findEmail = await findUserByEmail (email)

        if (!findEmail.success)
        {
            res.status (401).json
            ({
                message: 'User not found'
            })
        }

        const user = findEmail.user
        const verifyPassword = await bcrypt.compare (password, user.password)

        if (!verifyPassword)
        {
            return res.status (401).json
            ({
                message: 'Incorrect password'
            })
        }

        const token = jsonwebtoken.sign 
        ({
            email: user.email,
            userId: user.id
        }, process.env.SUPERKEY, { expiresIn: '1h' })

        res.status (200).json
        ({
            token: token
        })
    } 
    catch (err) 
    {
        res.status (500).json
        ({
            message: err.message
        })
    }
}

exports.getAllUsers = async (req, res) =>
{
    try 
    {
        // Código para obtener usuarios
        const users = await getAllUsers ()

        res.status (200).json
        ({
            message: 'Success',
            users
        })
    } 
    catch (err) 
    {
        res.status (500).json
        ({
            message: 'Server error getting all users',
            error: err.message
        })
    }
}

exports.deleteUser = async (req, res) =>
{
    try 
    {
        // Código para borrar usuario
        const userId = req.params.id

        await deleteUser (userId)

        res.status (200).json
        ({
            message: 'User deleted successfully',
            users
        })
    } 
    catch (err) 
    {
        res.status (500).json
        ({
            message: 'Error deleting user',
            error: err.message
        })
    }
}

exports.updateUser = async (req, res) =>
{
    try 
    {
        // Código para actualizar usuario
        const userId = req.params.id
        const userData = req.body

        await updateUser (userId, userData)

        res.status (200).json
        ({
            message: 'User updated successfully',
            users
        })
    } 
    catch (err) 
    {
        res.status (500).json
        ({
            message: 'Error updating user',
            error: err.message
        })
    }
}