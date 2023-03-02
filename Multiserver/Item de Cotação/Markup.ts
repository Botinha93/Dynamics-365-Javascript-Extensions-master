
function calcMarkup(executionContext)
{
    var formContext = executionContext.getFormContext(); 
    setTimeout(function(){
        var markup = formContext.getAttribute("new_totalcommarkup").getValue();
        var price = formContext.getAttribute("priceperunit");
        var value = ((markup/100)+1)*price.getValue()
        price.setValue(value);
        price.fireOnChange();
        formContext.getControl("priceperunit").setDisabled(true);
        value = value * formContext.getAttribute("cr8e2_dolarvalor").getValue();
        formContext.getAttribute("cr8e2_brlunidade").setValue(value);
    },500);
}