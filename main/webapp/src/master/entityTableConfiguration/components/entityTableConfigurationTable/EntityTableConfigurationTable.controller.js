sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/f/library",
	"com/sap/sct/idtm_ui/src/api/Request",
	"com/sap/sct/idtm_ui/src/dialog/factory",
	"com/sap/sct/idtm_ui/src/dialog/entityTable/deleteEntityTable",
	"com/sap/sct/idtm_ui/src/util/util"
], function(
	Controller,
	JSONModel,
	FioriLibrary,
	Request,
	DialogFactory,
	DeleteEntityTableDialog,
	Util
	) {
    "use strict";

    return Controller.extend("com.sap.sct.idtm_ui.src.master.entityTableConfiguration.components.entityTableConfigurationTable.entityTableConfigurationTable", {
		onInit: function () {
			Request.EntityTable.getList(this, true).then((aEntityTables) => {
                this.getOwnerComponent().getModel("data").setProperty("/entityTables", aEntityTables);
			});
		},

		onTableListItemPress: function (oEvent) {
			var sEntityTablePath = oEvent.getSource().getBindingContext("data").getPath();
			var sPathParts = sEntityTablePath.split("/");
			var nEntityTableModelIndex = sPathParts[sPathParts.length - 1];

			this.getOwnerComponent().getRouter().navTo("DetailEntityTableConfiguration",
				{
					layout: FioriLibrary.LayoutType.TwoColumnsMidExpanded,
					entityTable: nEntityTableModelIndex
				});
		},

        onImportPress: function (oEvent) {

        },

		onCreatePress: function (oEvent) {
        const newEntityTableIndex = this.getOwnerComponent().getModel("data")
            .getProperty("/entityTables").push({
                id: undefined,
                tableName: "New Entity Table",
                tableContent: undefined
            }) - 1;

        this.getOwnerComponent().getRouter().navTo("DetailEntityTableConfiguration",
            {
                layout: FioriLibrary.LayoutType.TwoColumnsMidExpanded,
                entityTable: newEntityTableIndex
            });
            this.getOwnerComponent().getModel("ui").setProperty("/editMode", true);
		},

		onDeletePress: function (oEvent) {
			DeleteEntityTableDialog.getDialog.call(this, this._deleteIngredients);
		},

		_deleteIngredients: function () {
//			var aDeletedIngredients = this.getView().byId("identityTableConfigurationTable").getSelectedItems()
//				.map(row => row.getBindingContext("data").getObject().id);
//
//			//TODO need to implement some dialog which will display error logs in case that some of ingredients will not be deleted
//			Request.Ingredient.deleteList.call(this, aDeletedIngredients, Util.getModel.call(this, "data"), "/ingredients", true);
		}
    });

});
