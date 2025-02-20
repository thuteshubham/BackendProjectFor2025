const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  ifsc: { type: String, required: true },
  address: { type: String, required: true },
  accountCreatedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Account', accountSchema);
