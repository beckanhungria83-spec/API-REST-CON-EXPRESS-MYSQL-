const express = require("express");
const cors = require("cors");
let mysql = require("mysql2");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

let conectar = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: '',
    database: "Productos", 
    port: 3306
});

conectar.connect((error) => {
    if(error){
        console.log("error conexion bd:", error.message);
    }
    else{
        console.log("conexion realizada bd");
    }
});

app.get("/prueba", (req, res) => {
    res.json({"mensaje": "este mensaje es de prueba para hacer este ejercicio"});
});

app.post("/productos", (req, res) => {
    const { nombre, categoria, precio, cantidad_disponible } = req.body;
    
    conectar.query(
        "INSERT INTO producto (nombre, categoria, precio, cantidad_disponible) VALUES (?, ?, ?, ?)", 
        [nombre, categoria, precio, cantidad_disponible], 
        (error) => {
            if(error){
                console.log(error);
                return res.json({"mensaje": "error al registrar el producto"});
            }
            else{
                return res.json({"mensaje": "producto registrado correctamente"});
            }
        }
    );
});

app.get("/productos", (req, res) => {
    // También cambiado a 'producto' en singular
    conectar.query("SELECT * FROM producto", (error, resultado) => {
        if(error){
            return res.json({"mensaje": "error al traer datos del producto"});
        }
        else{
            return res.json(resultado);
        }
    });
});

app.listen(PORT, () => {
    console.log("sevidor en ejecucion de productos" + PORT);
});