const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');
const { NotFoundParser } = require('./middlewares/not-found.middleware');
const { ErrorParser } = require('./middlewares/error.middleware');
const routes = require('./routes/index');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { swaggerDefinition } = require('./helpers/swager.helper');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.APP_PORT || 3000;
const app = express();

app.use(cors());
app.use(helmet());

app.all('*', (req, _res, next) => {
	req.meta = {
		ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
		requestId: uuidv4(),
		userAgent: req.headers['user-agent'],
		origin: req.headers.origin,
	};

	return next();
});

app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api', routes);

const swaggerOptions = {
	swaggerDefinition,
	apis: ['./src/routes/v1/*.js'],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(ErrorParser);
app.use(NotFoundParser);

(async () => {
	try {
		if (require.main === module) {
			app.listen(port, async () => {
				console.log(`Server is running at http://localhost:${port}`);
			});
		}
	} catch (error) {
		console.error('Error initializing server:', error);
		process.exit(1);
	}
})();

module.exports = app;
