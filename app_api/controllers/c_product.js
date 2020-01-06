var sendJsonResponse = function(res, status, content){
    res.status(status)
    res.json(content)
}

module.exports.productCreate = function(req, res){
    sendJsonResponse(res, 200, {"status" : "success"})
}

module.exports.productReadOne = function(req, res){
    sendJsonResponse(res, 200, {"status" : "success"})
}

module.exports.productUpdateOne = function(req, res){
    sendJsonResponse(res, 200, {"status" : "success"})
}

module.exports.productDeleteOne = function(req, res){
    sendJsonResponse(res, 200, {"status" : "success"})
}