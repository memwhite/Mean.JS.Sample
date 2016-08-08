'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Description = mongoose.model('Description'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Description
 */
exports.create = function(req, res) {
  var description = new Description(req.body);
  description.user = req.user;

  description.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(description);
    }
  });
};

/**
 * Show the current Description
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var description = req.description ? req.description.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  description.isCurrentUserOwner = req.user && description.user && description.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(description);
};

/**
 * Update a Description
 */
exports.update = function(req, res) {
  var description = req.description ;

  description = _.extend(description , req.body);

  description.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(description);
    }
  });
};

/**
 * Delete an Description
 */
exports.delete = function(req, res) {
  var description = req.description ;

  description.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(description);
    }
  });
};

/**
 * List of Descriptions
 */
exports.list = function(req, res) { 
  Description.find().sort('-created').populate('user', 'displayName').exec(function(err, descriptions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(descriptions);
    }
  });
};

/**
 * Description middleware
 */
exports.descriptionByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Description is invalid'
    });
  }

  Description.findById(id).populate('user', 'displayName').exec(function (err, description) {
    if (err) {
      return next(err);
    } else if (!description) {
      return res.status(404).send({
        message: 'No Description with that identifier has been found'
      });
    }
    req.description = description;
    next();
  });
};
