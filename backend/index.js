const cors = require('cors');
const express = require('express');
const app = express();

var corsOptions = {
  origin: "http://localhost:8100",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
//db.sequelize.sync()
 // .then(() => {
  //  console.log("Base de datos sincronizada");

  db.sequelize.sync({force: true}).then(() => {
    console.log("Borra y resincroniza la db");
  
  });

app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la aplicación de Cosmos Fitness." });
});

require("./routes/gimnasio.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
