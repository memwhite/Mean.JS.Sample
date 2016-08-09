'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Product name',
    trim: true
  },
  upcCode: {
    type: String,
    default: '',
    required: 'Please fill in Product UPC Code',
    trim: true
  },
  productDesc: {
    type: String,
    default: '',
    required: 'Please enter a descriptiong of the product',
    trim: true
  },
  price: {
    type: String,
    default: '',
    required: 'Please enter product price',
    trim: true
  },
  cost: {
    type: String,
    default: '',
    required: 'Please enter product cost',
    trim: true
  },
  department: {
    type: String,
    default: '',
    required: 'Please enter product department',
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

mongoose.model('Product', ProductSchema);
