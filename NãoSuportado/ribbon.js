function quote(executionContext){
    var formContext = executionContext.getFormContext(); 
    if(formContext.getAttribute('statecode').getValue() != 1){
        removeElements("quote", "Enviar Email como PDF");
    }
    removeElements("quote", "Consultar Endereço");
    removeElements("quote", "Enviar um Link por Email");
    removeElements("quote", "Fluxo");
    removeElements("quote", "Processar");
    removeElements("quote", "Modelos do Word");
    removeElements("quote", "Enviar um Link por Email");
    removeElements("quote", "Criar PDF");
    removeElements("quote", "Atribuir");
    removeElements("quote", "Compartilhar");
}
function productPriceLevel(){
        removeElements("productpricelevel", "Salvar");
        removeElements("productpricelevel", "Criar");
        removeElements("productpricelevel", "Fluxo");
        removeElements("productpricelevel", "Processar");
        removeElements("productpricelevel", "Modelos do Word");
        removeElements("productpricelevel", "Enviar um Link por Email");
}
function pricelevel(){
    removeElements("productpricelevel", "Fluxo");
    removeElements("productpricelevel", "Modelos do Word");
    removeElements("productpricelevel", "Enviar um Link por Email");
    removeElements("productpricelevel", "Executar Relatório");
}
function removeElements(entity, action){
    var element = parent.document.querySelector('[data-lp-id="commandbar-Form:'+entity+'"]');
    if(element == null){
        setTimeout(function(){
            window.console.log(element);
            removeElements(entity, action);
        },300);
    }else{
        var temp = element.querySelector('[aria-label="'+action+'"]');
        if(temp != null){
            temp.style= "display:none;";
        }
    }
}
