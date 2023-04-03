"use strict";
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        userID: {
            field: "userID",
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            field: "firstName",
            type: DataTypes.STRING,
        },
        lastName: {
            field: "lastName",
            type: DataTypes.STRING,
        },
        username: {
            field: "username",
            type: DataTypes.STRING,
        },
        email: {
            field: "email",
            type: DataTypes.STRING,
        },
        password: {
            field: "password",
            type: DataTypes.STRING,
        },
        salt: {
            field: "salt",
            type: DataTypes.STRING,
        },
    });

    return Users;
};