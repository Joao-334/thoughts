const { DataTypes } = require('sequelize');

const db = require('../db/conn.js');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    pass: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    }
})

module.exports = User;