export class ExecutionContext{
    /**
     * Returns a value that indicates the order in which this handler is executed.
     * @returns {number} : Number - The order in which this handler is executed. The order begins with 0.
     */
    getDepth() : Number{
        return 0;
    }
    /**
     * Returns an object with methods to manage the Save event.
     * When the form OnSave event occurs, you can use the getEventArgs method of the execution context object to retrieve an object that contains methods you can use to manage the save event.
     * @returns {object} : Object
     */
    getEventArgs() : SaveEventArguments{
        return ;
    }
    /**
     * Returns a reference to the object that the event occurred on.
     * @returns {object} : Object Returns the object from the Xrm object model that is the source of the event, not an HTML DOM object. For example, in an OnChange event, this method returns the formContext.data.entity attribute object that represents the changed attribute.
     */
    getEventSource() : Attibute | Entity{
        return;
    }
    /**
     * Returns a reference to the form or an item on the form depending on where the method was called.
     * @returns {object} : Object - Returns a reference to the form or an item on the form such as editable grid depending on where the method was called. This method enables you to create common event handlers that can operate either on a form or an item on the form depending on where its called.
     * @tutorial https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext/getformcontext
     * 
     */
    getFormContext() : FormContext {
        return;
    }
    /**
     * Retrieves a variable set using the setSharedVariable method.
     * @param key : String - The name of the variable
     * @returns : Object - The specific type depends on what the value object is.
     */
    getSharedVariable(key : String) : Object{
        return {};
    }
    /**
     * Sets the value of a variable to be used by a handler after the current handler completes.
     * @param key : String - The name of the variable
     * @param value : Object - The values to set
     */
    setSharedVariable(key : String, value : Object){

    }

}
class FormContext{

    getAttribute(attribute:String):Attibute{
        return;
    }
    data = new Data();
    getControl(attribute:String):Control{
        return;
    }
    
}
class Data{
    entity = new Entity();
    process = new Process();
    addOnLoad(){};
    getIsDirty():Boolean{return};
    isValid():Boolean{return};
    refresh(value:String) :Promise<any> {}
    removeOnLoad(){};
    save(saveOptions:Object) :Promise<any> {}
}
class Attibute{
    /**
     * Sets a function to be called when the OnChange event occurs.
     * @param onChange : Function - Specifies the function to be executed on the attribute OnChange event. The execution context is automatically passed as the first parameter to this function.
     */
    addOnChange(onChange : Function) {
    }
    /**
     * Causes the OnChange event to occur on the attribute so that any script associated to that event can execute.
     */
    fireOnChange(){}
    /**
     * Returns a string value that represents the type of attribute.
     * @returns {String} : String - This method will return one of the following string values: 
    *boolean, 
    *datetime, 
    *decimal, 
    *double, 
    *integer, 
    *lookup, 
    *memo, 
    *money, 
    *multiselectoptionset, 
    *optionset, 
    *string 

     */
    getAttributeType() : String{
        var any;
        return any;
    }
    /**
     * Returns a string value that represents formatting options for the attribute.
     * @returns {string} : String This method will return one of the following string values or "null":

    date, 
    datetime, 
    duration, 
    email, 
    language, 
    none, 
    phone, 
    text, 
    textarea, 
    tickersymbol, 
    timezone, 
    url, 

     */
    getFormat() : String{
        return "";
    }
    /**
     * Returns a value that represents the value set for a Boolean, OptionSet or MultiSelectOptionSet attribute when the form is opened.
     * @returns {number} : Number - The initial value for the attribute
     */
    getInitialValue() : Number{
        return 0;
    }
    /**
     * Returns a Boolean value indicating if there are unsaved changes to the attribute value.
     * @returns {boolean} : Boolean - True if there are unsaved changes, otherwise false.
     */
    getIsDirty() : Boolean{
        return false;
    }
    /**
     * Returns a Boolean value indicating whether the lookup represents a partylist lookup. Partylist lookups allow for multiple records to be set, such as the To: field for an email entity record.
     * @returns {boolean} : Boolean - True if the lookup attribute is a partylist, otherwise false.
     */
    getIsPartyList() : Boolean{
        return false;
    }
    /**
     * Returns a number indicating the maximum allowed value for an attribute.
     * @returns {number} : Number - The maximum allowed value for the attribute.
     */
    getMax() : Number{
        return 0;
    }
    getMaxLength(){

    }
    getMin():Number{}
    getName():String{}
    getOption(): Option{}
    getOptions() : Option[]{}
    getParent() : Entity{}
    getPrecision() : Number{}
    getRequiredLevel() : String{}
    getSelectedOption():Option{}
    getSubmitMode():String{}
    getText():String{}
    getUserPrivilege() : Object{
        return ;
    }
    getValue(): any{}
    isValid() : Boolean{}
    removeOnChange(onChange : Function){}
    setIsValid(IsValid:Boolean, message:String){}
    setPrecision(value:Number){}
    setRequiredLevel(requirementLevel:String){}
    setSubmitMode(mode:String){}
    setValue(value){}
}
class Control{
    setDisabled(value:Boolean){

    }
    setVisible(value:Boolean){

    }
    getGrid() : Grid{
        return 
    }
}
class Grid{
    getTotalRecordCount() : Number{return}
    getRows() : Map <Number,FormContext> {return}
    getSelectedRows() : FormContext {return}
}
class SaveEventArguments{
    /**
     * Returns a value indicating how the save event was initiated by the user.
     * @returns {number} : Number - 1 	Save 	All
    *, 2 	Save and Close 	All
    *, 5 	Deactivate 	All
    *, 6 	Reactivate 	All
    *, 7 	Send 	Email
    *, 15 	Disqualify 	Lead
    *, 16 	Qualify 	Lead
    *, 47 	Assign 	User or Team owned entities
    *, 58 	Save as Completed 	Activities
    *, 59 	Save and New 	All
    *, 70 	Auto Save 	All
    *@tutorial https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/save-event-arguments/getsavemode
     */
    getSaveMode() : Number{
        var teste : Number;
        return teste;
    }
    /**
     * Returns a value indicating whether the save event has been canceled because the preventDefault method was used in this event hander or a previous event handler.
     *@returns {boolean} : Boolean true if the save event has been canceled because the preventDefault method was used; false otherwise.
     *@tutorial https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/save-event-arguments/isdefaultprevented
     */
    isDefaultPrevented() : Boolean{
        return false;
    }
    /**
     * Cancels the save operation, but all remaining handlers for the event will still be executed.
     * @tutorial https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/save-event-arguments/preventdefault
     */
    preventDefault (){

    }
}

function UpdateDoalar(executionContext)
{
    
    var formContext = executionContext.getFormContext(); 
    var gridContext = formContext.getControl("quotedetailsGrid");
    var rows = gridContext.getGrid().getRows();
    var dolar = formContext.getAttribute("cr8e2_cotaomoeda").getValue();
    for (let index = 0; index < rows.getleng; index++) {
        rows.get(index).getAttribute("cr8e2_dolarvalor").setValue(dolar);
        var BRL = rows.get(index).getAttribute("priceperunity").getValue() * dolar;
        rows.get(index).getAttribute("cr8e2_brlunidade").setValue(BRL);
        rows.get(index).data.save();
    }
}