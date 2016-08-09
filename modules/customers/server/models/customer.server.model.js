'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
  firstName: {
    type: String,
    default: '',
    required: 'Please fill Customer first name',
    trim: true
  },
  lastName: {
    type: String,
    default: '',
    required: 'Please fill Customer last first name',
    trim: true
  },
  address: {
    type: String,
    default: '',
    trim: true
  },
  phoneNum: {
    type: String,
    default: '',
    trim: true
  },
  email: {
    type: String,
    default: '',
    required: 'Pleaes fill in Customer email',
    trim: true
  },
  dob: {
    type: Date,
    default: '',
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

mongoose.model('Customer', CustomerSchema);
