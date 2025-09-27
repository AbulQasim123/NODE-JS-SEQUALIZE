# We are going to write about NodeJs Sequelize

This single-file **complete step-by-step guide** shows how to set up Node.js with Sequelize and `sequelize-cli`, and covers *everything* from project creation to migrations, models, seeders, running/reverting migrations, and deployment tips.

> This guide assumes you have Node.js and npm installed. Replace `mysql`/`postgres` examples with your chosen dialect and driver.

---

**Prerequisites**

* Node.js (v14+ recommended)
* npm (or yarn)
* A relational database (MySQL / PostgreSQL / SQLite)

**Quick summary of the main `sequelize-cli` commands you will use**

```bash
# initialize project structure
npx sequelize-cli init

# create database (uses config/development)
npx sequelize-cli db:create

# create model + migration
npx sequelize-cli model:generate --name User --attributes name:string,email:string

# run all pending migrations
npx sequelize-cli db:migrate

# undo last migration
npx sequelize-cli db:migrate:undo

# undo all migrations
npx sequelize-cli db:migrate:undo:all

# migrate up to a particular migration file
npx sequelize-cli db:migrate --to YYYYMMDDHHmmss-create-users.js

# create a seeder
npx sequelize-cli seed:generate --name demo-user

# run all seeders
npx sequelize-cli db:seed:all

# undo last seeder
npx sequelize-cli db:seed:undo

# undo all seeders
npx sequelize-cli db:seed:undo:all
```

---

**1. Project setup**

```bash
mkdir my-sequelize-project
cd my-sequelize-project
npm init -y
```

**2. Install dependencies**

* Install Sequelize and the CLI (recommended: CLI as a dev dependency)

```bash
npm install sequelize
npm install --save-dev sequelize-cli
```

* Install the DB driver you need (example):

```bash
# MySQL
npm install mysql2

# PostgreSQL
npm install pg pg-hstore

# SQLite (file-based)
npm install sqlite3
```

> Optional: you can install `sequelize-cli` globally with `npm i -g sequelize-cli`, but using `npx sequelize-cli` or local dev dependency is preferred for reproducible projects.

**3. Initialize sequelize folders and sample files**

```bash
npx sequelize-cli init
```

This creates the following structure:

```
/config/config.json  (or config.js)
/models/
/migrations/
/seeders/
```

**4. Configure your database connection**

Replace `config/config.json` or convert it to `config/config.js` to use environment variables. Example `config/config.js` using `dotenv`:

```js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || 'database_development',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || null,
    database: process.env.DB_TEST || 'database_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
};
```

Create a `.env` at project root (never commit credentials):

```
DB_USER=root
DB_PASS=password
DB_NAME=my_db
DB_HOST=127.0.0.1
DB_DIALECT=mysql
```

**5. Optional: customize paths with `.sequelizerc`**

By default `sequelize-cli` uses the folders created by `init`. If you want custom paths, create `.sequelizerc`:

```js
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.js'),
  'models-path': path.resolve('models'),
  'seeders-path': path.resolve('seeders'),
  'migrations-path': path.resolve('migrations')
};
```

**6. Create the database**

```bash
npx sequelize-cli db:create
```

This uses `development` config from `config/config.js`.

**7. Generate a model + migration**

```bash
npx sequelize-cli model:generate --name User --attributes name:string,email:string
```

This creates:

* `models/user.js` — the model skeleton
* `migrations/YYYYMMDDHHMMSS-create-user.js` — the migration file

**Note:** attribute syntax: `field:type`, commas between fields. Supported basic types: `string`, `integer`, `date`, `boolean`, `text`, etc.

**8. Example contents of generated migration**

```js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
```

**9. Run migrations**

```bash
npx sequelize-cli db:migrate
```

Check `SequelizeMeta` table to see applied migrations.

**10. Undo/rollback migrations**

* Undo last migration:

```bash
npx sequelize-cli db:migrate:undo
```

* Undo all migrations:

```bash
npx sequelize-cli db:migrate:undo:all
```

* Migrate to a particular migration (run up to a specific file):

```bash
npx sequelize-cli db:migrate --to YYYYMMDDHHMMSS-create-users.js
```

* Undo migrations until a particular migration (revert until but not including the target) — provide the migration filename with `--to`:

```bash
npx sequelize-cli db:migrate:undo --to YYYYMMDDHHMMSS-create-users.js
```

(Use the exact file name from `migrations/`.)

**11. Generate and run seeders**

* Generate seeder scaffold:

```bash
npx sequelize-cli seed:generate --name demo-user
```

* Example seeder file (`seeders/YYYYMMDDHHmmss-demo-user.js`):

```js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', { email: 'admin@example.com' }, {});
  }
};
```

* Run all seeders:

```bash
npx sequelize-cli db:seed:all
```

* Undo last seeder:

```bash
npx sequelize-cli db:seed:undo
```

* Undo all seeders:

```bash
npx sequelize-cli db:seed:undo:all
```

* Run a specific seeder:

```bash
npx sequelize-cli db:seed --seed YYYYMMDDHHmmss-demo-user.js
```

**12. Models — the model file structure**

Example `models/user.js` (generated):

```js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    // associations can be defined here
    // e.g. User.hasMany(models.Post)
  };

  return User;
};
```

**13. Associations example**

In each model's `associate` method:

```js
// models/post.js
Post.associate = function(models) {
  Post.belongsTo(models.User, { foreignKey: 'userId' });
};

// models/user.js
User.associate = function(models) {
  User.hasMany(models.Post, { foreignKey: 'userId' });
};
```

**14. Programmatic sync (not recommended for production)**

You can use `sequelize.sync()` to create tables directly from models (useful for prototyping):

```js
const { sequelize } = require('./models');

sequelize.sync({ force: false })
  .then(() => console.log('DB synced'))
  .catch(console.error);
```

**Note:** prefer migrations for production apps.

**15. Common troubleshooting**

* `Error: The dialect module is not installed`: install the correct DB driver (`mysql2` / `pg` / `sqlite3`).
* `Cannot find config`: ensure `.sequelizerc` points to the config file or pass `--config` flag.
* If `npx sequelize-cli db:create` fails in production, ensure DB credentials and privileges are correct.

**16. Deployment workflow (typical)**

1. Push code & migrations to Git (commit migrations and seeders).
2. On the server (or CI), pull latest code.
3. Install deps: `npm ci` or `npm install`.
4. Run migrations: `npx sequelize-cli db:migrate --env production`
5. Run seeders if required: `npx sequelize-cli db:seed:all --env production`

**17. Tips & best practices**

* Keep `sequelize-cli` as a dev dependency for reproducible builds.
* Never hardcode credentials in `config`; use environment variables.
* Commit migrations & seeders (they are your schema history).
* Use `db:migrate` instead of `sequelize.sync()` in production.
* Use `--to` with care when targeting specific migrations.

---
