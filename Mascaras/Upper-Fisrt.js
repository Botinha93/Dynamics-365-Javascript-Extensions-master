function titleCase(executionContext,fieldname) {
   var formContext = executionContext.getFormContext();
   var splitStr = formContext.getAttribute(fieldname).getValue().toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   formContext.getAttribute(fieldname).setValue(splitStr.join(' '));
}
