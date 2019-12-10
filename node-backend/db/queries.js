const db = require('./config');

class Query {
    constructor(table){
        this.table = table;
    }
    
    getAll() {
        return db(this.table)
            .select()
    }
    
    getOne(id){
        return db(this.table)
            .select()
            .where('id', id)
            .first()
    }

    getOneBy(options){
        const builder = db(this.table).select();
        for(const key in options){
            builder.where(key, options[key]);
        }
        return builder.first()
    }

    getAllBy(options){
        const builder = db(this.table).select();
        for(const key in options){
            builder.where(key, options[key]);
        }
        return builder;
    }

    create(entity){
        return db(this.table)
            .insert(entity, 'id')
    }
    
    update(id, entity){
        return db(this.table)
            .where('id', id)
            .update(entity, '*')
    }
    
    delete(id){
        return db(this.table)
            .select()
            .where('id', id)
            .del()
    }
}

module.exports = Query;