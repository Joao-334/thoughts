const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();
const conn = require('./db/conn.js');
const thoughtsRoutes = require('./routes/thoughtsRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

const Thoughts = require('./models/Thoughts.js');
const User = require('./models/User.js');
const ThoughtController = require('./controllers/ThoughtsController.js');

app.engine('handlebars', exphbs.engine());
app.set('view engine','handlebars');

//recebendo resposta do body
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

//session middleware

app.use(session({
    name:'session',
    secret:'Toughts_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: () => {},
        path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true
    }
}))

// flash message

app.use(flash()); 

// public path

app.use(express.static('public'));

// set sessions to res

app.use((req,res,next) => {
    // console.log(req.session.userid)
    if (req.session.userid) {
        res.locals.session = req.session;
    }

    next();
})

//Routes

app.use('/thoughts', thoughtsRoutes)
app.use('/', authRoutes);

app.get('/', ThoughtController.showAll);

conn
    .sync()
    .then(() => {
    app.listen(8080)
    })
    .catch(error => console.log(error))