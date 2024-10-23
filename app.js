var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var logger = require('morgan');
var cors = require('cors'); 
const HelperApp = require("./Models/Helper/HelperApp");

var usersRouter = require('./routes/users');
const corsOptions = {
    origin: ['https://traca.voxcity.com.br'], // Permite apenas solicitações dessa origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    optionsSuccessStatus: 200,
    credentials: true
  };
var app = express();
app.use(cors(corsOptions));

// Middleware personalizado para restringir acesso localmente
const allowedOrigins = ['https://traca.voxcity.com.br'];
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin) || !origin) {
        // Permitir solicitações da origem permitida ou solicitações sem origem (acesso local)
        next();
    } else {
        // Bloquear solicitações de outras origens
        res.status(403).send('Access denied');
    }
});

app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// Configurar rotas
app.use('/', usersRouter);


console.log(new Date(), "iniciando servidor");
// HelperApp.startBots();

module.exports = app;