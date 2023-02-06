const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('toughts','root','3344123ss', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('Autenticação concluida!')
}

catch (error) {
    console.log(error)
}

module.exports = sequelize;