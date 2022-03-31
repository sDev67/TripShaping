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
      'Api développé pour le projet Acrobatt.',
    contact: {
      name: 'Visitez notre application',
      url: 'https://google.com',
    },
  },
  externalDocs :{
    description: "Deveci Serkan, Flejou Baptiste, Gallier Benjamin, Granpre Philippe, Mazzarella Enzo, Riehl Vivien",
    url:"https://google.com"
  },
  servers: [
    {
      url: 'http://localhost:4200',
      description: 'Serveur de Prod',
    },
  ],
  tags: [
    {
      name: 'Point',
      description: 'Route concernant les Points d\'intérêts',
    },
    {
      name: 'Step',
      description: 'Route concernant les Points d\'étapes',
    },
    {
      name: 'Travel',
      description: 'Route concernant les Voyages',
    },
  ],
},
apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
const swaggerUI = require('swagger-ui-express');


const app = express();
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

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