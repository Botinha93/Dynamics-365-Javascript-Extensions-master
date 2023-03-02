function onchangeSelector(executionContext)
{
    var formContext = executionContext.getFormContext(); 
    var gridContextContatos = formContext.getControl("Contatos");
    var gridContextClientes = formContext.getControl("Clientes");
    if(formContext.getAttribute("new_enviapara").getValue() == false){
        gridContextContatos.setVisible(false);
        gridContextClientes.setVisible(true);
    }else{
        gridContextContatos.setVisible(true);
        gridContextClientes.setVisible(false);
    }
    
}