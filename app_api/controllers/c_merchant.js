var mongoose = require('mongoose')
var Merchant = mongoose.model('Merchant')

var sendJsonResponse = function(res, status, content){
    res.status(status)
    res.json(content)
}

module.exports.merchantList = function(req, res){
    Merchant
        .find()
        // .select('name')
        .exec(function(err, data){
            sendJsonResponse(res, 200, data)
        })
}

module.exports.merchantCreate = function(req, res){
    Merchant.create({
        username: req.body.username,
        name: req.body.name,
        category: req.body.category.split(","),
        desc: req.body.desc
    }, function(err, data){
        if (err){
            sendJsonResponse(res, 400, err)
        } else{
            sendJsonResponse(res, 201, data)
        }
    })
}

module.exports.merchantReadOne = function(req, res){
    if (req.params && req.params.merchantId){
        Merchant
        .findById(req.params.merchantId)
        .exec(function(err, data){
            if (!data){
                sendJsonResponse(res, 400, {
                    "message": "Merchant not found!"
                })
                return
            } else if (err){
                sendJsonResponse(res, 404, err)
                return
            }
            sendJsonResponse(res, 200, data)
        })
    } else{
        sendJsonResponse(res, 404, {
            "message": "No MerchantId in request"
        })
    }
}

module.exports.merchantUpdateOne = function(req, res){
    if (!req.params.merchantId){
        sendJsonResponse(res, 404, {
            "message": "Not found, merchantId is required"
        })
        return
    }
    Merchant
        .findById(req.params.merchantId)
        .exec(function(err, data){
            if (!data){
                sendJsonResponse(res, 404, {
                    "message": "merchantId not found"
                })
                return
            } else if (err){
                sendJsonResponse(res, 400, err)
                return
            }
            data.username = req.body.username
            data.name = req.body.name
            data.category = req.body.category.split(","),
            data.desc = req.body.desc
            data.save(function(err, data){
                if (err){
                    sendJsonResponse(res, 404, err)
                } else {
                    sendJsonResponse(res, 200, data)
                }
            })
        })
}

module.exports.merchantDeleteOne = function(req, res){
    var merchantId = req.params.merchantId
    if (merchantId){
        Merchant
            .findByIdAndRemove(merchantId)
            .exec(function(err, data){
                if (err){
                    sendJsonResponse(res, 404, err)
                    return
                }
                sendJsonResponse(res, 204, null)
            })
    } else {
        sendJsonResponse(res, 404, {
            "message": "No merchantId"
        })
    }
}