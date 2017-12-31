'use strict'

function getProduct(req, res) {

    res.status(200).send({data:'Hola mundo'});
}

module.exports = {
    getProduct: getProduct
};