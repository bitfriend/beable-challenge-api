"use strict";

require("dotenv").config();
const Joi = require("@hapi/joi");
const Boom = require("@hapi/boom");
const { server, init, execQuery } = require("./server");

server.route({
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return "Hello, world!";
  }
});

server.route({
  method: "GET",
  path: "/grades",
  options: {
    response: {
      schema: Joi.array().items(Joi.object({
        id: Joi.number().integer().required(),
        name: Joi.string().required(),
        score: Joi.number().integer().required()
      })),
      failAction: async (request, h, err) => {
        throw Boom.badData(err.message);
      }
    }
  },
  handler: async (request, h) => {
    const res = await execQuery(request.app.db, "SELECT * FROM grades LIMIT 0, 5");
    return res;
  }
});

process.on("unhandledRejection", (e) => {
  console.log(e);
  process.exit(1);
});

init();
