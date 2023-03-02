function criaprodutolista(executionContext)
{
	var formContext = executionContext.getFormContext(); 
	var gridContext = formContext.getControl("Produto"); // get the grid context
    var confirmStrings = { text:"Deseja importar os produtos da lista?", title:"Nova lista de produtos selecionada" };
	var confirmOptions = { height: 200, width: 450 };
	var desconto = formContext.getAttribute("new_descontodaconta").getValue();
	desconto = (desconto/100);
    if(!!formContext.getAttribute("pricelevelid").getValue())
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {    
            if (success.confirmed){
                
     var idcotacao = formContext.data.entity.getId();
	 var id = idcotacao.substring(1,idcotacao.length - 1);
     var lista = formContext.getAttribute("pricelevelid").getValue()[0].id;
 
	 if(lista)
	{
		var req = new XMLHttpRequest();
		req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/productpricelevels?$select=amount,_productid_value,productnumber,_uomid_value&$filter=_pricelevelid_value eq '" + lista + "'", true);
		req.setRequestHeader("OData-MaxVersion", "4.0");
		req.setRequestHeader("OData-Version", "4.0");
		req.setRequestHeader("Accept", "application/json");
		req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
		req.onreadystatechange = function() {
			if (this.readyState === 4) {
				req.onreadystatechange = null;
				if (this.status === 200) {
					var results = JSON.parse(this.response);
					for (var i = 0; i < results.value.length; i++) {
						var amount = results.value[i]["amount"];
						var amount_formatted = results.value[i]["amount@OData.Community.Display.V1.FormattedValue"];
						var productid_value = results.value[i]["_productid_value"];
						var productid_value_formatted = results.value[i]["_productid_value@OData.Community.Display.V1.FormattedValue"];
						var productid_value_lookuplogicalname = results.value[i]["_productid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
						var productnumber = results.value[i]["productnumber"];
						var uomid_value = results.value[i]["_uomid_value"];
						var uomid_value_formatted = results.value[i]["_uomid_value@OData.Community.Display.V1.FormattedValue"];
						var uomid_value_lookuplogicalname = results.value[i]["_uomid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
						var entity = {};
						entity["productid@odata.bind"] = "/products("+productid_value+")";
						entity.productname = productid_value_formatted;
						entity.new_codigodoproduto = productnumber;
						entity["uomid@odata.bind"] = "/uoms("+uomid_value+")";
						entity.priceperunit = Number(parseFloat(amount).toFixed(2));
						entity["quoteid@odata.bind"] = "/quotes("+id+")";
						entity.quantity = 1;
						var valortotal = (parseFloat(desconto)*entity.priceperunit)
						entity.manualdiscountamount = Number(parseFloat(valortotal).toFixed(2));
						window.console.log(amount_formatted)
						te(amount,productid_value,productid_value_formatted,productnumber,uomid_value,entity,idcotacao,id,desconto);
						
					}
				} else {
					Xrm.Utility.alertDialog(this.statusText);
				}
			}
		};
		req.send();
		gridContext.refresh();
		formContext.data.refresh();
		formContext.data.entity.save();
    }
    }else
        console.log("Dialog closed using Cancel button or X.");
	});

}
function te(amount,productid_value,productid_value_formatted,productnumber,uomid_value,entity,idcotacao,id,desconto)
{	

			var entity = {};
			entity["productid@odata.bind"] = "/products("+productid_value+")";
			entity.productname = productid_value_formatted;
			entity.new_codigodoproduto = productnumber;
			entity["uomid@odata.bind"] = "/uoms("+uomid_value+")";
			entity.priceperunit = Number(parseFloat(amount).toFixed(2));
			entity["quoteid@odata.bind"] = "/quotes("+id+")";
			entity.quantity = 1;
			var valortotal = (parseFloat(desconto)*entity.priceperunit)
			entity.manualdiscountamount = Number(parseFloat(valortotal).toFixed(2));

		var req = new XMLHttpRequest();
		req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/quotedetails", true);
		req.setRequestHeader("OData-MaxVersion", "4.0");
		req.setRequestHeader("OData-Version", "4.0");
		req.setRequestHeader("Accept", "application/json");
		req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		req.onreadystatechange = function() {
			if (this.readyState === 4) {
				req.onreadystatechange = null;
				if (this.status === 204) {
					var uri = this.getResponseHeader("OData-EntityId");
					var regExp = /\(([^)]+)\)/;
					var matches = regExp.exec(uri);
					var newEntityId = matches[1];
				} else {
					Xrm.Utility.alertDialog(this.statusText);
				}
			}
		};
		req.send(JSON.stringify(entity));
		
}