function clockFields(executionContext){
    var formContext = executionContext.getFormContext(); 
    if(formContext.ui.getFormType() != 1){
        formContext.ui.tabs.get("tab_5").setVisible(true);
    }
    if(!formContext.getAttribute("effectiveto").getValue()){
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1)
        formContext.getAttribute("effectiveto").setValue(currentDate);
    }else if(formContext.getAttribute('statecode').getValue() == 0){
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate())
        if(formContext.getAttribute("effectiveto").getValue() < currentDate){
            formContext.ui.tabs.get("tab_5").setVisible(false);
        }
    }
    if(!formContext.getAttribute("effectivefrom").getValue()){
        var currentDate = new Date();
        formContext.getAttribute("effectivefrom").setValue(currentDate);
    }
    if(formContext.getAttribute("revisionnumber").getValue()>0){
        formContext.getControl("customerid").setDisabled(true);
    }
}