/// <reference path="xrm.ts" />   


function preFilterLookup() {    
    Xrm.Page.getControl("parentcontactid").addPreSearch(function () {
    addLookupFilter();
  });
}

function addLookupFilter() {
   var account = Xrm.Page.getAttribute("parentaccountid").getValue();
   var accountID = account[0].id;
   var accountName = account[0].name;

   if (account != null) {
       fetchXml = "<filter type='and'><filter type='or'><condition attribute='parentcustomerid' operator='eq' uiname='" + accountName + "' uitype='account' value='" + accountID + "' /> <condition entityname='new_contact_account' attribute='accountid' operator='eq' value='" + accountID + "' />  </filter></filter>";
       Xrm.Page.getControl("parentcontactid").addCustomFilter(fetchXml);
   }
} 

function preFilterLookup() {    
    Xrm.Page.getControl("parentcontactid").addPreSearch(function () {
        var account = Xrm.Page.getAttribute("parentaccountid").getValue();
        var accountID = account[0].id;
        var accountName = account[0].name;
    
        if (account != null) {
            
            fetchXml = "<fetch><entity name='contact' ><link-entity name='new_contact_account' from='contactid' to='contactid'  link-type='outer'/>"+
            "<filter type='or'><condition attribute='parentcustomerid' operator='eq' value='" + accountID + "' uiname='" + accountName + "' uitype='account' /> "+
            "<condition entityname='new_contact_account' attribute='accountid' operator='eq' value='" + accountID + "' />"
            +" </filter> </entity></fetch>";
            viewXML = "<grid name='resultset' object='2' jump='fullname' select='1' icon='1' preview='1' >  <row name='result' id='contactid' >    <cell name='fullname' width='300' />    <cell name='parentcustomerid' width='150' />    <cell name='address1_city' width='100' />    <cell name='address1_telephone1' width='125' />    <cell name='telephone1' width='125' />    <cell name='emailaddress1' width='200' />  </row></grid>"
            Xrm.Page.getControl("parentcontactid").addCustomView("00000000-0000-0000-0000-000000000001", "contact", "contact", fetchXml, viewXML, true)
        }
    });
 }
