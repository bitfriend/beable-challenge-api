"use strict";

require("dotenv").config();
const MySQL = require("mysql");
const faker = require("faker");
const { execQuery } = require("../src/server");

const db = MySQL.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

async function run() {
  for (let i = 0; i < 5; i++) {
    const name = faker.name.findName();
    const scores = faker.datatype.number({ min: 5, max: 10 });
    const res = await execQuery(db, `INSERT INTO grades (name, scores) VALUES ("${name}", ${scores})`);
    console.log(res);
  }
  process.exit(1);
}

run();
