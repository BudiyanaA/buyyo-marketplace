var mongoose = require('mongoose')
var Merchant = mongoose.model('Merchant')

var sendJsonResponse = function(res, status, content){
    res.status(status)
    res.json(content)
}

var doAddProduct = function(req, res, data){
    if (!data){
        sendJsonResponse(res, 404, {
            "message": "merchantId not found"
        })
    } else{
        data.products.push({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock
        })
        data.save(function(err, data){
            var thisProduct
            if (err){
                sendJsonResponse(res, 400, err)
            } else{
                thisProduct = data.products[data.products.length - 1]
                sendJsonResponse(res, 201, thisProduct)
            }
        })
    }
}

module.exports.productCreate = function(req, res){
    var merchantId = req.params.merchantId
    if (merchantId){
        Merchant
            .findById(merchantId)
            .exec(function(err, data){
                if (err){
                    sendJsonResponse(res, 400, err)
                } else{
                    doAddProduct(req, res, data)
                }
            })
    } else{
        sendJsonResponse(res, 404, {
            "message": "Not found, merchantId required"
        })
    }
}

module.exports.productReadOne = function(req, res){
    if (req.params && req.params.merchantId && req.params.productId){
        Merchant
            .findById(req.params.merchantId)
            .exec(function(err, data){
                    var response, product
                    if (!data){
                        sendJsonResponse(res, 404, {
                            "message": "merchantId not found"
                        })
                        return
                    } else if(err){
                        sendJsonResponse(res, 400, err)
                        return
                    }

                    if (data.products && data.products.length > 0){
                        product = data.products.id(req.params.productId)
                        if (!product){
                            sendJsonResponse(res, 404, {
                                "message": "productId ot found"
                            })
                        } else{
                            response = {
                                data : {
                                    name: data.name,
                                    id: req.params.merchantId
                                },
                                product: product
                            }
                            sendJsonResponse(res, 200, response)
                        }
                    } else{
                        sendJsonResponse(res, 404, {
                            "message": "No products found"
                        })
                    }
            })
    } else{
        sendJsonResponse(res, 404, {
            "message": "Not found, merchantId and productId are both required"
        })
    }
}

module.exports.productUpdateOne = function(req, res){
    if (!req.params.merchantId || !req.params.productId){
        sendJsonResponse(res, 404, {
            "message": "Not found, merchantId and productId are both required"
        })
        return
    }
    Merchant
        .findById(req.params.merchantId)
        .exec(function(err, data){
            var thisProduct
            if (!data){
                sendJsonResponse(res, 404, {
                    "message": "merchantId not found"
                })
                return
            } else if (err){
                sendJsonResponse(res, 400, err)
                return
            }
            if (data.products && data.products.length > 0){
                thisProduct = data.products.id(req.params.productId)
                if (!thisProduct){
                    sendJsonResponse(res, 404, {
                        "message": "ProductId not found"
                    })
                } else {
                    thisProduct.name = req.body.name
                    thisProduct.price = req.body.price
                    thisProduct.stock = req.body.stock
                    data.save(function(err, data){
                        if (err){
                            sendJsonResponse(res, 404, err)
                        } else {
                            sendJsonResponse(res, 200, thisProduct)
                        }
                    })
                }
            } else{
                sendJsonResponse(res, 404, {
                    "message": "No product to update"
                })
            }
        })
}

module.exports.productDeleteOne = function(req, res){
    if (!req.params.merchantId || !req.params.productId){
        sendJsonResponse(res, 404, {
            "message": "Not found, merchantId and productId are both required"
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
            if (data.products && data.products.length > 0){
                if (!data.products.id(req.params.productId)){
                    sendJsonResponse(res, 404, {
                        "message": "productId not found"
                    })
                } else{
                    data.products.id(req.params.productId).remove()
                    data.save(function(err){
                        if (err){
                            sendJsonResponse(res, 404, err)
                        } else{
                            sendJsonResponse(res, 204, null)
                        }
                    })
                }
            } else{
                sendJsonResponse(res, 404, {
                    "message": "No product to delete"
                })
            }
        })
}