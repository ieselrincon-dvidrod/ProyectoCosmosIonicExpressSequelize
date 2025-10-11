module.exports = app => {
    const gimnasios = require("../controllers/gimnasio.controller.js");
    const router = require("express").Router();

    router.post("/", gimnasios.create);
    router.get("/", gimnasios.findAll);
    router.get("/:id", gimnasios.findOne);
    router.put("/:id", gimnasios.update);
    router.delete("/:id", gimnasios.delete);

    // Registrar rutas en la app con prefijo /api/gimnasios
    app.use('/api/gimnasios', router);
};
