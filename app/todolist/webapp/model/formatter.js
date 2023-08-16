sap.ui.define([], function () {
	"use strict";
	return {
		iconPriority: function (sStatus) {
			if (sStatus == "2"){
					return "Low" 
				} if (sStatus == "1"){
					return "Medium"
				}
			}
		}
})