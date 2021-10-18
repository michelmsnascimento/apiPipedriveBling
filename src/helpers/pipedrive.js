const mongoose = require('mongoose');
const Dealdb = mongoose.model('deals');
const axios = require('axios');
require('dotenv').config();
const url = process.env.URL_PIPEDRIVE + process.env.TOKEN_PIPEDRIVE;

module.exports = {
  
  async clientsWons() {
      const response = await axios.get(url);
      return response.data;
  },
  
  async filterCreate(){
    try {
      const data = await this.clientsWons();
      const response = data.data
      let sendCreate = []
      const dealsDb = await Dealdb.find();

      response.forEach(item => {
      const result = dealsDb.find( deal => deal.title === item.title )
        if(!result){
          sendCreate.push(item)
        }
      });
      return sendCreate
    } catch (error) {
      return error
    }
  },
}
