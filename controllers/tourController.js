const fs= require('fs')
const Tour = require('./../models/tourModel')

exports.getAllTours = async (req,res)=>{
    try{
        const tours = await Tour.find()
        res.status(200).json({
            status: 'success',
            data: {
                tours
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getTour = async (req,res) => {
    try{
        const tour = await Tour.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: {
                tours: tour
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createTour = async (req,res) =>{
    try{
        const newTour= await Tour.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.updateTour = async (req,res)=>{
    try{
        const tour= await Tour.findByIdAndUpdate(req.params.id,req.body, {
            new: true,
            runValidators: true
        });
        console.log(tour)
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteTour =async (req,res) => {
    try{
        const tours= await Tour.findByIdAndDelete(req.param.id)
        res.status(204).json({
            status: 'success',
            data: {
                tour: tours
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
