sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",

], function(Controller, History, Filter, FilterOperator) {
    'use strict';
    
    return Controller.extend("hexagon.testmatibtp.controller.Detail", {

        onInit : function() {

            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detail").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched : function(oEvent) {

            var sOrderPath = oEvent.getParameter("arguments").orderPath;

            this.getView().byId('orderForm').bindElement({
                path: "/" + window.decodeURIComponent(sOrderPath),
                model: "orders"
            });

            var nOrderID = this.getView().byId('orderForm').getBindingContext("orders").getProperty("OrderID");

            var aFilter = [];
            aFilter.push(new Filter("OrderID", FilterOperator.EQ, nOrderID));

            var oTemplate = this.getView().byId('productTemplate');

            this.getView().byId('orderDetailsTable').bindAggregation("items", {
                path: "nwEntities>/Order_Details",
                template: oTemplate,
                templateShareable: true,
                filters: aFilter,
            })
        },



        onBackOverview : function() {

            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            }
            else {
                var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
            }
        },

        onSeeProduct: function(oEvent) {

            var oProduct = oEvent.getSource();
            var oBindingContext = oProduct.getBindingContext("nwEntities");

            var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("product", {
                productID: window.encodeURIComponent(oBindingContext.getProperty("ProductID"))
            });
        }

    });
});