sap.ui.define([
	"./BaseController",
	"sap/ui/core/library",
	"sap/m/MessageBox"
], function (BaseController, coreLibrary, MessageBox) {
	"use strict";

	var MessageType = coreLibrary.MessageType;

	return BaseController.extend("todolist.controller.ToDo", {

		onOpenInsertDialog: async function(oEvent) {
            var sAction = oEvent.getSource().data('actionName');
            var sDialogName = oEvent.getSource().data('dialogName');
			var oDialog = await this.getDialog(sDialogName);
            var sPath;
            var oContext;

            if (sAction == 'Insert'){
                oContext= this.getModel().createEntry('/Tasks');
                sPath = oContext.getPath();
            } else if (sAction == 'Edit'){
                sPath = oEvent.getSource().getBindingContext().getPath()
            }
            
            oDialog.bindElement(sPath);
			oDialog.open();
        },

		onInsert: function(oEvent) {
            var oSource = oEvent.getSource();
            var oDialog = oSource.getParent();

            this.getModel().submitChanges({
                success: function(oResponse) {

                    sap.m.MessageBox.show(this.getView().getModel("i18n").getResourceBundle().getText("onInsert"),{
                        icon: MessageBox.Icon.SUCCESS
                    });
                    this.getModel().refresh(true);
                    oDialog.close();
                }.bind(this),
                error: function(oResponse) {

                }.bind(this)
            });   
        },

        onEdit: function(oEvent) {
            var oSource = oEvent.getSource();
            var oDialog = oSource.getParent();
           
            this.getModel().submitChanges({
                success: function(oResponse) {

                    MessageBox.show(this.getView().getModel("i18n").getResourceBundle().getText("onEdit"),{
                        icon: MessageBox.Icon.SUCCESS
                    });
                    this.getModel().refresh(true);
                    oDialog.close();
                }.bind(this),
                error: function(oResponse) {

                }.bind(this)
            });
        },

        onDelete: function(oEvent) {
            var oSource = oEvent.getSource();
            var oDialog = oSource.getParent();
            var sPath = oSource.getBindingContext().getPath();

            this.getModel().remove(sPath, {
                success: function(oResponse) {
                   
                    MessageBox.show(this.getView().getModel("i18n").getResourceBundle().getText("onDelete"), {
                        icon: MessageBox.Icon.SUCCESS
                    });
                    this.getModel().refresh(true);
                    oDialog.close();
                }.bind(this),
                error: function(oResponse) {

                }.bind(this)
            });
        },

        onCancel: function(oEvent) {
            var oSource = oEvent.getSource();
            var oDialog = oSource.getParent();

            this.getModel().resetChanges()

            oDialog.close();
        }

	});
});