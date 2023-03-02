function lista(executionContext) {
    var formContext = executionContext.getFormContext(); // get the form Context
    var gridContext = formContext.getControl("pricelistitemsgrid"); // get the grid context
    gridContext.addOnLoad(function(){
        gridContext.setLabel("Numero de itens: "+gridContext.getGrid().getTotalRecordCount())
    })
 }