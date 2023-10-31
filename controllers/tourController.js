const fs= require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkID = (req,res,next,val)=>{
    if (req.params.id * 1 >tours.length) {
        return res.status(404).send({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};

exports.checkBody = (req,res,next)=>{
    if (!req.body.name  || !req.body.price ){
        return res.status(400).send({
            status: 'fail',
            message: 'Bad request - Missing name or price'
        });
    }
    next();
};
exports.getAllTours = (req,res)=>{
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data:{
            tours
        }
    });
}

exports.getTour = (req,res) => {
    console.log(req.params)
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)

    res.status(200).json({
        status: 'success',
        data:{
            tour
        }
    });
}

exports.createTour = (req,res) =>{
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

exports.updateTour =(req,res)=>{
    const id = req.params.id * 1;
    const tour = tours.find(tour => tour.id === id);
 
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

exports.deleteTour =(req,res) => {
    console.log(req.params)
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)

    const updatedTours = tours.filter(t => t.id !== tour.id);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(updatedTours), err=>{
        res.status(200).json({
            status: 'success',
            data:null
        });
    })
}
