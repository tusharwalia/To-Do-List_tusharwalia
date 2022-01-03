const mongoose = require('mongoose');


//creating a Schema for a task and adding the required fields 
const taskSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required:true
    },

    date: {
        type:Date,
        required:true
    }

})


const Task = mongoose.model('Task', taskSchema);


//exporting the schema
module.exports = Task;