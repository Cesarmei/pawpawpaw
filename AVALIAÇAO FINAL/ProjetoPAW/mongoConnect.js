const client = require('mongoose');

class mongoConnection {
    constructor(dbName, collectionName) {
        this.dbName = dbName;
        client.connect(`mongodb://localhost:27017/paw_tp${this.dbName}`);
        client.Promise = global.Promise; 
        this.db=client.connection;
        this.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }

    static connect(Schema, collectionName){   
           return client.model(collectionName,Schema); 
    }

    disconnect(){
        client.disconnect();
    }

    close(){
        client.connection.close();
    }
}

module.exports = {
    mongoManager: mongoManager
};
