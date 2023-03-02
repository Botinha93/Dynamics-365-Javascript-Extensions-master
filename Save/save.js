
function onsaveCalc(executionContext){
    var formContext = executionContext.getFormContext(); 
    if(formContext.getAttribute("customerid").getValue()[0].name!=null && formContext.getAttribute("quotenumber").getValue()!= "" ){
       formContext.getAttribute("name").setValue(formContext.getAttribute("customerid").getValue()[0].name+"/"+formContext.getAttribute("quotenumber").getValue());
    }
}
function save(executionContext){
    var formContext = executionContext.getFormContext(); 
    if(formContext.ui.getFormType() != 1){
        formContext.data.entity.save();
    }
}
function onSaveGrid(executionContext) {
    var saveEvent = executionContext.getEventArgs();
    var formContext = executionContext.getFormContext(); // get the form Context
    var gridContext = formContext.getControl("Produto"); // get the grid context
    var contRows = gridContext.getGrid().getRows();
    for (var i=0; i<gridContext.getGrid().getTotalRecordCount();i++){
        var row = contRows.get(i);
        var rowatt = row.getData().getEntity().attributes
        for (var j=0; j<gridContext.getGrid().getTotalRecordCount();j++){
            var row2 = contRows.get(j);
            var row2att = row2.getData().getEntity().attributes;
            if(row2att.get("new_codigodoproduto").getValue()==rowatt.get("new_codigodoproduto").getValue()){
                Xrm.Navigation.openErrorDialog({message:"Existem produtos duplicados"});
                saveEvent.preventDefault();
                break;
            }
        }
    }
  }