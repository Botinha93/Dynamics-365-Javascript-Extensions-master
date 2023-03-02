function setalista(executionContext)
{
    var formContext = executionContext.getFormContext();
    var lista = new Array();
    var confirmStrings = { text:"Deseja usar a lista padrão do cliente?", title:"Cliente com lista associada" };
    var confirmOptions = { height: 200, width: 450 };
    if(!!formContext.getAttribute("customerid").getValue()){
    Xrm.WebApi.retrieveRecord("account", formContext.getAttribute("customerid").getValue()[0].id, "?$select=name,address1_postalcode&$expand=defaultpricelevelid($select=pricelevelid,name)").then(
        function success(result) {
            window.console.log(result)
            window.console.log(result.defaultpricelevelid)
            window.console.log(result.defaultpricelevelid.name)
            lista[0] = new Object();
            lista[0].id = result.defaultpricelevelid.pricelevelid;
            lista[0].name = result.defaultpricelevelid.name; // Name of the lookup
            lista[0].entityType = "pricelevel"; //Entity Type of the lookup entity
            if(!(!!formContext.getAttribute("shipto_postalcode").getValue())){
                formContext.getAttribute("shipto_postalcode").setValue(result.address1_postalcode);
                formContext.getAttribute("shipto_postalcode").fireOnChange();
            }
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
    }
    window.console.log(lista[0]);
    formContext.data.save().then(function (){
        if(formContext.ui.getFormType() != 1){
            if(!(!!formContext.getAttribute("pricelevelid").getValue())){
                Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
                    function (success) {    
                        if (success.confirmed){
                            formContext.getAttribute("pricelevelid").setValue(lista);
                            formContext.getAttribute("pricelevelid").fireOnChange();
                        }
                    }
                );
            }
        }
    }
    ,function (errorCode, message){
        console.log(message);
    });
}