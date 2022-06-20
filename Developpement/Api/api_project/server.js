const
  express = require('express'),
  cors = require('cors');


const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'ATLAS',
      version: '1.0.0',
      description:
        'Api développée pour le projet Acrobatt de fin de Licence Pro.',
      contact: {
        name: 'Visitez notre application',
        url: 'https://google.com',
      },
    },
    externalDocs: {
      description: "Deveci Serkan, Flejou Baptiste, Gallier Benjamin, Granpré Philippe, Mazzarella Enzo, Riehl Vivien",
      url: "https://google.com"
    },
    servers: [
      {
        //url: 'http://cdad181.iutrs.unistra.fr:4200',
        url: 'http://localhost:4200',
        description: 'Serveur de Production',

      },
    ],
    tags: [
      {
        name: 'User',
        description: 'Route concernant les utilisateurs',
      },
      {
        name: 'Document',
        description: 'Route concernant les documents (image et pdf)',
      },
      {
        name: 'JournalEntry',
        description: 'Route concernant les entrées du journal d\'un voyage',
      },
      {
        name: 'Label',
        description: 'Route concernant les labels pour les tâches',
      },
      {
        name: 'Member',
        description: 'Route concernant les membres du voyage',
      },
      {
        name: 'Point',
        description: 'Route concernant les Points d\'intérêts',
      },
      {
        name: 'Route',
        description: 'Route concernant les routes (chemin) d\'un voyage',
      },
      {
        name: 'Step',
        description: 'Route concernant les Points d\'étapes',
      },
      {
        name: 'Task',
        description: 'Route concernant les tâches',
      },
      {
        name: 'Travel',
        description: 'Route concernant les Voyages',
      }
    ],
    components: {
      securitySchemes: {
        // Bearer: {
        //   type: "http",
        //   scheme: "bearer",
        //   description: "Le token est obligatoire pour les requêtes lorsque vous êtes connecté"
        // }
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: "Le token est obligatoire pour les requêtes lorsque vous êtes connecté"
        }
      },
      responses: {
        UnauthorizedError: {
          description: "Token manquant ou invalide"
        }

      }

    },
    security: [{
      Bearer: []
    }
    ]
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
const swaggerUI = require('swagger-ui-express');
const db = require('./models');


const app = express();
app.use(express.json());
app.use(cors());
app.use('/atlas-documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs))



// register routes
require('./routes')(app);



// register error handling middleware
app.use(function (err, req, res, next) {
  if (err.status === undefined) {
    return res.status(500).send(err.message);
  } else {
    return res.status(err.status).send(err.message);
  }
});

// launch server
const server = app.listen(4200, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});