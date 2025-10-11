const db = require("../models");

const Gimnasio = db.gimnasios;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validar que venga al menos el Nombre
    if (!req.body.nombre) {
        return res.status(400).send({ message: "El nombre no puede estar vacío" });
    }

    const gimnasio = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
     bono: req.body.bono
    };

    Gimnasio.create(gimnasio)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: "Error en la base de datos" }));
}



exports.findAll = (req, res) => {
    Gimnasio.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener los usuarios."
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Gimnasio.findByPk(id)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: "Usuario no encontrado" });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al obtener el usuario" });
        });
}


exports.update = (req, res) => {
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Gimnasio.destroy({ where: { id: id } })
        .then(num => {
            if (num === 1) {
                res.send({ message: "Usuario eliminado correctamente" });
            } else {
                res.status(404).send({ message: `No se encontró el usuario con id=${id}` });
            }
        })
        .catch(err => {
            console.error("Error al eliminar usuario:", err);
            res.status(500).send({ message: "Error en la base de datos" });
        });
};
