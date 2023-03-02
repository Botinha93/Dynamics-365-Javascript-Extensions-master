function atalhos(executionContext){
    var formContext = executionContext.getFormContext(); 
    var canPerform = true;
    window.parent.document.onkeyup = function(e) {
        if (e.ctrlKey && e.altKey && e.which == 83 && canPerform) {
            formContext.data.entity.save("saveandnew");
            canPerform = false;
            if(formContext.data.entity.getIsDirty()){
                var confirmStrings = { text:"Tem certeza que deseja iniciar um novo fomulario?", title:"Não foi possivel salvar!" };
                var confirmOptions = { height: 200, width: 450 };
                    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
                    function (success) {    
                        if (success.confirmed){
                            var entityFormOptions = { entityName: formContext.data.entity.getEntityName() };
                            Xrm.Navigation.openForm(entityFormOptions).then(
                            function (success) {
                                canPerform = true;
                            },
                            function (error) {
                                console.log(error);
                            });
                        }else
                            console.log("Dialog closed using Cancel button or X.");
                    });
            }
        }
        if (e.ctrlKey && e.altKey && e.which == 78) {
            var confirmStrings = { text:"Abrir novo formulario para: "+formContext.data.entity.getEntityName()+"? Nenhuma alteração será salva na entidade atual!" , title:"Novo Formulario "+formContext.data.entity.getEntityName() };
                var confirmOptions = { height: 200, width: 450 };
                    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
                    function (success) {    
                        if (success.confirmed){
                            var entityFormOptions = { entityName: formContext.data.entity.getEntityName() };
                            Xrm.Navigation.openForm(entityFormOptions).then(
                            function (success) {
                                canPerform = true;
                            },
                            function (error) {
                                console.log(error);
                            });
                        }else
                            console.log("Dialog closed using Cancel button or X.");
                    });
        }
    }
}



