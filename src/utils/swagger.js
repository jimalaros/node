const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TECH ACADEMY - Node",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:4400"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./src/routes/*.js"]
};

module.exports = swaggerOptions;