function UpdateDoalar(executionContext)
{
    
    var formContext = executionContext.getFormContext(); 
    var gridContext = formContext.getControl("quotedetailsGrid");
    var rows = gridContext.getGrid().getRows();
    var dolar = formContext.getAttribute("cr8e2_cotaomoeda").getValue();
    for (let index = 0; index < rows.getLength(); index++) {
        var row = rows.get(index);
        row.getAttribute("cr8e2_dolarvalor").setValue(dolar);
        var BRL = row.getAttribute("priceperunit").getValue();
        BRL = BRL * dolar;
        row.getAttribute("cr8e2_brlunidade").setValue(BRL);
        var BRLTotal = BRL * row.getAttribute("quantity").getValue();
        row.getAttribute("cr8e2_brltotal").setValue(BRLTotal);
        var data =
        {
            "cr8e2_dolarvalor": dolar,
            "cr8e2_brlunidade": BRL,
            "cr8e2_brltotal" : BRLTotal
        }
        Xrm.WebApi.updateRecord("quotedetail", row._entityId.guid, data).then(
            function success(result) {
                console.log("quotedetail updated");
                // perform operations on record update
            },
            function (error) {
                console.log(error.message);
                // handle error conditions
            }
        );

    }
    formContext.getAttribute("cr8e2_botaocotacao2").setValue("false");
    formContext.getAttribute("cr8e2_botaomoeda").setValue("false");
}