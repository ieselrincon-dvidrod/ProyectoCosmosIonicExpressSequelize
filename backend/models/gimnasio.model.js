module.exports = (sequelize, Sequelize) => {
    const Gimnasio = sequelize.define("gimnasios", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellidos: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        },
        bono: {
            type: Sequelize.STRING
        }

    });

    return Gimnasio;
};
