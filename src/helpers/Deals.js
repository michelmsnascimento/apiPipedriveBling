const mongoose = require('mongoose');
const Dealdb = mongoose.model('Deal');

class Deals{
    constructor(title, value, status, won_time, integration){
        this.title = title,
        this.value = value,
        this.status = status
        this.won_time = won_time
        this.integration = integration
    }

    async create(data){
        return await Dealdb.create(data);
    }

    async getByid(id){
        try {
            return await Dealdb.findOne({_id: id});           
        } catch (error) {
            return undefined;
        }
    }

    async update(id, title, value, status, won_time, integration){
        let deal = await this.getByid(id);

        deal.title = title,
        deal.value = value,
        deal.status = status,
        deal.won_time = won_time,
        deal.integration = integration

        await deal.save(deal);       

    }


};

module.exports = Deals;