sap.ui.define([
    "sap/ui/core/mvc/Controller"

], function(Controller) {
    'use strict';
    
    return Controller.extend("hexagon.testmatibtp.controller.OrdersTable", {

        onInit : function() {

            // this._loadLoadingDataFragment();

            var oDataModel = this.getOwnerComponent().getModel('nwEntities');
            var oJsonModel = this.getOwnerComponent().getModel('orders');

            var oView = this.getView();
            oView.setBusy(true);

            oDataModel.read('/Orders', {

                success: function(data) {
                    oJsonModel.setData(data);
                    oView.setBusy(false);
                    // this.dialog.close();
                },

                error: function(err) {
                    oView.setBusy(false);
                    // this.dialog.close();
                    console.log(err);
                }
            });
        },



        onSeeDetail: function(oEvent) {

            var oItem = oEvent.getSource();
            var oBindingContext = oItem.getBindingContext("orders");

            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("detail", {
                orderPath: window.encodeURIComponent(oBindingContext.getPath().substr(1))
            });
        },



        _loadLoadingDataFragment : function() {

            if (!this.dialog) {
				this.dialog = sap.ui.xmlfragment("hexagon.testmatibtp.view.LoadingDataPopup", this); 
				this.getView().addDependent(this.dialog); 
			 }
			 
			 this.dialog.open();
        }
    });
});