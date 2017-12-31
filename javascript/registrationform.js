/* Module for Registration form application */
var RegistrationForm = function () {
    /* add members here */

    /* form submission */
    var submit = function () {
        if (customer.errors().length === 0) {
            console.log("Customer model is valid.");
            console.log(ko.toJSON(customer));
        } else {
            console.log("Customer model has errors.");
            //highlight all errors
            customer.errors.showAllMessages();
        }
    };

    /* the model */
    var customer = {
        interests: ko.observableArray(),
        creditCards: ko.observableArray(),
        personalInfo: {
            title: ko.observable().extend({ required: true}),
            firstName: ko.observable().extend({ required: true}),
            middleName: ko.observable(),
            lastName: ko.observable()
        },
        contactDetails: {
            phoneNumber: ko.observable().extend({ required: true, minLength: 4, maxLength: 9, number: true}),
            emailAddress: ko.observable().extend({ required: true, email: true}),
            preferredContact: ko.observable().extend({ required: true})
        },
        address: {
            residential: {
                street: ko.observable().extend({ required: true}),
                city: ko.observable().extend({ required: true}),
                postCode: ko.observable().extend({ required: true, maxLength: 4, number: true}),
                country: ko.observable().extend({ required: true})
            },
            postal: {
                type: ko.observable(),
                streetAddress: {
                    street: ko.observable(),
                    city: ko.observable(),
                    postCode: ko.observable(),
                    country: ko.observable()
                },
                poBoxAddress: {
                    poBox: ko.observable(),
                    city: ko.observable(),
                    postCode: ko.observable(),
                    country: ko.observable()
                }
            }
        }

    };

    ko.extenders.required = function (target, overrideMessage) {
        //add some sub-observables to our observable
        target.hasError = ko.observable();
        target.validationMessage = ko.observable();

        //define a function to do validation
        function validate(newValue) {

            target.hasError($.trim(newValue) ? false : true);
            target.validationMessage($.trim(newValue) ? "" : overrideMessage || "This field is required");
        }

        //initial validation
        validate(target());

        //validate whenever the value changes
        target.subscribe(validate);

        //return the original observable
        return target;
    };

    /* options for the title drop down*/
    var titleOptions = [
        {
            prefijo: 'Mr',
            setTitle: function () {
                RegistrationForm.customer.personalInfo.title("Mr"); }
        },
        {
            prefijo: 'Mrs',
            setTitle: function () {
                RegistrationForm.customer.personalInfo.title("Mrs");}
        },
        {
            prefijo: 'Miss',
            setTitle: function () {
                RegistrationForm.customer.personalInfo.title("Miss");}
        },
        {
            prefijo: 'Dr',
            setTitle: function () {
                RegistrationForm.customer.personalInfo.title("Dr");}
        }
    ];

    /* computed observable for title drop down text change */
    var titleSelect = ko.pureComputed(function () {
        if(customer.personalInfo.title() == null) {
            return "select"
        } else {
            return customer.personalInfo.title();
        }
    });

    /* method to add credit card to the credit cards array */
    var addCreditCard = function () {
        customer.creditCards.push({name: ko.observable(), number: ko.observable(), expiryDate: ko.observable()});
    };

    /* method to delete a credit card from the credit cards array */
    var deleteCreditCard = function (card) {
        console.log("Deleting credit card with number: " +
            card.number());//remove the credit card from the array
        customer.creditCards.remove(card);
    };

    /* method to traverse the model and clear observables */
    var traverseAndClearModel = function(jsonObj) {
        $.each(jsonObj, function(key,val){
            if(ko.isObservable(val)) {
                if(val.removeAll != undefined) {
                    val.removeAll();
                } else {
                    val(null);
                }
            } else {
                traverseAndClearModel(val);
            }
        });
    };

    /* clear the model */
    var clear = function () {
        console.log("Clear customer model");
        traverseAndClearModel(customer);//add the first credit card
        addCreditCard();
    };

    /* method to configure the validation plugin */
    var configureValidation = function () {
//initialize and configure the validation plugin
        ko.validation.init({
            errorElementClass: 'has-error',
            errorMessageClass: 'help-block'
        });
//group errors
        customer.errors = ko.validation.group(customer, {deep:true});
    };




    var init = function () {
        /* add code to initialize this module */
        addCreditCard();

        configureValidation();

        // enable validation
        ko.validation.init();

        ko.applyBindings(RegistrationForm);


    };
    /* execute the init function when the DOM is ready */
    $(init);
    return {
        /* add members that will be exposed publicly */
        submit: submit,
        customer: customer,
        titleOptions: titleOptions,
        titleSelect: titleSelect,
        addCreditCard: addCreditCard,
        deleteCreditCard: deleteCreditCard,
        clear: clear,
        traverseAndClearModel: traverseAndClearModel
    };
}();








