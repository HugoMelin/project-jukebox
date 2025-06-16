import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Vinyls',
    version: '1.0.0',
    description: 'Documentation Swagger auto-générée pour l\'API Vinyls',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Serveur local',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['server/api/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
