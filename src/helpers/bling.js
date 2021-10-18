const axios = require('axios');
const { cnpj } = require('cpf-cnpj-validator');
const Parser = require('xml2js');
require('dotenv').config();
const Deals = require('./Deals')
const dealsObj = new Deals();

    module.exports = {
        async sendBling(data) {
            try {
            let xmlobj;
            let response = [];
            for (const item of data) {  
                     
                }
                await dealsObj.update(item._id, item.title, item.value, item.status, item.won_time, 'integrated')
                let builder = new Parser.Builder();
                let xmldata = builder.buildObject(xmlobj);
                let xmlEncodeURI = encodeURI(xmldata);
                const res = await axios.post(process.env.URL_BLING + `?apikey=${process.env.TOKEN_BLING}&xml=${xmlEncodeURI}`);
                response.push(res.data)              
            };
            return response
            } catch (e) {
               return e 
            };        
        },
    };
