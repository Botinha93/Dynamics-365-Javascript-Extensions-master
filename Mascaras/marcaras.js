function fc(){
    var x = Xrm.Page.getAttribute("new_cpfcnpj").getValue().replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    return !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '')
}
Xrm.Page.getAttribute("new_cpfcnpj").setValue(fc())


function CNPJ(executionContext)
{   
    var formContext = executionContext.getFormContext(); 
	 var cnpjcpf = formContext.getAttribute("new_cpfcnpj").getValue();
    if (cnpjcpf != null)
    {  
            var campo = cnpjcpf;
                
                if(campo.length==11)
                {
                    if(ValidaCPF(campo)==false)
                    {
                        alert("CPF inválido"); 
                        formContext.getAttribute("new_cpfcnpj").setValue();
                        
                    }
                    else
                    {   
							campo=campo.replace(/\D/g,"")                    //Remove o que não é dígito
							campo=campo.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca ponto entre o terceiro e o quarto dígitos
							campo=campo.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca ponto entre o terceiro e o quarto dígitos de novo (para o segundo bloco de números)
							campo=campo.replace(/(\d{3})(\d{1,2})$/,"$1-$2") //Coloca hífen entre o terceiro e o quarto dígitos
                            formContext.getAttribute("new_cpfcnpj").setValue(campo);
                    }
                }
			
              
				
                else if(campo.length==14)
                {
                    if(ValidaCNPJ(campo)==false)
                    {
                        alert("CNPJ inválido");
                        formContext.getAttribute("new_cpfcnpj").setValue();
                       // return false; 
                    }
                    else
                    {
							campo=campo.replace(/\D/g,"")                           //Remove o que não é dígito
							campo=campo.replace(/^(\d{2})(\d)/,"$1.$2")             //Coloca ponto entre o segundo e o terceiro dígitos
							campo=campo.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
							campo=campo.replace(/\.(\d{3})(\d)/,".$1/$2")           //Coloca barra entre o oitavo e o nono dígitos
							campo=campo.replace(/(\d{4})(\d)/,"$1-$2") 
							formContext.getAttribute("new_cpfcnpj").setValue(campo);
							
                    }
                }
                else
                {
                    alert("O CNPJ informado é invalido");
                    formContext.getAttribute("new_cpfcnpj").setValue();
                    //return false; 
                }
                
                return true;
            
        
          /*  function cpf(v)
            {debugger;
                v=v.replace(/\D/g,"")                    //Remove o que não é dígito
                v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca ponto entre o terceiro e o quarto dígitos
                v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca ponto entre o terceiro e o quarto dígitos de novo (para o segundo bloco de números)
                v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") //Coloca hífen entre o terceiro e o quarto dígitos
                return v
            }*/
        
           /* function cnpj(v)
            {
                v=v.replace(/\D/g,"")                           //Remove o que não é dígito
                v=v.replace(/^(\d{2})(\d)/,"$1.$2")             //Coloca ponto entre o segundo e o terceiro dígitos
                v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
                v=v.replace(/\.(\d{3})(\d)/,".$1/$2")           //Coloca barra entre o oitavo e o nono dígitos
                v=v.replace(/(\d{4})(\d)/,"$1-$2")              //Coloca hífen depois do bloco de quatro dígitos
                return v
            }*/
            
            function soNumeros(v)
            {
                return v.replace(/\D/g,"")
            }
            
            function ValidaCPF(campo)
            {
                var soma = 0;
                var resultado = 0;
                var digitoVerificador;
        
                for(i = 0;i<9;i++)
                {
                    soma+= parseInt(campo.charAt(i))*(10-i);
                }
             
                resultado = 11 - (soma % 11);
        
                if(resultado==10||resultado==11)
                {
                    resultado = 0;
                }
                
                if(resultado!=campo.charAt(9))
                {
                    return false;
                }
                    
                soma = 0;
             
                for (i = 0; i < 10; i ++)
                {
                   soma += parseInt(campo.charAt(i))*(11-i);
                }
                
                resultado = 11 - (soma % 11);
             
                if (resultado == 10 || resultado == 11)
                {
                    resultado = 0;
                }
                
                if (resultado != parseInt(campo.charAt(10)))
                {
                    return false;
                }
                
                return true;
                
            }

            function ValidaCNPJ(campo)
            {
                var soma = 0;
                var resultado = 0;
                var multiplicador = 5;
        
                for(i = 0;i<12;i++)
                {
                    soma+= parseInt(campo.charAt(i))*multiplicador--;
             
                    if(multiplicador==1)
                    {
                          multiplicador = 9;
                    }
                }
                
                resultado = 11 - (soma % 11);
             
                if(resultado>=10)
                {
                     resultado = 0;
                }
                
                if(resultado!=campo.charAt(12))
                {
                      return false;
                }
                
                soma = 0;
                multiplicador = 6;
                
                for (i = 0; i < 13; i ++)
                {
                    soma += parseInt(campo.charAt(i))*multiplicador--;
               
                    if(multiplicador==1)
                    {
                        multiplicador = 9;
                    }
                }
        
                resultado = 11 - (soma % 11);
        
                if (resultado>=10)
                {
                    resultado = 0;
                }
                
                if (resultado != parseInt(campo.charAt(13)))
                {
                   return false;
                }
        
                return true;
            }     
        
    }
};

function tell(executionContext){
	var formContext = executionContext.getFormContext();
    var oField = formContext.getAttribute("shipto_fax").getValue();
    var telFormatado = "";
    if (oField != null && !oField.includes("+"))
    {
		var sTmp = oField.replace(/[^0-9]/g, "");
		if (sTmp.length > 12){
		    telFormatado = "+"+ sTmp.substr(0, 2) +" (" + sTmp.substr(2, 2) + ") " + sTmp.substr(4, 5) + "-" + sTmp.substr(9);
		    formContext.getAttribute("shipto_fax").setValue(telFormatado);
        }
		else if(sTmp.length == 12){
		    telFormatado =  "+"+ sTmp.substr(0, 2) +" (" + sTmp.substr(2, 2) + ") " + sTmp.substr(4, 4) + "-" + sTmp.substr(8);
		    formContext.getAttribute("shipto_fax").setValue(telFormatado);
	    }else{
            telFormatado =  "+"+ sTmp.substr(0, 2) +" (" + sTmp.substr(2, 4) + ") " + sTmp.substr(5)
			formContext.getAttribute("shipto_fax").setValue(telFormatado);
		}
        Xrm.Page.data.entity.save();
    }
}
function tell2(executionContext){
	var formContext = executionContext.getFormContext();
    var oField = formContext.getAttribute("shipto_telephone").getValue();
    var telFormatado = "";
    if (oField != null && !oField.includes("+"))
    {
		var sTmp = oField.replace(/[^0-9]/g, "");
		if (sTmp.length > 12){
		    telFormatado = "+"+ sTmp.substr(0, 2) +" (" + sTmp.substr(2, 2) + ") " + sTmp.substr(4, 5) + "-" + sTmp.substr(9);
		    formContext.getAttribute("shipto_telephone").setValue(telFormatado);
        }
		else if (sTmp.length == 12){
		    telFormatado =  "+"+ sTmp.substr(0, 2) +" (" + sTmp.substr(2, 2) + ") " + sTmp.substr(4, 4) + "-" + sTmp.substr(8);
		    formContext.getAttribute("shipto_telephone").setValue(telFormatado);
	    }
        else{
            telFormatado =  "+"+ sTmp.substr(0, 2) +" (" + sTmp.substr(2, 2) + ") " + sTmp.substr(4)
			formContext.getAttribute("shipto_telephone").setValue(telFormatado);
		}
        Xrm.Page.data.entity.save();
    }

}

function cep(executionContext)
    
{
    
 var formContext = executionContext.getFormContext();
 var oField = formContext.getAttribute("address1_postalcode").getValue();
 var cepFormatado = "";

 if (oField != null)
 {
 var sTmp = (oField.replace(/[^0-9]/g, '')).substr(0, 8);
 var request = new XMLHttpRequest()

request.open('GET', 'https://viacep.com.br/ws/'+sTmp+'/json/', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    formContext.getAttribute("address1_postalcode").setValue(data.cep);
    formContext.getAttribute("address1_line1").setValue(data.logradouro);
    formContext.getAttribute("new_bairro").setValue(data.bairro);
    formContext.getAttribute("address1_city").setValue(data.localidade);
    formContext.getAttribute("address1_stateorprovince").setValue(data.uf);
    formContext.getAttribute("address1_country").setValue("Brasil");
    }
}

 request.send()

  }
 
 }


 function cepcotacao(executionContext)
{  
 var formContext = executionContext.getFormContext();
 var oField = formContext.getAttribute("new_endereoprincipalcep").getValue();
 var cepFormatado = "";

 if (oField != null)
 {
 var sTmp = (oField.replace(/[^0-9]/g, '')).substr(0, 8);
 var request = new XMLHttpRequest()

request.open('GET', 'https://viacep.com.br/ws/'+sTmp+'/json/', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && data.cep != null) {
    formContext.getAttribute("new_endereoprincipalcep").setValue(data.cep);
    formContext.getAttribute("new_endereoprincipalrua").setValue(data.logradouro);
    formContext.getAttribute("new_endereoprincipalbairro").setValue(data.bairro);
    formContext.getAttribute("new_endereoprincipalcidade").setValue(data.localidade);
    formContext.getAttribute("new_endereoprincipaluf").setValue(data.uf);
    }
}

 request.send()

  }
 
 }
