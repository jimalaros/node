const express = require('express');
const Maestros = require('../controllers/maestros');

const Verificar = require('../middlewares/token')

const router = express.Router()

/**
 * @swagger
 * /maestros:
 *  get:
 *      summary: Para ver todos los maestros registrados
 *      tags: [Maestros]
 *      responses:
 *          200:
 *              description: Ok
 *          500:
 *              description: Bad Request
 */
router.get("/", Verificar, Maestros.lista)

/**
 * @swagger
 * /maestros/nuevo:
 *  post:
 *      summary: Para registrar un nuevo maestro
 *      tags: [Maestros]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      -nombre
 *                      -edad
 *                      -genero
 *                      -correo
 *                      -password
 *                    properties:
 *                      nombre:
 *                          type: string
 *                          example: "Jimmy Arango"
 *                      edad:
 *                          type: number
 *                          example: 26
 *                      genero:
 *                          type: string
 *                          example: "M"    
 *                      correo:
 *                          type: string
 *                          example: "j@gmail.com" 
 *                      password:
 *                          type: string
 *                          example: "123456"     
 *      responses:
 *          400:
 *              description: Bad Request
 *          201:
 *              description: Maestro creado con exito
 *          500:
 *              description: Internal Server Error
 */
router.post("/nuevo", Maestros.nuevo)

/**
 * @swagger
 * /maestros/login:
 *  post:
 *      summary: Para registrar un nuevo alumno
 *      tags: [Maestros]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      -correo
 *                      -password
 *                    properties:
 *                      correo:
 *                          type: string
 *                          example: "j@gmail.com"
 *                      password:
 *                          type: string
 *                          example: "M"         
 *      responses:
 *          400:
 *              description: Bad Request
 *          401:
 *              description: Unauthorized
 *          200:
 *              description: Ok
 *          500:
 *              description: Internal Server Error
 */
 router.post("/login", Maestros.inicioSesion)

/**
 * @swagger
 * /maestros/{id}:
 *  put:
 *      summary: Para actualizar un dato o los datos de un maestro registrado
 *      tags: [Maestros]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: id del maestro
 *            schema: 
 *              type: string
 *              example: "62bc788a0b718d90f48fd8ef"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *      responses:
 *          400:
 *              description: Bad Request
 *          200:
 *              description: Ok
 *          500:
 *              description: Internal Server Error
 */
router.put("/:id", Verificar, Maestros.edicion)

/**
 * @swagger
 * /maestros/{id}:
 *  delete:
 *      summary: Para eliminar un maestro de la base de datos
 *      tags: [Maestros]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: id del maestro
 *            schema: 
 *              type: string
 *              example: "62bc788a0b718d90f48fd8ef"
 *      responses:
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *          200:
 *              description: Ok
 *          500:
 *              description: Internal Server Error
 */
router.delete("/:id", Verificar, Maestros.eliminacion)

module.exports = router;