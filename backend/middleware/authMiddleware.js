const jwt = require('jsonwebtoken')
const user = require('../models/userModel')

const protect = async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
             //Obtengo el token del header
            token - req.headers.authorization.split('')[1]

            //verifico el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Obtengo el usuario desde el token
            req.user = await UserActivation.findById(decoded.id).select('-password')

            next()
        }
        catch (error){
            res.status(401)
            throw new Error('No autorizado, token no válido')
        }
    }
    if (!token){
        res.status(401)
        throw new Error('No autorizado, token no proporcionado')
    }
}

module.exports = { protect }