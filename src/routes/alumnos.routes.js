'use strict'
const express = require('express');

const Alumnos = require('../controllers/alumnos');

const router = express.Router()

/**
 * @swagger
 * /alumnos:
 *  get:
 *      summary: Para ver todos los Alumnos registrados
 *      tags: [Alumnos]
 *      responses:
 *          200:
 *              description: Ok
 *          500:
 *              description: Bad Request
 */
router.get("/", Alumnos.lista)

/**
 * @swagger
 * /alumnos/nuevo:
 *  post:
 *      summary: Para registrar un nuevo alumno
 *      tags: [Alumnos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      -n_cuenta
 *                      -nombre
 *                      -edad
 *                      -genero
 *                      -correo
 *                      -password
 *                    properties:
 *                      n_cuenta:
 *                          type: number
 *                          example: 1
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
 *              description: Alumno creado con exito
 *          500:
 *              description: Internal Server Error
 */
router.post("/nuevo", Alumnos.nuevo)

/**
 * @swagger
 * /alumnos/login:
 *  post:
 *      summary: Para registrar un nuevo alumno
 *      tags: [Alumnos]
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
 *                          example: "Jimmy Arango"
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
router.post("/login", Alumnos.inicioSesion)

/**
 * @swagger
 * /alumnos/{id}:
 *  put:
 *      summary: Para actualizar un dato o los datos de un alumno registrado
 *      tags: [Alumnos]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: id del alumno
 *            schema: 
 *              type: string
 *              example: "62bc788a0b718d90f48fd8ef"
 *      responses:
 *          400:
 *              description: Bad Request
 *          200:
 *              description: Ok
 *          500:
 *              description: Internal Server Error
 */
router.put("/:id", Alumnos.edicion)

/**
 * @swagger
 * /alumnos/{id}:
 *  delete:
 *      summary: Para eliminar un alumno de la base de datos
 *      tags: [Alumnos]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: id del alumno
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
router.delete("/:id", Alumnos.eliminacion)

module.exports = router;