const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = mongoose.Schema({
    name:{
        type: String,
        
    },
    note:[{
        title:{
            type: String,
        
        },
        content:{
            type: String,
           
        }
    }]
    
})


const Note = mongoose.model('Note', noteSchema);

module.exports =  Note 