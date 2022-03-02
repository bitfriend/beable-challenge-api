const Hapi = require("@hapi/hapi");
const MySQL = require("mysql");

console.log(`Running on ${process.env.NODE_ENV} mode...`);

const server = Hapi.server({
  host: process.env.HOST,
  port: process.env.PORT,
  routes: {
    cors: {
      origin: [process.env.ORIGIN_ALLOWED] // an array of origins or "ignore"
    }
  },
  router: {
    stripTrailingSlash: true
  }
});

// change api endpoint as following:
// http://localhost:5050/api/v1/users
server.realm.modifiers.route.prefix = "/api/v1";

async function init() {
  await server.register({
    plugin: require("hapi-plugin-mysql"),
    options: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    }
  });
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

const execQuery = (db, sql) => new Promise((resolve, reject) => {
  db.query(sql, function (err, results, fields) {
    if (err) {
      reject(err);
      return;
    }
    resolve(results);
  });
})

module.exports = {
  server,
  init,
  execQuery
};
