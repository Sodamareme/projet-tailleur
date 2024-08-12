import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition:{
        openapi: '3.0.0',
   
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation de l\'API de mon projet Express',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}/api`,
                description: 'Serveur local',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Optionnel, mais vous pouvez préciser que c'est un JWT
                },
            },
        },
        security: [
            {
                bearerAuth: [], // Applique la sécurité à toutes les routes par défaut
            },
        ],
    },
    apis: ['./route/*.js'], // Chemin vers les fichiers où swagger-jsdoc va lire les commentaires
    
};


const swaggerSpec = swaggerJsdoc(options);
const swaggerdocs=(app, port)=>{
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

export default swaggerdocs;
