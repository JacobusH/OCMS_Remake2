function GetXmlHttpObject()
{
	var xmlHttp=null;
	try
	{
		 // Firefox, Opera 8.0+, Safari
		 xmlHttp=new XMLHttpRequest();
	}
	catch (e)
	{
	    //Internet Explorer
		try
		{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}

var xmlHttpc
function RemoteRequestObject()
{
	var A = false;

	try
	{
		A = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch(e)
	{
		try
		{
			A = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch(err)
		{
			A = false;
		}
	}

	if(!A && typeof(XMLHttpRequest) != 'undefined')
		A = new XMLHttpRequest();
	
	return A;
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function validate_currency(ob)
{	   
	var str	   	
	s=ob
	str=""
	bag="0123456789."
	for (v = 0; v < s.length; v++)
	{   
    	c = s.charAt(v)
	    if (bag.indexOf(c) == -1) 
		str=1
	}
	if(str==1)
		return false;
	else
		return true
}

function validateEmail(elementValue){      
   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   return emailPattern.test(elementValue.value);
}

//-------------------------------------------------------------------
// Trim functions
//   Returns string with whitespace trimmed
//-------------------------------------------------------------------
function LTrim(str){
	if (str==null){return null;}
	for(var i=0;str.charAt(i)==" ";i++);
	return str.substring(i,str.length);
}
function RTrim(str){
	if (str==null){return null;}
	for(var i=str.length-1;str.charAt(i)==" ";i--);
	return str.substring(0,i+1);
}
function Trim(str){return LTrim(RTrim(str));}
function LTrimAll(str) {
	if (str==null){return str;}
	for (var i=0; str.charAt(i)==" " || str.charAt(i)=="\n" || str.charAt(i)=="\t"; i++);
	return str.substring(i,str.length);
}
function RTrimAll(str) {
	if (str==null){return str;}
	for (var i=str.length-1; str.charAt(i)==" " || str.charAt(i)=="\n" || str.charAt(i)=="\t"; i--);
	return str.substring(0,i+1);
}
function TrimAll(str) {
	return LTrimAll(RTrimAll(str));
}
//-------------------------------------------------------------------
// isNull(value)
//   Returns true if value is null
//-------------------------------------------------------------------
function isNull(val){return(val==null);}

//-------------------------------------------------------------------
// isBlank(value)
//   Returns true if value only contains spaces
//-------------------------------------------------------------------
function isBlank(val){
	if(val==null){return true;}
	for(var i=0;i<val.length;i++) {
		if ((val.charAt(i)!=' ')&&(val.charAt(i)!="\t")&&(val.charAt(i)!="\n")&&(val.charAt(i)!="\r")){return false;}
	}
	return true;
}

//-------------------------------------------------------------------
// isInteger(value)
//   Returns true if value contains all digits
//-------------------------------------------------------------------
function isInteger(val){
	if (isBlank(val)){return false;}
	for(var i=0;i<val.length;i++){
		if(!isDigit(val.charAt(i))){return false;}
	}
	return true;
}

//-------------------------------------------------------------------
// isNumeric(value)
//   Returns true if value contains a positive float value
//-------------------------------------------------------------------
function isNumeric(val){return(parseFloat(val,10)==(val*1));}

//-------------------------------------------------------------------
// isArray(obj)
// Returns true if the object is an array, else false
//-------------------------------------------------------------------
function isArray(obj){return(typeof(obj.length)=="undefined")?false:true;}

//-------------------------------------------------------------------
// isDigit(value)
//   Returns true if value is a 1-character digit
//-------------------------------------------------------------------
function isDigit(num) {
	if (num.length>1){return false;}
	var string="1234567890";
	if (string.indexOf(num)!=-1){return true;}
	return false;
}

//-------------------------------------------------------------------
// setNullIfBlank(input_object)
//   Sets a form field to "" if it isBlank()
//-------------------------------------------------------------------
function setNullIfBlank(obj){if(isBlank(obj.value)){obj.value="";}}

//-------------------------------------------------------------------
// setFieldsToUpperCase(input_object)
//   Sets value of form field toUpperCase() for all fields passed
//-------------------------------------------------------------------
function setFieldsToUpperCase(){
	for(var i=0;i<arguments.length;i++) {
		arguments[i].value = arguments[i].value.toUpperCase();
	}
}

//-------------------------------------------------------------------
// disallowBlank(input_object[,message[,true]])
//   Checks a form field for a blank value. Optionally alerts if 
//   blank and focuses
//-------------------------------------------------------------------
function disallowBlank(obj){
	var msg=(arguments.length>1)?arguments[1]:"";
	var dofocus=(arguments.length>2)?arguments[2]:false;
	if (isBlank(getInputValue(obj))){
		if(!isBlank(msg)){alert(msg);}
		if(dofocus){
			if (isArray(obj) && (typeof(obj.type)=="undefined")) {obj=obj[0];}
			if(obj.type=="text"||obj.type=="textarea"||obj.type=="password") { obj.select(); }
			obj.focus();
		}
		return true;
	}
	return false;
}

//-------------------------------------------------------------------
// disallowModify(input_object[,message[,true]])
//   Checks a form field for a value different than defaultValue. 
//   Optionally alerts and focuses
//-------------------------------------------------------------------
function disallowModify(obj){
	var msg=(arguments.length>1)?arguments[1]:"";
	var dofocus=(arguments.length>2)?arguments[2]:false;
	if (getInputValue(obj)!=getInputDefaultValue(obj)){
		if(!isBlank(msg)){alert(msg);}
		if(dofocus){
			if (isArray(obj) && (typeof(obj.type)=="undefined")) {obj=obj[0];}
			if(obj.type=="text"||obj.type=="textarea"||obj.type=="password") { obj.select(); }
			obj.focus();
			}
		setInputValue(obj,getInputDefaultValue(obj));
		return true;
	}
	return false;
}

//-------------------------------------------------------------------
// commifyArray(array[,delimiter])
//   Take an array of values and turn it into a comma-separated string
//   Pass an optional second argument to specify a delimiter other than
//   comma.
//-------------------------------------------------------------------
function commifyArray(obj,delimiter){
	if (typeof(delimiter)=="undefined" || delimiter==null) {
		delimiter = ",";
	}
	var s="";
	if(obj==null||obj.length<=0){return s;}
	for(var i=0;i<obj.length;i++){
		s=s+((s=="")?"":delimiter)+obj[i].toString();
	}
	return s;
}

//-------------------------------------------------------------------
// getSingleInputValue(input_object,use_default,delimiter)
//   Utility function used by others
//-------------------------------------------------------------------
function getSingleInputValue(obj,use_default,delimiter) {
	switch(obj.type){
		case 'radio': case 'checkbox': return(((use_default)?obj.defaultChecked:obj.checked)?obj.value:null);
		case 'text': case 'hidden': case 'textarea': return(use_default)?obj.defaultValue:obj.value;
		case 'password': return((use_default)?null:obj.value);
		case 'select-one':
			if (obj.options==null) { return null; }
			if(use_default){
				var o=obj.options;
				for(var i=0;i<o.length;i++){if(o[i].defaultSelected){return o[i].value;}}
				return o[0].value;
				}
			if (obj.selectedIndex<0){return null;}
			return(obj.options.length>0)?obj.options[obj.selectedIndex].value:null;
		case 'select-multiple': 
			if (obj.options==null) { return null; }
			var values=new Array();
			for(var i=0;i<obj.options.length;i++) {
				if((use_default&&obj.options[i].defaultSelected)||(!use_default&&obj.options[i].selected)) {
					values[values.length]=obj.options[i].value;
					}
				}
			return (values.length==0)?null:commifyArray(values,delimiter);
		}
	alert("FATAL ERROR: Field type "+obj.type+" is not supported for this function");
	return null;
}

//-------------------------------------------------------------------
// getSingleInputText(input_object,use_default,delimiter)
//   Utility function used by others
//-------------------------------------------------------------------
function getSingleInputText(obj,use_default,delimiter) {
	switch(obj.type){
		case 'radio': case 'checkbox': 	return "";
		case 'text': case 'hidden': case 'textarea': return(use_default)?obj.defaultValue:obj.value;
		case 'password': return((use_default)?null:obj.value);
		case 'select-one':
			if (obj.options==null) { return null; }
			if(use_default){
				var o=obj.options;
				for(var i=0;i<o.length;i++){if(o[i].defaultSelected){return o[i].text;}}
				return o[0].text;
				}
			if (obj.selectedIndex<0){return null;}
			return(obj.options.length>0)?obj.options[obj.selectedIndex].text:null;
		case 'select-multiple': 
			if (obj.options==null) { return null; }
			var values=new Array();
			for(var i=0;i<obj.options.length;i++) {
				if((use_default&&obj.options[i].defaultSelected)||(!use_default&&obj.options[i].selected)) {
					values[values.length]=obj.options[i].text;
					}
				}
			return (values.length==0)?null:commifyArray(values,delimiter);
		}
	alert("FATAL ERROR: Field type "+obj.type+" is not supported for this function");
	return null;
}

//-------------------------------------------------------------------
// setSingleInputValue(input_object,value)
//   Utility function used by others
//-------------------------------------------------------------------
function setSingleInputValue(obj,value) {
	switch(obj.type){
		case 'radio': case 'checkbox': if(obj.value==value){obj.checked=true;return true;}else{obj.checked=false;return false;}
		case 'text': case 'hidden': case 'textarea': case 'password': obj.value=value;return true;
		case 'select-one': case 'select-multiple': 
			var o=obj.options;
			for(var i=0;i<o.length;i++){
				if(o[i].value==value){o[i].selected=true;}
				else{o[i].selected=false;}
			}
			return true;
		}
	alert("FATAL ERROR: Field type "+obj.type+" is not supported for this function");
	return false;
}

//-------------------------------------------------------------------
// getInputValue(input_object[,delimiter])
//   Get the value of any form input field
//   Multiple-select fields are returned as comma-separated values, or
//   delmited by the optional second argument
//   (Doesn't support input types: button,file,reset,submit)
//-------------------------------------------------------------------
function getInputValue(obj,delimiter) {
	var use_default=(arguments.length>2)?arguments[2]:false;
	if (isArray(obj) && (typeof(obj.type)=="undefined")) {
		var values=new Array();
		for(var i=0;i<obj.length;i++){
			var v=getSingleInputValue(obj[i],use_default,delimiter);
			if(v!=null){values[values.length]=v;}
		}
		return commifyArray(values,delimiter);
	}
	return getSingleInputValue(obj,use_default,delimiter);
}

//-------------------------------------------------------------------
// getInputText(input_object[,delimiter])
//   Get the displayed text of any form input field
//   Multiple-select fields are returned as comma-separated values, or
//   delmited by the optional second argument
//   (Doesn't support input types: button,file,reset,submit)
//-------------------------------------------------------------------
function getInputText(obj,delimiter) {
	var use_default=(arguments.length>2)?arguments[2]:false;
	if (isArray(obj) && (typeof(obj.type)=="undefined")) {
		var values=new Array();
		for(var i=0;i<obj.length;i++){
			var v=getSingleInputText(obj[i],use_default,delimiter);
			if(v!=null){values[values.length]=v;}
		}
		return commifyArray(values,delimiter);
	}
	return getSingleInputText(obj,use_default,delimiter);
}

//-------------------------------------------------------------------
// getInputDefaultValue(input_object[,delimiter])
//   Get the default value of any form input field when it was created
//   Multiple-select fields are returned as comma-separated values, or
//   delmited by the optional second argument
//   (Doesn't support input types: button,file,password,reset,submit)
//-------------------------------------------------------------------
function getInputDefaultValue(obj,delimiter){return getInputValue(obj,delimiter,true);}

//-------------------------------------------------------------------
// isChanged(input_object)
//   Returns true if input object's value has changed since it was
//   created.
//-------------------------------------------------------------------
function isChanged(obj){return(getInputValue(obj)!=getInputDefaultValue(obj));}

//-------------------------------------------------------------------
// setInputValue(obj,value)
//   Set the value of any form field. In cases where no matching value
//   is available (select, radio, etc) then no option will be selected
//   (Doesn't support input types: button,file,password,reset,submit)
//-------------------------------------------------------------------
function setInputValue(obj,value) {
	var use_default=(arguments.length>1)?arguments[1]:false;
	if(isArray(obj)&&(typeof(obj.type)=="undefined")){
		for(var i=0;i<obj.length;i++){setSingleInputValue(obj[i],value);}
	}
	else{setSingleInputValue(obj,value);}
}
	
//-------------------------------------------------------------------
// isFormModified(form_object,hidden_fields,ignore_fields)
//   Check to see if anything in a form has been changed. By default
//   it will check all visible form elements and ignore all hidden 
//   fields. 
//   You can pass a comma-separated list of field names to check in
//   addition to visible fields (for hiddens, etc).
//   You can also pass a comma-separated list of field names to be
//   ignored in the check.
//-------------------------------------------------------------------
function isFormModified(theform,hidden_fields,ignore_fields){
	if(hidden_fields==null){hidden_fields="";}
	if(ignore_fields==null){ignore_fields="";}
	var hiddenFields=new Object();
	var ignoreFields=new Object();
	var i,field;
	var hidden_fields_array=hidden_fields.split(',');
	for (i=0;i<hidden_fields_array.length;i++) {
		hiddenFields[Trim(hidden_fields_array[i])]=true;
	}
	var ignore_fields_array=ignore_fields.split(',');
	for (i=0;i<ignore_fields_array.length;i++) {
		ignoreFields[Trim(ignore_fields_array[i])]=true;
	}
	for (i=0;i<theform.elements.length;i++) {
		var changed=false;
		var name=theform.elements[i].name;
		if(!isBlank(name)){
			var type=theform.elements[i].type;
			if(!ignoreFields[name]){
				if(type=="hidden"&&hiddenFields[name]){changed=isChanged(theform[name]);}
				else if(type=="hidden"){changed=false;}
				else {changed=isChanged(theform[name]);}
				}
			}
		if(changed){return true;}
	}
	return false;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name){
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name){
	createCookie(name,"",-1);
}

function fnValidation(frm){
	var frm = document.forms[frm];
	for(var i=0;i<frm.elements.length;i++){
		if(frm.elements[i].type == "text"){
			if((frm.elements[i].value == '') && (frm.elements[i].title != '') && (!frm.elements[i].disabled)){
				alert("Please enter "+frm.elements[i].title);
				frm.elements[i].focus();
				return false;
			}
		}else if(frm.elements[i].type == "password"){
			if((frm.elements[i].value == '') && (frm.elements[i].title != '') && (!frm.elements[i].disabled)){
				alert("Please enter "+frm.elements[i].title);
				frm.elements[i].focus();
				return false;
			}
		}else if(frm.elements[i].type == "textarea"){
			if((frm.elements[i].value == '') && (frm.elements[i].title != '') && (!frm.elements[i].disabled)){
				alert("Please enter "+frm.elements[i].title);
				frm.elements[i].focus();
				return false;
			}
		}else if(frm.elements[i].type == "select-one"){
			if((frm.elements[i].value == '') && (frm.elements[i].title != '') && (!frm.elements[i].disabled)){
				alert("Please select "+frm.elements[i].title);
				frm.elements[i].focus();
				return false;
			}
		}else if(frm.elements[i].type == "checkbox"){
			if((!frm.elements[i].checked) && (frm.elements[i].title != '') && (!frm.elements[i].disabled)){
				alert("Please check "+frm.elements[i].title);
				frm.elements[i].focus();
				return false;
			}
		}else if(frm.elements[i].type == "radio"){
			var radname = frm.elements[i].name;
			var obj = frm.elements[radname];
			flag=0;var title = '';
			for(var j=0;j<obj.length;j++){
			   if(obj[j].checked==true){
				   flag=1;
			   }else{
				   var title = obj[j].title
			   }
			}
			if((flag==0) && (title != '')){
				alert("Select "+title);
				return false;
			}
		}else if(frm.elements[i].type == "hidden"){
			return true;
		}
	}
	return true;
}

function fnCheckAll(){
	var obj = document.frmView.elements;
	if(document.frmView.checkall.checked==true){
		for(var i=0;i<(obj.length);i++)
		{
			if((obj[i].value != 0) && (obj[i].type == "checkbox")){
				obj[i].checked=true;
			}
		}
	}else if(document.frmView.checkall.checked==false){
		for(var i=0;i<(obj.length);i++)
		{
			if((obj[i].value != 0) && (obj[i].type == "checkbox")){
				obj[i].checked=false;
			}
		}
	}
}

function fnAdd(url,pType){
	document.frmView.pType.value = pType;
	fnSubmit('frmView',url);
}

function fnEdit(url,UID,pType){
	document.frmView.pType.value = pType;
	document.frmView.UID.value = UID;
	fnSubmit('frmView',url);
}

function fnSubmit(frm,url){
	document.forms[frm].action = url;
	document.forms[frm].submit();
}

function fnDelete(url,sType){
	var obj = document.frmView.elements;
	var flag = "";
	for(var i=0;i<(obj.length);i++)
	{
		if((obj[i].checked == true)&&(obj[i].value != 0))
		{
			flag = flag+","+obj[i].value;
		}
	}
	var val = flag.substr(1);
	if(val == ''){
		alert("Please select checkbox to delete");
	}else{
	    if(confirm("Do you want to delete selected rows")){
			document.frmView.sType.value = sType;
			document.frmView.UID.value=val;
			fnSubmit('frmView',url);
		}
	}
}

function fnDel(url,UID,sType){
	if(confirm("Do you want to delete this row")){
		document.frmView.sType.value = sType;
		document.frmView.UID.value = UID;
		fnSubmit('frmView',url);
	}
}

function sort_order(url,sType){
	document.frmView.sType.value = sType;
	fnSubmit('frmView',url);
}

function fnPublish(url,UID,val,sType){
	if(val == '0')
	{
		if(confirm("Do you want to activate this"))
		{
			document.frmView.sType.value = sType;
			document.frmView.UID.value = UID;
			document.frmView.status.value = '1';
			fnSubmit('frmView',url);
		}	
	}else{
		if(confirm("Do you want to deactivate this"))
		{
			document.frmView.sType.value = sType;
			document.frmView.UID.value=UID;
			document.frmView.status.value = '0';
			fnSubmit('frmView',url);
		}
	}
}

function fnPublishAll(url,pval){
	var obj = document.frmView.elements;
	var flag = "";
	for(var i=0;i<(obj.length);i++)
	{
		if((obj[i].checked == true)&&(obj[i].value != 0))
		{
			flag = flag+","+obj[i].value;
		}
	}
	var val = flag.substr(1);
	if(val == ''){
		if(pval == '1'){
			alert("Please select checkbox to publish");
		}else if(pval == '0'){
			alert("Please select checkbox to unpublish");
		}		
	}else{
		if(pval == '1'){
			if(confirm("Do you want to activate this"))
			{
				document.frmView.UID.value = val;
				document.frmView.sType.value = 'Publish';
				document.frmView.status.value = '1';
				fnSubmit('frmView',url);
			}
		}else if(pval == '0'){
			if(confirm("Do you want to deactivate this"))
			{
				document.frmView.UID.value=val;
				document.frmView.sType.value = 'Publish';
				document.frmView.status.value = '0';
				fnSubmit('frmView',url);
			}
		}
	}
}

function fnSections(){
	var obj = document.frmEdit.sections;
	var secs = "";
	for(var i=0;i<(obj.length);i++){ 
		if(obj[i].checked == true){
			document.getElementById('SUB_'+obj[i].value).style.display = '';
			secs = secs+'@@@'+obj[i].value;
		}else if(obj[i].checked == false){
			document.getElementById('SUB_'+obj[i].value).style.display = 'none';
		}
	}
	document.getElementById('mainsections').value = secs.substr(3);
}

function fnCheckAllPermissions(fname){
	if(document.getElementById('All_'+fname).checked == true){
		if(document.getElementById('View_'+fname).value == 'Y'){
			document.getElementById('View_'+fname).checked = true;
		}
		if(document.getElementById('Publish_'+fname).value == 'Y'){
			document.getElementById('Publish_'+fname).disabled = false;
			document.getElementById('Publish_'+fname).checked = true;
		}
		if(document.getElementById('Add_'+fname).value == 'Y'){
			document.getElementById('Add_'+fname).disabled = false;
			document.getElementById('Add_'+fname).checked = true;
		}
		if(document.getElementById('Edit_'+fname).value == 'Y'){
			document.getElementById('Edit_'+fname).disabled = false;
			document.getElementById('Edit_'+fname).checked = true;
		}
		if(document.getElementById('Del_'+fname).value == 'Y'){
			document.getElementById('Del_'+fname).disabled = false;
			document.getElementById('Del_'+fname).checked = true;
		}
	}else if(document.getElementById('All_'+fname).checked == false){
		if(document.getElementById('View_'+fname).value == 'Y'){
			document.getElementById('View_'+fname).checked = false;
		}
		if(document.getElementById('Publish_'+fname).value == 'Y'){
			document.getElementById('Publish_'+fname).disabled = true;
			document.getElementById('Publish_'+fname).checked = false;
		}
		if(document.getElementById('Add_'+fname).value == 'Y'){
			document.getElementById('Add_'+fname).disabled = true;
			document.getElementById('Add_'+fname).checked = false;
		}
		if(document.getElementById('Edit_'+fname).value == 'Y'){
			document.getElementById('Edit_'+fname).disabled = true;
			document.getElementById('Edit_'+fname).checked = false;
		}
		if(document.getElementById('Del_'+fname).value == 'Y'){
			document.getElementById('Del_'+fname).disabled = true;
			document.getElementById('Del_'+fname).checked = false;
		}
	}
}

function fnViewPermissions(fname){
	var VIEW =  document.getElementById('View_'+fname);
	var PUBLISH =  document.getElementById('Publish_'+fname);
	var ADD =  document.getElementById('Add_'+fname);
	var EDIT =  document.getElementById('Edit_'+fname);
	var DEL =  document.getElementById('Del_'+fname);
	if(VIEW.checked == true){
		if(PUBLISH.value == 'Y'){PUBLISH.disabled = false;}
		if(ADD.value == 'Y'){ADD.disabled = false;}		
		if(EDIT.value == 'Y'){EDIT.disabled = false;}
		if(DEL.value == 'Y'){DEL.disabled = false;}
		if((ADD.value == 'N') && (EDIT.value == 'N') && (DEL.value == 'N')){
			document.getElementById('All_'+fname).checked = true;
		}
	}else if(VIEW.checked == false){
		if(PUBLISH.value == 'Y'){PUBLISH.disabled = true;PUBLISH.checked = false;}
		if(ADD.value == 'Y'){ADD.disabled = true;ADD.checked = false;}
		if(EDIT.value == 'Y'){EDIT.disabled = true;EDIT.checked = false;}
		if(DEL.value == 'Y'){DEL.disabled = true;DEL.checked = false;}
		document.getElementById('All_'+fname).checked = false
	}
}

function fnPublishPermissions(fname){
	var VIEW =  document.getElementById('View_'+fname);
	var PUBLISH =  document.getElementById('Publish_'+fname);
	var ADD =  document.getElementById('Add_'+fname);
	var EDIT =  document.getElementById('Edit_'+fname);
	var DEL =  document.getElementById('Del_'+fname);
	var VIEWTF = '';var PUBLISHTF = '';var ADDTF = '';var EDITTF = '';var DELTF = '';
	if(VIEW.value == 'Y'){VIEWTF = true;}else if(VIEW.value == 'N'){VIEWTF = false;}
	if(PUBLISH.value == 'Y'){PUBLISHTF = true;}else if(PUBLISH.value == 'N'){PUBLISHTF = false;}
	if(ADD.value == 'Y'){ADDTF = true;}else if(ADD.value == 'N'){ADDTF = false;}
	if(EDIT.value == 'Y'){EDITTF = true;}else if(EDIT.value == 'N'){EDITTF = false;}
	if(DEL.value == 'Y'){DELTF = true;}else if(DEL.value == 'N'){DELTF = false;}

	if(PUBLISH.checked == true){
		if((VIEW.checked == VIEWTF) && (ADD.checked == ADDTF) && (EDIT.checked == EDITTF) && (DEL.checked == DELTF)){
			document.getElementById('All_'+fname).checked = true;
		}
	}else if(PUBLISH.checked == false){
		document.getElementById('All_'+fname).checked = false;
	}
}

function fnAddPermissions(fname){
	var VIEW =  document.getElementById('View_'+fname);
	var PUBLISH =  document.getElementById('Publish_'+fname);
	var ADD =  document.getElementById('Add_'+fname);
	var EDIT =  document.getElementById('Edit_'+fname);
	var DEL =  document.getElementById('Del_'+fname);
	var VIEWTF = '';var PUBLISHTF = '';var ADDTF = '';var EDITTF = '';var DELTF = '';
	if(VIEW.value == 'Y'){VIEWTF = true;}else if(VIEW.value == 'N'){VIEWTF = false;}
	if(PUBLISH.value == 'Y'){PUBLISHTF = true;}else if(PUBLISH.value == 'N'){PUBLISHTF = false;}
	if(ADD.value == 'Y'){ADDTF = true;}else if(ADD.value == 'N'){ADDTF = false;}
	if(EDIT.value == 'Y'){EDITTF = true;}else if(EDIT.value == 'N'){EDITTF = false;}
	if(DEL.value == 'Y'){DELTF = true;}else if(DEL.value == 'N'){DELTF = false;}

	if(ADD.checked == true){
		if((VIEW.checked == VIEWTF) && (PUBLISH.checked == PUBLISHTF) && (EDIT.checked == EDITTF) && (DEL.checked == DELTF)){
			document.getElementById('All_'+fname).checked = true;
		}
	}else if(ADD.checked == false){
		document.getElementById('All_'+fname).checked = false;
	}
}

function fnEditPermissions(fname){
	var VIEW =  document.getElementById('View_'+fname);
	var PUBLISH =  document.getElementById('Publish_'+fname);
	var ADD =  document.getElementById('Add_'+fname);
	var EDIT =  document.getElementById('Edit_'+fname);
	var DEL =  document.getElementById('Del_'+fname);
	var VIEWTF = '';var PUBLISHTF = '';var ADDTF = '';var EDITTF = '';var DELTF = '';
	if(VIEW.value == 'Y'){VIEWTF = true;}else if(VIEW.value == 'N'){VIEWTF = false;}
	if(PUBLISH.value == 'Y'){PUBLISHTF = true;}else if(PUBLISH.value == 'N'){PUBLISHTF = false;}
	if(ADD.value == 'Y'){ADDTF = true;}else if(ADD.value == 'N'){ADDTF = false;}
	if(EDIT.value == 'Y'){EDITTF = true;}else if(EDIT.value == 'N'){EDITTF = false;}
	if(DEL.value == 'Y'){DELTF = true;}else if(DEL.value == 'N'){DELTF = false;}

	if(EDIT.chucked == true){
		if((VIEW.checked == VIEWTF) && (PUBLISH.checked == PUBLISHTF) && (ADD.checked == ADDTF) && (DEL.checked == DELTF)){
			document.getElementById('All_'+fname).checked = true;
		}
	}else if(EDIT.checked == false){
		document.getElementById('All_'+fname).checked = false;
	}
}

function fnDelPermissions(fname){
	var VIEW =  document.getElementById('View_'+fname);
	var PUBLISH =  document.getElementById('Publish_'+fname);
	var ADD =  document.getElementById('Add_'+fname);
	var EDIT =  document.getElementById('Edit_'+fname);
	var DEL =  document.getElementById('Del_'+fname);
	var VIEWTF = '';var PUBLISHTF = '';var ADDTF = '';var EDITTF = '';var DELTF = '';
	if(VIEW.value == 'Y'){VIEWTF = true;}else if(VIEW.value == 'N'){VIEWTF = false;}
	if(PUBLISH.value == 'Y'){PUBLISHTF = true;}else if(PUBLISH.value == 'N'){PUBLISHTF = false;}
	if(ADD.value == 'Y'){ADDTF = true;}else if(ADD.value == 'N'){ADDTF = false;}
	if(EDIT.value == 'Y'){EDITTF = true;}else if(EDIT.value == 'N'){EDITTF = false;}
	if(DEL.value == 'Y'){DELTF = true;}else if(DEL.value == 'N'){DELTF = false;}

	if(DEL.checked == true){
		if((VIEW.checked == VIEWTF) && (PUBLISH.checked == PUBLISHTF) && (ADD.checked == ADDTF) && (EDIT.checked == EDITTF)){
			document.getElementById('All_'+fname).checked = true;
		}
	}else if(DEL.checked == false){
		document.getElementById('All_'+fname).checked = false;
	}
}

function fnShowAttributeValues(val){
	var att_values = document.getElementById('att_values').value.split('###');
	var att  = document.getElementById('att').value.split('###');
	for(var i=0;i<att.length;i++){
		if(att[i] == val){						
			var att_vals = att_values[i].split(',');
			if(document.getElementById('attribute_'+att[i]).checked == true){
				document.getElementById(att[i]).style.display = '';
				document.getElementById(att[i]+'_OTH').style.display = '';
				for(var j=0;j<att_vals.length;j++){
					document.getElementById(att[i]+'_'+att_vals[j]).style.display = '';
				}
			}else{
				document.getElementById(att[i]).style.display = 'none';
				document.getElementById(att[i]+'_OTH').style.display = 'none';
				for(var j=0;j<att_vals.length;j++){
					document.getElementById(att[i]+'_'+att_vals[j]).style.display = 'none';
				}
			}
		}
	}
}

function fnEnableAttributeValues(val,attid){
	if(document.getElementById('attribute_value_'+val).checked == true){
		if(document.getElementById('sel_att_values').value == ''){
			document.getElementById('sel_att_values').value = attid+','+val;
		}else{
			document.getElementById('sel_att_values').value = document.getElementById('sel_att_values').value+'###'+attid+','+val;
		}
		document.getElementById('part_'+val).disabled = false;
		document.getElementById('prefix_'+val).disabled = false;
		document.getElementById('price_'+val).disabled = false;
		document.getElementById('image_'+val).disabled = false;
		document.getElementById('is_default_'+val).disabled = false;
		document.getElementById('sort_order_'+val).disabled = false;
	}else{
		var sel_att_vals = document.getElementById('sel_att_values').value.split('###');
		var tmp_vals ='';
		for(var i=0;i<sel_att_vals.length;i++){
			if(sel_att_vals[i] != attid+','+val){
				tmp_vals = tmp_vals+'###'+sel_att_vals[i];
			}
		}
		document.getElementById('sel_att_values').value = tmp_vals.substr(3);
		document.getElementById('part_'+val).disabled = true;
		document.getElementById('prefix_'+val).disabled = true;
		document.getElementById('price_'+val).disabled = true;
		document.getElementById('image_'+val).disabled = true;
		document.getElementById('is_default_'+val).disabled = true;
		document.getElementById('sort_order_'+val).disabled = true;
	}
}

function fnpopupwindow(url,width,height){			
	window.open(url,'IMAGE', 'left=250,top=150,width='+width+',height='+height+',toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0');
}

function fnChange(id,id2)
{
	alert(id)
}	