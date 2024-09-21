const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  invoiceNo: {
    type: String,
    require: true
  },
  containerNo: {
    type: String,
    require: true
  },
  product:{
    type: String,
    require: true
  },
  advance: {
    type: String,
    require: true
  }
});

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  records: [recordSchema]
});

module.exports = mongoose.model('Company', companySchema);
