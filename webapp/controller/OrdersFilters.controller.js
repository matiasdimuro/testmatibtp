sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], function(Controller, Filter, FilterOperator) {
    'use strict';
    
    return Controller.extend("hexagon.testmatibtp.controller.OrdersFilters", {

        _vOverview : null,

        onInit : function() {

            var oData = {
                options: [  
                    {
                        key: "Germany",
                        value: "Germany"
                    },
                    {
                        key: "France",
                        value: "France"
                    },
                    {
                        key: "Brazil",
                        value: "Brazil"
                    },
                    {
                        key: "Belgium",
                        value: "Belgium"
                    },
                    {
                        key: "Mexico",
                        value: "Mexico"
                    },
                ]
            }

            var oJsonModel = this.getOwnerComponent().getModel('orderCountries');
            oJsonModel.setData(oData);

        },

        onAfterRendering: function() {
            // this._vOverview = this.getOwnerComponent().byId(this.getOwnerComponent().getId() + "---App").byId("overviewView");
            this._vOverview = this.getView().getParent().getParent();
            // var oRouter = this.getOwnerComponent().getRouter();
            // this._vOverview = oRouter.getView("overview");
        },



        onFilteredSearch : function() {

            console.log("Filtering");

            var sOrderID = this.getView().getModel().getProperty("/filtering/OrderID");
			var sShipName = this.getView().getModel().getProperty("/filtering/ShipName");
			var sShipCountry = this.getView().getModel().getProperty("/filtering/ShipCountry");

            var aFilter = [];

            if (sOrderID !== "") { aFilter.push(new Filter("OrderID", FilterOperator.EQ, sOrderID)); }
			if (sShipName !== "") { aFilter.push(new Filter("ShipName", FilterOperator.EQ, sShipName)); }
			if (sShipCountry !== "") { aFilter.push(new Filter("ShipCountry", FilterOperator.EQ, sShipCountry)); }
        
            var vOrdersTableView = this._vOverview.byId("ordersTableView");
			var oOrdersTable = vOrdersTableView.byId("ordersTable");
			
			oOrdersTable.getBinding("items").filter(aFilter);
        },

        onClearSearch : function() {
			
			var blank = "";
			
			this.getView().getModel().setProperty("/filtering/OrderID", blank);
			this.getView().getModel().setProperty("/filtering/ShipName", blank);
			this.getView().getModel().setProperty("/filtering/ShipCountry", blank);
		}

    });
});