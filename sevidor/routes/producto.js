const express = require('express');
const router = express.Router();
const productoControler = require('../controllers/productoControlers');

//rutas para producto
router.post('/', productoControler.crearProducto);
router.get('/',  productoControler.obtenerProductos);
router.put('/:id',  productoControler.actualizarProducto);
router.get('/:id',  productoControler.obtenerProducto);
router.delete('/:id',  productoControler.eliminarProducto);


module.exports = router;