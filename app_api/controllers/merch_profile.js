var mongoose = require('mongoose')
var Merchant = mongoose.model('Merchant')

module.exports.profileRead = function(req, res){

    if(!req.payload._id){
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        })
    } else{
        Merchant
        .findById(req.payload._id)
        .exec(function(err, merchant){
            res.status(200).json(merchant)
        })
    }
}