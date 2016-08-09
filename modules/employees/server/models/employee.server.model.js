'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
  firstName: {
    type: String,
    default: '',
    required: 'Please fill Employee first name',
    trim: true
  },
  lastName: {
    type: String,
    default: '',
    required: 'Please fill Employee last first name',
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
  hireDate: {
    type: String,
    default: '',
    required: 'Please fill Employee hire date',
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

mongoose.model('Employee', EmployeeSchema);
