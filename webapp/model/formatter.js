sap.ui.define([
    "sap/ui/core/format/NumberFormat"

], function(NumberFormat) {
    'use strict';

    return {

        currency : function(nPrice) {
            
            var oCurrency = new sap.ui.model.type.Currency({
                showMeasure: false       
            });
            debugger;
            return "$ " + oCurrency.formatValue([nPrice, "USD"], "string");
        },



        isDiscontinuedValue : function(isDiscontinued) {
            
            return (isDiscontinued) ? "Disontinued" : "Continued"
        },

        isDiscontinuedState : function(isDiscontinued) {
            
            return (isDiscontinued) ? "Success" : "Error"
        }
    }
});