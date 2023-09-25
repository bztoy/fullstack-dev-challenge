sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        addQuestion: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});