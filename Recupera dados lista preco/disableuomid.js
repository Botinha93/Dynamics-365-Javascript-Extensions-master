function disable(executionContext)
{
    var formContext = executionContext.getFormContext();
    var teste = formContext.getControl("uomid")
    teste.setDisabled(true);
}