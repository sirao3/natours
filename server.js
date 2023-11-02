const mongoose =require ('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({path: './config.env'})

const DB = process.env.DATABASE.replace('PASSWORD', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB,{
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(con=>{
        //console.log("Success");
    })

// const testTour = new Tour({
//     name:'The forest hiker',
//     rating : 4.7,
//     price: 1000
// });

// testTour.save().then(doc => {
//     //console.log(doc);
// }).catch(err => {
//     console.log('ERROR', err)
// })

const port =process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});
