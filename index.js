//requiring the library
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
const port = 8000;

const app = express();

//requiring mongoose file
const db = require('./config/mongoose');
//requiring task schema
const Task = require('./models/description');

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
//setup for static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}))


//var descriptionArray = [];


//rendering webpage with newly added task
app.get('/', function(req, res) {

Task.find({},function(err,description2){
    if(err){
        console.log("error in fetching the task");
        return;
    }

    res.render("todo", {
        newDescription: description2,
        title: "TODO List"
    });

})

})


//creating a new task using the input given by the user
app.post('/', function(req, res) {

    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
        
    
    }, function(err, newTask) {
        if (err) {
            console.log('error in creating a description');

        } else {

            console.log('*******', newTask);
            return res.redirect("back");
        }
    });

});

//deleting tasks by collecting the id's of the checked boxes
app.post('/delete-task/', function(req, res)
{
    console.log(req.body)

    Object.keys(req.body).forEach(function(key) {
        Task.findByIdAndDelete(key, function(err){
            if(err){
                console.log('Error in deleting an object from database');
                return res.redirect('back');;
            }
        });
    });
    return res.redirect('back');



})


//listening on the given port address
    app.listen(8000, function(err) 
    {
        if (err) {
            console.log("Error in running the server", err);
        }
        console.log('Yup!My Server is running on port : ', port);
    })

