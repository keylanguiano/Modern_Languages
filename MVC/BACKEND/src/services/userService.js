const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const { createUser, findUserByEmail, getAllUsers, deleteUser, updateUser } = require ('../models/userModel.js')
const { error } = require('console')
// Acceso a las variables de desarrollo del archivo env
require ('dotenv'). config ()

exports.createUser = async (userData) =>
{
    try 
    {
        const createdUser = await createUser (userData)

        if (createdUser.success)
        {
            return {
                success: true
            }
        }

        return {
            success: false,
            message: 'Error when registering user'
        }
    } 
    catch (err) 
    {
        return {
            success: false,
            error: err.message
        }
    }
}

exports.findUserByEmail = async (email) =>
{
    try 
    {
        const found = await findUserByEmail (email)

        if (found.success)
        {
            return {
                success: true,
                user: found.user
            }
        }

        return {
            success: false,
            message: 'User not found'
        }
    } 
    catch (err) 
    {
        return {
            success: false,
            error: err.message
        }
    }
}

exports.verifyPassword = async (plainPassword, hashedPassword) =>
{
    try 
    {
        const verifyPassword = await bcrypt.compare (plainPassword, hashedPassword)

        return verifyPassword
    } 
    catch (err) 
    {
        throw new Error ('Error when comparing passwords')
    }
}

exports.generateToken = async (user) =>
{
    try 
    {
        const token = jwt.sign 
        ({
            email: user.email,
            userId: user.id
        }, process.env.SUPERKEY, { expiresIn: '1h' })

        return token
    } 
    catch (err) 
    {
        throw new Error ('Error generating token')
    }
}

exports.getAllUsers = async () =>
{
    try 
    {
        const users = await getAllUsers ()

        return users
    } 
    catch (err) 
    {
        throw new Error ('Error getting users ' + err.message)
    }
}

exports.deleteUser = async (userId) =>
{
    try 
    {
        await deleteUser (userId)
    } 
    catch (err) 
    {
        throw new Error ('Error deleting user ' + err.message)
    }
}

exports.updateUser = async (userId, userData) =>
{
    try 
    {
        await updateUser (userId, userData)
    } 
    catch (err) 
    {
        throw new Error ('Error updating user ' + err.message)
    }
}