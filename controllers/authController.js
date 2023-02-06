const User = require('../models/User.js');
const bcrypt = require('bcryptjs');


module.exports = class AuthController {

    static login(req,res) {
        res.render('auth/login');
    }

    static async loginPost(req,res) 
    {
        const {email,pass} = req.body;

        //find user
        const user = await User.findOne({where: {email: email}});

        if (!user) {
            req.flash('message','Usuário não encontrado!')
            res.render('auth/login');
            return;
        }

        //check pass match's

        const passMatch = bcrypt.compareSync(pass, user.pass);

        if (!passMatch) {
            req.flash('message', 'Senha inválida!');
            res.render('auth/login');
            return
        }

        req.session.userid = user.id;

        req.flash('message','Login Feito com sucesso!!');

        req.session.save(() => {
            res.redirect('/')
        })
    }

    static register(req,res) {
        res.render('auth/register')
    }

    static async registerPost(req,res) {
        const {name, email, pass, confirmPass} = req.body;

        //pass validation match with flash message

        if (pass != confirmPass) {
            req.flash('message','Senhas não são iguais, digite novamente!');
            res.render('auth/register')

            return;
        }

        // check if user exists

        const checkUserExistis = await User.findOne({where: {email: email}});

        if (checkUserExistis) {
            req.flash('message','Já existe um usuário com esse e-mail!');
            res.render('auth/login');

            return;
        }

        //create pass
        const salt = bcrypt.genSaltSync(12);
        const hashedPass = bcrypt.hashSync(pass,salt);

        const user = {
            name,
            email,
            pass: hashedPass
        }
        await User.create(user).then((user) => {
            req.session.userid = user.id;

            req.flash('message','Cadastro realizado com sucesso!');

            req.session.save(() => {
                res.redirect('/')
            })

        }).catch(error => console.log(error))
        
    }

    static logout(req,res) {
        req.session.destroy();
        res.redirect('/login')
    }
}