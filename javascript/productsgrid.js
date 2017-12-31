/* Module for products grid application */
var ProductsGrid = function () {
    /* add members here */
    var client = ProductsClient("http://localhost:1234");

    /* model for products */
    var productModel = function(item, itemMode) {
        this.data = {};
        this.data.id = ko.observable(item.id);
        this.data.name = ko.observable(item.name);
        this.data.description = ko.observable(item.description);
        this.data.price = ko.observable(item.price);
        this.displayMode = ko.observable(itemMode);
    };


    /* display modes for the grid */
    var displayMode = {
        view: "VIEW",
        edit: "EDIT"
    };

    /* product observable array */
    var products = ko.observableArray();

    /* method to retrieve products using the client */
    var retrieveProducts = function () {
        console.log("Retrieving products from server ...");
        client.getProducts(retrieveProductsCallback);
    };

    /* callback for when the products are retrieved from the server */
    var retrieveProductsCallback = function (data) {

        var dataSet = data.data;

        dataSet.forEach(function(item) {
            products.push(new productModel(item,displayMode.view));
        });
    };

    /* method to send delete request to the client */
    var deleteProduct = function (product) {
        client.deleteProduct(product, deleteProductCallback);
    };

    /* callback on successful delete request */
    var deleteProductCallback = function (product) {
        products.remove(product);
        console.log("Product with id [" + product.data.id()+ "] deleted");
    };

    /* method to add a blank product to the products array */
    var addProduct = function () {
        var item = { id: null, name: null, description: null, price: null};
        products.push(new productModel(item, displayMode.edit));
    };

    /* method to send add request to the client */
    var saveProduct = function (product) {
        console.log("save product: " + product);
        client.addProduct(product, saveProductCallback);
    };

    /* callback on successful add request */
    var saveProductCallback = function (product) {
        
        product.data.id(1);
        product.displayMode(displayMode.view);
        console.log("Product saved with id [" + product.data.id() + "]");
    };

    /* method to edit a product */
    var editProduct = function (product) {
        product.displayMode(displayMode.edit);
    };

    /* method to send update request to the client */
    var updateProduct = function (product) {
        client.updateProduct(product, updateProductCallback);
    };

    /* callback on successful update request */
    var updateProductCallback = function (product) {
        console.log("Product updated with id [" + product.data.id() + "]");
        product.displayMode(displayMode.view);
    };

    var init = function () {
        /* add code to initialize this module */
        retrieveProducts();

        //apply ko bindings
        ko.applyBindings(ProductsGrid);
    };
    /* execute the init function when the DOM is ready */
    $(init);
    return {
        /* add members that will be exposed publicly */
        productModel: productModel,
        products: products,
        client: client,
        retrieveProducts: retrieveProducts,
        deleteProduct: deleteProduct,
        displayMode: displayMode,
        addProduct: addProduct,
        saveProduct: saveProduct,
        editProduct: editProduct,
        updateProduct: updateProduct
    };
}();