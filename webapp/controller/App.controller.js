sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("hexagon.testmatibtp.controller.App", {

            onInit: function () {

                var oData = {
                    filtering: {
                        OrderID: "",
                        ShipName: "",
                        ShipCountry: ""
                    }
                };

                var oJsonModel = this.getOwnerComponent().getModel();
                oJsonModel.setData(oData);
            }

        });
    });
