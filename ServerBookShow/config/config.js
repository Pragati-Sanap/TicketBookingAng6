var config={
    port:8086,
    
    //database credentials
    
    mongo:{
        hostname: 'localhost',
        port: '27017',
        db: 'booking'
    }
};
config.mongo.url= 'mongodb://'+config.mongo.hostname+':'+config.mongo.port+'/'+config.mongo.db;

module.exports=config;