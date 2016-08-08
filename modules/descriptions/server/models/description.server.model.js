'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Description Schema
 */
var DescriptionSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Description name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Description', DescriptionSchema);
