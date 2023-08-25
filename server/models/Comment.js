const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = mongoose.Schema({

    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
 
}, {timestamps:true})


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }