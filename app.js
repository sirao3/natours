const express = require('express');
const fs= require('fs')

const app = express();
app.use(express.json());

// app.get('/', (req,res)=>{
//     res.status(200).json( { message:'Hello from server', app:'natours' } );
// })

// app.post('/', (req,res)=>{
//     res.send('You can send this');
// })
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req,res)=>{
res.status(200).json({
    status: 'success',
    results: tours.length,
    data:{
        tours
    }
});
})

app.get('/api/v1/tours/:id', (req,res) => {
    console.log(req.params)
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)
    
    //if(id>tours.length){
    if(!tour){
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        });
    }
    
    res.status(200).json({
        status: 'success',
        data:{
            tour
        }
    });
})

app.post('/api/v1/tours', (req,res) =>{
    console.log(req.body);

    const newId = tours[tours.length -1].id +1;
    const newTour = Object.assign({id:newId}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
});

app.patch('/api/v1/tours/:id', (req,res)=>{
    const id = req.params.id * 1;
    const tour = tours.find(tour => tour.id === id);
 
    if (!tour) {
        return res.status(404).send({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    for (const [key, value] of Object.entries(req.body)) {
        console.log(key, value);
        tours[id][key] = value;
      }
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
        res.status(201).json({
            status: 'success',
            data: {
                tour :tours[id]
            }
        })
    })
})

app.delete('/api/v1/tours/:id', (req,res) => {
    console.log(req.params)
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)
    
    //if(id>tours.length){
    if(!tour){
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        });
    }
    const updatedTours = tours.filter(t => t.id !== tour.id);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(updatedTours), err=>{
        res.status(200).json({
            status: 'success',
            data:null
        });
    })
})

const port =3000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
})