
function registerEvents(executionContext){
    touppercase(executionContext.getFormContext());
}
function touppercase(formContext){
    var attributes = formContext.data.entity.attributes.get();
    for (var i in attributes) {
        each(attributes[i]);
    }
}
function each(element) {
    element.addOnChange(upper);
} 
function upper(executionContext){
    var fieldChanged = executionContext.getEventSource();
    var temp = fieldChanged.getValue();
    if(temp){
        if(typeof temp === 'string' || temp instanceof String){
            fieldChanged.setValue(temp.toUpperCase());
        }
    }
}
