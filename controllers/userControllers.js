const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//OBTENER LISTA DE USUARIOS (READ)
const getUsers = async (req, res) => {

    const users = await User.find();
    res.json({
        users: users
    });
    console.log("Lista de usuarios obtenida exitosamente")
};

// CREAR USUARIO (CREATE)
const createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        console.log(req.body);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const errorMessage = 'Ya existe una cuenta vinculada a este email';
            console.log(errorMessage);

            return res.status(400).json({ error: errorMessage });
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username: username,
            password: hashedPassword,
            email: email
        });

        await User.create(user);

        res.status(201).json({ message: 'Usuario creado exitosamente' });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error al crear el usuario'
        });
    }
};

// ACTUALIZAR USUARIO (UPDATE)
const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const { username, password, email, role } = req.body;

    try {
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        };

        let newPasswordHash = existingUser.password;
        if (password) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            newPasswordHash = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                username,
                password: newPasswordHash,
                email,
                role
            },
            { new: true }
        );

        if (updatedUser) {
            res.json({ success: true, user: updatedUser });
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

// ELIMINAR USUARIO (DELETE)
const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (deletedUser) {
            res.json({ success: true, message: 'Usuario eliminado exitosamente' });
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error interno del servidor al eliminar usuario' });
    }
};

// LOGIN USUARIO
const userLogin = async (req, res) => {

    const isValidCredentials = async (user) => {
        try {
            const userFound = await User.findOne({ email: user.email });

            if (!userFound) {
                return { ok: false, message: 'Usuario no encontrado' };
            }

            const isMatch = await bcrypt.compare(user.password, userFound.password);

            if (!isMatch) {
                return { ok: false, message: 'Contraseña incorrecta' };
            }

            return { ok: true, userFound };

        } catch (error) {

            console.error(error);
            return { ok: false, message: 'Error en la autenticación' };
        }
    };

    try {
        const { email, password } = req.body;
        const validation = await isValidCredentials({ email, password });

        if (validation.ok) {
            const user = validation.userFound;
            const payload = { user: { id: user.id } };
            const token = jwt.sign(payload, 'jwtSecret', { expiresIn: 3600 });

            req.session.user = {
                _id: user._id,
                username: user.username,
                role: user.role,
                email: user.email,
                token: token,
            };

            await req.session.save();

            console.log(`Usuario autenticado: ${user.username}, Rol: ${user.role}`);

            res.status(200).json({ message: 'Acceso al sistema exitoso', user });

        } else {

            res.status(401).json({ message: validation.message });
        }
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


// LOGOUT USUARIO
const userLogout = (req, res) => {

    try {

        res.clearCookie('token');
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                res.status(500).json({ message: 'Error al cerrar sesión' });
            } else {
                res.status(200).json({ message: 'Cierre de sesión exitoso' });
            }
        });

    } catch (error) {

        console.error('Error al cerrar sesión:', error);
        res.status(500).json({ message: 'Error al cerrar sesión' });
    }
};


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    userLogin,
    userLogout,
};