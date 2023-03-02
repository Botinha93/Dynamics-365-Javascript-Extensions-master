
function formattEmail(executionContext) {

    var formContext = executionContext.getFormContext();

    var Email = formContext.getAttribute("new_Email").getValue();

    var reg=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (!reg.test(Email)) {

        Xrm.Page.ui.setFormNotification('Wrong Email format!', "ERROR")

        return false;

    }

}

