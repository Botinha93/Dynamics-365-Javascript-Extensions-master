function email(executionContext)
{
    var formContext = executionContext.getFormContext(); 
    var gridContext = formContext.getControl("Contatos");
    window.console.log(gridContext.getGrid().getTotalRecordCount())
    if(formContext.getAttribute("new_enviapara").getValue() == true && gridContext.getGrid().getTotalRecordCount()==0){
        formContext.getAttribute("new_enviapara").setValue(false);
        formContext.getAttribute("new_enviapara").fireOnChange();
    }
    formContext.data.save().then(function(){ 
        DownloadTemplate(1022,"453578a3-b10b-ea11-a811-000d3ac05a0e",9940,"lista de p.docx",formContext.data.entity.getId(),executionContext)
    });
}

function DownloadTemplate(entitytypecode, templateid, templatetype, filename,entity,executionContext){
    
    // retrieve the entity id from the current page
    var entityid = new Array();
    entityid.push(entity);
    var fileasBlob;
    // try and make a request for the document template
    try{
        
        // clear the page of any previous errors
        Xrm.Page.ui.clearFormNotification("docerror");
        
        // the path that will be used to retrieve the word template
        var funcpath = Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.0/ExportPdfDocument";
        
        // open the request to create the template
        var req = new XMLHttpRequest();
        req.open("POST", funcpath, true);
        req.responseType = "json";
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json");

        
        // on completion, run the bellow function
        req.onreadystatechange = function () {
            // request complete
            if (this.readyState == 4) {
                req.onreadystatechange = null;
                 // check if we got back a 200 from the request
            if (this.status >= 200 && this.status <= 299) {
                // add the download url to an a tag and then click the a tag 
                // to download the document
                var pdf = req.response;
                window.console.log(pdf)
                composeMail(executionContext,pdf.PdfFile )
            }
        }}

        // compile the data to send with the request
        var formdata = {
            "EntityTypeCode": entitytypecode,
            "SelectedRecords": "[\""+entity+"\"]",
            "SelectedTemplate": {
                "@odata.type": "Microsoft.Dynamics.CRM.documenttemplate",
                "documenttemplateid": templateid
         }
     }
        
        // make the request to create the template
        window.console.log(formdata);
        req.send(JSON.stringify(formdata));
        
    }catch (err) {
        PrintError(err.message);
    }
}

/*
* PrintError() is a helper method to display any errors to the user.
*/
function PrintError(msg){
    Xrm.Page.ui.setFormNotification("An Error occurred generating the word document, please contact support if the issue persists. " + msg, "ERROR", "docerror");
}

function composeMail(executionContext, fileinBase64){
    var formContext = executionContext.getFormContext(); 
    var userSettings = Xrm.Utility.getGlobalContext().userSetting;
    var gridContext = formContext.getControl("Contatos");
    var data ={};
    data.subject = "Lista de Preços Frigon"
    data.description = "Bom Dia! <br> <p>Segue em anexo a lista de preço: <b>"+formContext.getAttribute("name").getValue()+"</b> de numero: <b>"+formContext.getAttribute("new_codtab").getValue()+"</b></p><p>Referente ao periodo:<br><b>de.:  </b>"+formContext.getAttribute("begindate").getValue()+"<br><b>Até: </b>"+formContext.getAttribute("enddate").getValue();
    var contRows = gridContext.getGrid().getRows();
    var count = 0;
    to = [];
    if(formContext.getAttribute("new_enviapara").getValue() == "Cliente"){
    contRows.forEach(row => {
        /*
        var result = Xrm.WebApi.retrieveRecord("contact", row.getData().getEntity().getId(), "?$select=emailaddress1");*/
            var entity = row.getData().getEntity();
            to[count]={};
            to[count].participationtypemask = 4;
            to[count]["partyid_contact@odata.bind"] = "/contacts(" + entity.getEntityReference().id.replace('{', '').replace('}', '') + ")";
            count++;
        });
    }else{
            gridContext = formContext.getControl("Clientes");
            contRows = gridContext.getGrid().getRows();
            contRows.forEach(row => {
                var entity = row.getData().getEntity();
                to[count]={};
                to[count].participationtypemask = 4;
                to[count]["partyid_account@odata.bind"] = "/accounts(" + entity.getEntityReference().id.replace('{', '').replace('}', '') + ")";
                count++;
            });
    }
    if(!!userSettings){
        to[count]={};
        to[count].participationtypemask = 1;
        to[count]["partyid_systemuser@odata.bind"] = "/systemusers(" + userSettings.userId.replace('{', '').replace('}', '') + ")";
    }
    data["email_activity_parties"] = to;
    window.console.log(data);
    Xrm.WebApi.createRecord("email",data).then(
        function (respm){
            
            /*var reader = new FileReader();
            reader.readAsBinaryString(blob); 
            reader.onloadend = function() {
                attachment.body_binary = reader.result;
            }*/
            var attachment = {
                "objectid_email@odata.bind" : "/emails("+respm.id.replace('{', '').replace('}', '')+")",
                "filename" : "lista de preços.pdf",
                "mimetype" : "application/pdf",
                "objecttypecode" : "email",
                "subject" : data.subject,
                "body" : fileinBase64
            };
            window.console.log(attachment);
            var req = new XMLHttpRequest();
            req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.0/activitymimeattachments", true);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json");
            req.onreadystatechange = function() {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 204) {
                        var uri = this.getResponseHeader("OData-EntityId");
                        var regExp = /\(([^)]+)\)/;
                        var matches = regExp.exec(uri);
                        var newEntityId = matches[1];
                        var entityOptions = {};
                        entityOptions["entityName"] = "email";     
                        entityOptions["entityId"] = respm.id;
                        entityOptions["openInNewWindow"] = true;

                        Xrm.Navigation.openForm(entityOptions).then(
                            function (lookup) { console.log("Success"); },
                            function (error) { console.log("Error"); }
                        );
                    } else {
                        Xrm.Utility.alertDialog(this.statusText);
                        
                    }
                }
            };
            req.send(JSON.stringify(attachment));
            

            
                
        },
        function (error) { window.console.log(error.message); }
    );


}