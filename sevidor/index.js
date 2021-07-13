const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//creamos el servidor
const app = express();

// conectamos a la db
conectarDB();

//habilitar cors

app.use(cors());

//abilitar json
app.use(express.json());

//router
app.use('/api/productos', require('./routes/producto'));

// definimos ruta principal
/* app.get('/',(req,res)=>{
    res.send('hola mundo');

}) */

app.listen(3200, ()=>{
    console.log(' el servidor esta corriendo perfectamente ahora');
})