const bcrypt = require ('bcrypt')
const firebase = require ('../config/firebase')
const usersCollection = firebase.firestore (). collection ('users')

exports.createUser = async (userData) =>
{
    try 
    {
        await usersCollection.doc (userData.id).set (userData)

        return {
            success: true
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

exports.findUserById = async (userId) =>
{
    try 
    {
        const userFound = await usersCollection.doc (userId).get ()

        if (userFound.exists)
        {
            return {
                success: true,
                user: userDoc.data ()
            }
        }
    } 
    catch (err) 
    {
        return {
            success: false,
            error: 'User not found'
        }
    }
}

exports.findUserByEmail = async (email) =>
{
    try 
    {
        const userEmail = await usersCollection.where ('email', '==', email).get ()

        if (!userEmail.empty)
        {
            const userFound = userEmail.docs [0]

            return {
                success: true,
                user: userFound.data ()
            }
        }
        else
        {
            return {
                success: false,
                error: 'User not found'
            }
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

exports.getAllUsers = async () =>
{
    try 
    {
        const allUsers = await usersCollection.get ()

        const users = []
        
        allUsers.forEach ((doc) =>
        {
            users.push (doc.data ())
        })

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
        await usersCollection.doc (userId).delete ()
    } 
    catch (err) 
    {
        throw new Error ('Error deleting users ' + err.message)
    }
}

exports.updateUser = async (userId, userData) =>
{
    try 
    {
        await usersCollection.doc (userId).update (userData)
    } 
    catch (err) 
    {
        throw new Error ('Error updating users ' + err.message)
    }
}