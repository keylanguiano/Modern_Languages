const jwt = require ('jsonwebtoken')

require ('dotenv').config ()

const authMiddleware = (req, res, next) =>
{
    const token = req.headers.authorization

    if (!token)
    {
        return res.status (401).json
        ({
            message: 'No token provided'
        })
    }

    try 
    {
        const validToken = jwt.verify (token, process.env.SUPERKEY)

        req.userData = validToken
        next ()
    } 
    catch (err) 
    {
        return res.status (401).json
        ({
            message: 'Invalid token'
        })
    }
}

module.exports = authMiddleware