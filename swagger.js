import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Beyond Fashion API',
    version: '1.0.0',
    description: 'Documentation de l\'API pour Beyond Fashion',
  },
  servers: [
    {
      url: 'http://www.beyond-fashion.com:{port}{uri}',
      description: 'Serveur de développement',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./route/*.js'], // Chemin vers les fichiers contenant les annotations
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
