const mongoose = require('mongoose');
const uri = "mongodb+srv://newuser:123@idag.9zcbi.mongodb.net/idag?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});