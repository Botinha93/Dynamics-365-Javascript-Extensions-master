function setalista(executionContext)
{
    var formContext = executionContext.getFormContext();
    var lista = new Array();
    if(!!formContext.getAttribute("productid").getValue()){
    Xrm.WebApi.retrieveRecord("product", formContext.getAttribute("productid").getValue()[0].id, "?$select=name&$expand=defaultuomid($select=uomid,name)").then(
        function success(result) {
            lista[0] = new Object();
            lista[0].id = result.defaultuomid.uomid;
            lista[0].name = result.defaultuomid.name; // Name of the lookup
            lista[0].entityType = "uom"; //Entity Type of the lookup entity
            formContext.getAttribute("uomid").setValue(lista);
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );

    }

}
function limpa(executionContext)
{
    var formContext = executionContext.getFormContext(); 
    formContext.getAttribute("priceperunit").setValue(null);
    formContext.getAttribute("manualdiscountamount").setValue(null);
}
function onloadQuoteProd(executionContext)
{
    var formContext = executionContext.getFormContext();
    formContext.getAttribute("isproductoverridden").addOnChange(eventsource);
    formContext.getAttribute("isproductoverridden").addOnChange(limpa);
}
function setalistacotacao(executionContext)
{
    var formContext = executionContext.getFormContext();
    var lista = new Array();
    if(!!formContext.getAttribute("new_productid").getValue()){
    formContext.getControl("productdescription").setVisible(true);
    var nome = formContext.getAttribute("new_productid").getValue()[0].name;
    formContext.getAttribute("productdescription").setValue(nome);
    formContext.getControl("productdescription").setVisible(false);
    Xrm.WebApi.retrieveRecord("product", formContext.getAttribute("new_productid").getValue()[0].id, "?$select=name,productnumber,price&$expand=defaultuomid($select=uomid,name)").then(
        function success(result) {
            lista[0] = new Object();
            lista[0].id = result.defaultuomid.uomid;
            lista[0].name = result.defaultuomid.name; // Name of the lookup
            lista[0].entityType = "uom"; //Entity Type of the lookup entity
            formContext.getAttribute("new_uomid").setValue(lista);
            formContext.getAttribute("new_codigodoproduto").setValue(result.productnumber);
            formContext.getAttribute("priceperunit").setValue(result.price);
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );

    }
    if(!!formContext.getAttribute("productid").getValue()){
        Xrm.WebApi.retrieveRecord("product", formContext.getAttribute("productid").getValue()[0].id, "?$select=name,productnumber").then(
            function success(result) {
                formContext.getAttribute("new_codigodoproduto").setValue(result.productnumber);
            },
            function (error) {
                console.log(error.message);
                // handle error conditions
            }
        );
    }

}
function eventsource(executionContext)
{
    var item = executionContext.getEventSource();
    var formContext = executionContext.getFormContext();
    if(item.getValue()){
        formContext.getControl("new_productid").setVisible(true);
        formContext.getControl("uomid").setVisible(false);
        formContext.getControl("new_uomid").setVisible(true);
    }else{
        formContext.getControl("new_productid").setVisible(false);
        formContext.getControl("uomid").setVisible(true);
        formContext.getControl("new_uomid").setVisible(false);
    }
}