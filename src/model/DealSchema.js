const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DealSchema = new Schema({

  title: {
    type: String,
    required: true,
    index: true
  },
  value: {
    type: String, 
    required: true 
  },
  status: {
    type: String, 
    required: true
  },
  won_time: {
    type: Date, 
    required: true
  },
  integration: {
    type: String, 
    required: false
  },
     
});

mongoose.model('Deal', DealSchema);