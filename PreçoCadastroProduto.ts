/// <reference path="xrm.ts" />   

var currentprice = 0;
function setalistacotacao(executionContext : Xrm.Events.EventContext)
{
    var formContext = executionContext.getFormContext();
    Xrm.WebApi.retrieveRecord("product", formContext.getAttribute("productid").getValue()[0].id, "?$select=price").then(
        function success(result) {
            currentprice = result.price;
            setTimeout(function(price){formContext.getAttribute("priceperunit").setValue(price);},100,currentprice)
            
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
}
GetGlobalContext()