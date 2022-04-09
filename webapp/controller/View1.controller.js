sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("r6fileuploader.controller.View1", {
        handleUploadComplete: function () {
            sap.m.MessageToast.show("File Uploaded");
            var oFilerefresh = this.getView().byId("itemlist");
            oFilerefresh.getModel().refresh(true);
            sap.m.MessageToast.show("File refreshed");
        },
        onUpload: function () {
            var oModel = this.getOwnerComponent().getModel();
            var oFileUploader = this.getView().byId("fileUploader");
            if (oFileUploader.getValue() === "") {
                MessageToast.show("Please Choose any File");
            } else {
                var slug = 'PRD001,' + oFileUploader.getValue();
            }
            oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                name: "SLUG",
                value: slug
            }));
            oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                name: "x-csrf-token",
                value: oModel.getSecurityToken()
            }));
            oFileUploader.setSendXHR(true);
            oFileUploader.upload();
        },
        download: function (oEvent) {
            var ctx,name,prd,link;
            ctx = oEvent.getSource().getBindingContext();
            name = ctx.getObject().Filename;
            prd = ctx.getObject().Prdid; 
            var oModel = this.getOwnerComponent().getModel();
            link = "/sap/opu/odata/sap/ZSHREE_PRODUCTS_SRV/attachmentsSet(Prdid='" + prd + "',Filename='" + name + "')/$value";
            sap.m.URLHelper.redirect(link,false);
        }

    });
});
