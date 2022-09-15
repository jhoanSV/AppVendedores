import { Router } from 'express';
import { getTasks, searchTasks, getTask, saveTasks, deleteTasks, updateTasks } from '../controllers/tasks';

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
 *  post:
 *  summary: save a new product
 *  tags: [products]
 */
router.post('/tasks', saveTasks)


export default router
