import { Router } from 'express';
import { getTasks, searchTasks, getTask, clientes, ValidarDatos, BuscarClientes, BuscarClientesTodos, updateTasks, aTablas, consecutivos, consecutivoPrefactura } from '../controllers/tasks';


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
router.get('/tasks/search/:cod', searchTasks)

/**
 * @swagger
 * /tasks/:cod:
 *  get:
 *  summary: Get a product by cod
 *  tags: [products]
 */
router.get('/tasks/:cod', getTask)

/**
 * @swagger
 * /tasks:
 *  get:
 *  summary: save a new product
 *  tags: [products]
 */
router.get('/tasks/clientes/:cod', clientes)

router.post('/tasks/validar', ValidarDatos)

router.post('/tasks/BuscarClientes', BuscarClientes)

router.get('/tasks/BuscarClientesTodos/:cod', BuscarClientesTodos)

router.post('/tasks/aTablas', aTablas)

router.post('/tasks/con', consecutivos)

router.post('/tasks/consecutivoPrefactura/:con', consecutivoPrefactura)


export default router
