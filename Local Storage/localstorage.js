function salva(executionContext)
{
    var formContext = executionContext.getFormContext(); 
    if(formContext.ui.getFormType() != 1){
	    var desconto = formContext.getAttribute("new_descontodaconta").getValue();
        localStorage.setItem('desconto', desconto);
    }else{
        localStorage.setItem('desconto', 0);
    }
}
function load(executionContext)
{
    var formContext = executionContext.getFormContext(); 
    calc(formContext);
}
function calc(formContext){
    setTimeout(function(){
        var desconto;
        if(formContext.getAttribute("new_descontodacotao")==null){
            desconto = parseFloat(localStorage.getItem('desconto'));
        }else{
            desconto = formContext.getAttribute("new_descontodacotao").getValue();
        }
        var amount = formContext.getAttribute("priceperunit").getValue();
        desconto = (desconto/100);
        var valuefinal = (amount*desconto);
        window.console.log(valuefinal)
        valuefinal = Number(parseFloat(valuefinal).toFixed(2));
        window.console.log(valuefinal);
        formContext.getAttribute("manualdiscountamount").setValue(valuefinal);
        var total = formContext.getAttribute("baseamount").getValue()-(valuefinal*formContext.getAttribute("quantity").getValue());
        window.console.log(total);
        window.console.log(formContext.getAttribute("quantity"));
        formContext.getAttribute("extendedamount").setValue(total);
        }, 1000);
}

function ingrid(executionContext){
    var formContext = executionContext.getFormContext();
    var gridContext = formContext.getControl("Produto");
    var row = gridContext.getGrid().getSelectedRows().get(0);
    calc(row)
}
function gridRowSelected(context) {
    context.getFormContext().getData().getEntity().attributes.forEach(function (attr) {
        if (attr.getName() === "extendedamount" || attr.getName() === "baseamount" || attr.getName() === "priceperunit") {
            attr.controls.forEach(function (c) {
                c.setDisabled(true);
            })
        }
    });
}