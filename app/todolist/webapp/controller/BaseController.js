sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "../model/models",
    "sap/ui/core/Fragment"
  ], function (Controller,formatter,models,Fragment) {
  
    "use strict";
   
    return Controller.extend("todolist.controller.BaseController", {
      formatter: formatter,
      models: models,
      

      getModel: function(sName) {
        return this.getView().getModel(sName) || this.getOwnerComponent().getModel(sName);
      },
   
      
      getRouter: function () {
        return this.getOwnerComponent().getRouter();
      },

      
      getDialog: async function (sDialogName) {
        var oView = this.getView();

        if (!this[sDialogName]) {
            this[sDialogName] = await Fragment.load({
            id: sDialogName,
            name: "todolist.view.fragments." + sDialogName,
            controller: this,
            });

            oView.addDependent(this[sDialogName]);
        }

        return await this[sDialogName];
      } 
    });
  });