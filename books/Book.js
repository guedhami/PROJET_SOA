const mongoose = require('mongoose');

mongoose.model("Book",{
    title:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    pages:{
        type: Number,
        require: false
    },
    category:{
        type: String,
        require: true
    },
    available:{
        type: Boolean,
        require: true
    }
})