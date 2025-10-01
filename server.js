require('dotenv').config();
const app = require('./app');
const { sequelize, Role } = require('./models');

const PORT = process.env.PORT || 4000;

const start = async () => {
	try {
		await sequelize.authenticate();
		console.log('DB connected.');

		// sync all models (use migrations in prod)
		await sequelize.sync({ alter: true }); // alter: true will try to adjust table columns safely

		// seed default roles if not exist
		const defaultRoles = ['user', 'admin'];
		for (const name of defaultRoles) {
			const [r, created] = await Role.findOrCreate({ where: { name } });
			if (created) console.log('Seeded role:', name);
		}

		app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
	} catch (err) {
		console.error('Failed to start:', err);
		process.exit(1);
	}
};

start();
