const { log } = require('console');
const Program = require('../Model/program');
const User = require('../Model/user');


const frontController = {

    login: (req, res) => {
        res.render('login');

    },
    home: async (req, res) => {
        try {
            const listaProgramas = await Program.find({});

            return res.render('home', {
                programas: listaProgramas
            });

        } catch (error) {
            console.log(error);
            res.render('error');
        }
    },

    contactUs: (req, res) => {
        res.render('contactanos');
    },
    aboutUs: (req, res) => {
        res.render('sobreNosotros');
    },
    programsList: async (req, res) => {
        try {
            const listaProgramas = await Program.find({});

            return res.render('programas', {
                programas: listaProgramas
            });

        } catch (error) {
            console.log(error);
            res.render('error');
        }

    },
    register: (req, res) => {
        res.render('register');
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.render('logout');
    },
    admin: (req, res) => {
        res.render('adminPanel');
    },
    usersPanel: async (req, res) => {
        try {
            const listaUsers = await User.find({});

            return res.render('adminUsers', {
                users: listaUsers
            });

        } catch (error) {
            console.log(error);
            res.render('error');
        }
    },
    programPanel: async (req, res) => {
        try {
            const listaProgramas = await Program.find({});

            return res.render('adminPrograms', {
                programas: listaProgramas
            });

        } catch (error) {
            console.log(error);
            res.render('error');
        }
    },
};



module.exports = frontController;
