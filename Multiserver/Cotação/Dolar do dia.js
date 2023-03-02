function CalcCambio(executionContext)
{
    var formContext = executionContext.getFormContext(); 
    var date = new Date();
    var formateddate = (date.getMonth()+1) + "-" + date.getDate() + "-" + date.getFullYear();
    var formateddateStart;
    var new_variocambial = formContext.getAttribute("new_variocambial").getValue();
    var moeda = "none";
    if(new_variocambial == 100000002){
    	moeda = "EUR";
    }else if(new_variocambial == 100000001){
    	moeda = "USD";
    }
    if(date.getMonth()==0 ){
        formateddateStart = "12-01-" + (date.getFullYear() - 1) 
    }else{
        formateddateStart = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear();
    }
    var req = new XMLHttpRequest();
		req.open("GET", "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodoFechamento(codigoMoeda=@codigoMoeda,dataInicialCotacao=@dataInicialCotacao,dataFinalCotacao=@dataFinalCotacao)?@codigoMoeda='"+ moeda +"'&@dataInicialCotacao='"+ formateddateStart +"'&@dataFinalCotacao='" + formateddate + "'&$format=json" , true);
		req.setRequestHeader("OData-MaxVersion", "4.0");
		req.setRequestHeader("OData-Version", "4.0");
		req.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
		req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		req.onreadystatechange = function() {
			if (this.readyState === 4) {
				req.onreadystatechange = null;
				if (this.status === 200) {
                    var results = JSON.parse(this.response);
                    var moeda =  Math.round(results.value[0].cotacaoVenda * 10) / 10;
                    console.log(moeda)
                    formContext.getAttribute("new_valordavariao").setValue(moeda);
                }
            }
        }
        req.send()
}