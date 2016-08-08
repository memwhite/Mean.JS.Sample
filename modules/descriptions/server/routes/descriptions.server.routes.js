'use strict';

/**
 * Module dependencies
 */
var descriptionsPolicy = require('../policies/descriptions.server.policy'),
  descriptions = require('../controllers/descriptions.server.controller');

module.exports = function(app) {
  // Descriptions Routes
  app.route('/api/descriptions').all(descriptionsPolicy.isAllowed)
    .get(descriptions.list)
    .post(descriptions.create);

  app.route('/api/descriptions/:descriptionId').all(descriptionsPolicy.isAllowed)
    .get(descriptions.read)
    .put(descriptions.update)
    .delete(descriptions.delete);

  // Finish by binding the Description middleware
  app.param('descriptionId', descriptions.descriptionByID);
};
