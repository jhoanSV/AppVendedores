import { Router } from 'express';
import { getTasks, ValidarDatos, BuscarClientesTodos, aTablas, consecutivos, DatosProgreso, PedidosEnviados, DetalleDelPedidoVendedor, PedidosCerrados, PedidosPorEntregar, DetallePedidoEntregas, ActualizarProcesoDelPedido, DetallePedidoCerrado } from '../controllers/tasks';


const router = Router();

/**
 * @swagger
 * tags:
 *  name: products
 *  description: products endpoints
 */

/**
 * @swagger
 * /tasks:
 * get:
 *  summary: Get all products
 *  tags: [products]
 */
router.get('/tasks', getTasks)

/**
 * @swagger
 * /tasks/count:
 *  get:
 *  summary: count all the products
 *  tags: [products]
 */
/*router.get('/tasks/search/:cod', searchTasks)*/

/**
 * @swagger
 * /tasks/:cod:
 *  get:
 *  summary: Get a product by cod
 *  tags: [products]
 */
/*router.get('/tasks/:cod', getTask)*/

/**
 * @swagger
 * /tasks:
 *  get:
 *  summary: save a new product
 *  tags: [products]
 */
/*router.get('/tasks/clientes/:cod', clientes)*/

router.post('/tasks/validar', ValidarDatos)

router.get('/tasks/BuscarClientesTodos/:cod', BuscarClientesTodos)

router.post('/tasks/aTablas', aTablas)

router.post('/tasks/con', consecutivos)

router.get('/tasks/DatosProgreso/:cod', DatosProgreso)

router.get('/tasks/PedidosEnviados/:cod', PedidosEnviados)

router.get('/tasks/DetallePedidoVendedor/:cod', DetalleDelPedidoVendedor)

router.get('/tasks/PedidosCerrados/:cod', PedidosCerrados)

router.get('/tasks/PedidosPorEntregar/:cod', PedidosPorEntregar)

router.get('/tasks/DetallePedidoEntregas/:cod', DetallePedidoEntregas)

router.post('/tasks/ActualizarProcesoDelPedido', ActualizarProcesoDelPedido)

router.get('/tasks/DetallePedidoCerrado/:cod', DetallePedidoCerrado)

export default router
