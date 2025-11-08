const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    //Verificar que el usuario exista
    const user = await User.findOne({email})
    
    //Si el usuario existe verificar la contraseña
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            nombre: user.nombre,
            email: user.email,
            token: generateToken(user.id)
        })
    }
})

const register = asyncHandler(async (req, res) => {
    const {nombre, email, password} = req.body;

    //verificar que nos pasen todos los datos    
    if (!nombre || !email ||!password){
        res.status(400);
        throw new Error('Faltan datos');
    }
    const userExists = await User.findOne({email});
    
    //verificar que el usuario no exista
    if (userExists){
        res.status(400);
        throw new Error('El usuario ya existe');
    } else {
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Crear usuario
        const user = await User.create({
            nombre,
            email,
            password: hashedPassword
        });
        
        //Si el usuario se creo correctamente, lo muestro
        if (user){
            res.status(201).json({
                _id: user.id,
                nombre: user.nombre, 
                email: user.email,
                password: user.password,
            })
        } else {
                res.status(400);
                throw new Error('Datos de usuario no validos'); 
            }
        }
    });

const data = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    login, register, data
}
