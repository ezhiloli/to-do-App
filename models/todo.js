const mongoose = require('mongoose');

// Create the DB Structure/Schema
const taskSchema = new mongoose.Schema({
    tname:{
        type:String,
        require:true
    },
    tcategory:{
        type:String,
        require:true
    },
    tdate:{
        type:String,
        require:true
    }
})

const TodoApp = mongoose.model('todo',taskSchema);

// Export the Schema
module.exports = TodoApp;