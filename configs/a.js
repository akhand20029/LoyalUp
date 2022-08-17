const  mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb+srv://Akhand:Akhand@95@cluster0.wcm7p.mongodb.net/?retryWrites=true&w=majority')
.then(result => {
    console.log('connected');
})
.catch(err => {
    console.log(err);
});