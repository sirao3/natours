const fs= require('fs')
const morgan = require('morgan')

const express = require('express');
const app = express();

// MIDDLEWARE

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) =>{
    console.log('Hello from middleware');
    next();
})

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//HANDLERS

const getAllTours = (req,res)=>{
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data:{
            tours
        }
    });
}

const getTour = (req,res) => {
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
}

const createTour = (req,res) =>{
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
}

const updateTour =(req,res)=>{
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
}

const deleteTour =(req,res) => {
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
}

const getAllUsers = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const getUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const createUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const updateUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const deleteUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

// ROUTES 

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour );
// app.delete('/api/v1/tours/:id', deleteTour);

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter)

//START SERVER
const port =3000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});