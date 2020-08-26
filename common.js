function setCookie(name, value, expires) { 
  if (!expires) expires=1000*60*60*24*365*5;
  path="/";
  domain=document.domain;
  secure=false;
  var today = new Date(); 
  today.setTime( today.getTime() ); 
  var expires_date = new Date( today.getTime() + (expires) ); 
  document.cookie = name + "=" +escape( value ) + 
          ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + //expires.toGMTString() 
          ( ( path ) ? ";path=" + path : "" ) + 
          ( ( domain ) ? ";domain=" + domain : "" ) + 
          ( ( secure ) ? ";secure" : "" ); 
} 

function getCookie( name ) {
  var nameOfCookie = name + "=";
  var x = 0;
  while ( x <= document.cookie.length ) {
    var y = (x+nameOfCookie.length);
    if ( document.cookie.substring( x, y ) == nameOfCookie ) {
      if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
         endOfCookie = document.cookie.length;
      return unescape( document.cookie.substring( y, endOfCookie ) );
    }
    x = document.cookie.indexOf( " ", x ) + 1;
    if ( x == 0 ) break;
  }
  return "";
}

function _getid(id){
	return document.getElementById(id);
}

function trim(str) {
	if (!str || !str.replace) str='';
  	return str.replace(/^\s*|\s*$/g,"");
}

function html_entity_encode(str){
	if (!str || !str.replace) str='';
  str = str.replace(/&/gi, "&amp;");
  str = str.replace(/>/gi, "&gt;");
  str = str.replace(/</gi, "&lt;");
  str = str.replace(/\"/gi, "&quot;");
  str = str.replace(/\'/gi, "&#039;");
  return str;
}

function shortstring(s,len){
	if (!s) s='';
	if (s.length > len) s=s.substr(0,len)+"...";
	return s;
}

function cutstringmiddle(s,len,left,right){
	if (!s) s='';
	if (s.length <= len) return s;			
	var s1,s2;	
	s1=s.substr(0,left);
	s2=s.substr(s.length-right,s.length);	
	return s1+'.....'+s2;
}


function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
function getWindowWidth(){
    var windowWidth = 0;
    if (typeof(window.innerWidth) == 'number'){
        windowWidth = window.innerWidth;
    }else{
        var ieStrict = document.documentElement.clientWidth;
        var ieQuirks = document.body.clientWidth; 
        windowWidth = (ieStrict > 0) ? ieStrict : ieQuirks;
    }
	if(!windowWidth) windowWidth=0;
    return windowWidth;
}
function getWindowHeight(){
    var windowHeight = 0;
    if (typeof(window.innerHeight) == 'number'){
        windowHeight = window.innerHeight;
    }else{
        var ieStrict = document.documentElement.clientHeight; 
        var ieQuirks = document.body.clientHeight;
        windowHeight = (ieStrict > 0) ? ieStrict : ieQuirks;
    }
	if(!windowHeight) windowHeight=0;
    return windowHeight;
}
function getScrollLeft(){
    var scrollLeft;
	if(document.body && document.body.scrollLeft){
		scrollLeft = document.body.scrollLeft;
	}else if(document.documentElement && document.documentElement.scrollLeft){
		scrollLeft = document.documentElement.scrollLeft;
	}
	if(!scrollLeft) scrollLeft=0;
    return scrollLeft;
}
function getScrollTop(){
    var scrollTop;
	if(document.body && document.body.scrollTop){
		scrollTop = document.body.scrollTop;
	}else if(document.documentElement && document.documentElement.scrollTop){
		scrollTop = document.documentElement.scrollTop;
	}
	if(!scrollTop) scrollTop=0;
    return scrollTop;
} 

var messagetimer=null;
function show_message(s,x,y,padding,timeout,fkind){
	if (!x) x=10;
	if (!y) y=10;
	if (!padding) padding=5;
	if (!timeout) timeout=2000;

	var kind=1;
	for(var i=1; i <= 4; i++){
		var s1="layer_message";
		if (i>1) s1="layer_message"+i;
		var obj=document.getElementById(s1);
		if (obj){
			kind=i;
			break;
		}
	}
			
	obj.style.left="1px";
	obj.style.top="1px";		
	obj.innerHTML="<label>"+s+"</label>";
	obj.style.display="";	
	if(fkind) kind=fkind;
	
	if (kind==1) {
		x=getScrollLeft()+x;	
		y=getScrollTop()+y;
	} else if (kind==2) {
		x=getScrollLeft()+((getWindowWidth()-obj.clientWidth) / 2);
		y=getScrollTop()+((getWindowHeight()-obj.clientHeight) / 2);
	} else if (kind==3) {
		x=document.body.offsetWidth-obj.clientWidth-5;
		y=getScrollTop()+y;
	} else {
		x=getScrollLeft()+((getWindowWidth()-obj.clientWidth) / 2);
		y=getScrollTop()+y;
	}
	x=parseInt(x);
	y=parseInt(y);
	
	obj.style["border"]="1px solid #000000";
	obj.style["padding"]=padding+"px";
	obj.style.left=x+"px";
	obj.style.top=y+"px";
	
	if (messagetimer) clearTimeout(messagetimer);
	messagetimer=setTimeout(hide_message, timeout);
}
function hide_message(){
	for(var i=1; i <= 4; i++){
		var s1="layer_message";
		if (i>1) s1="layer_message"+i;
		var obj=document.getElementById(s1);
		if (obj){
			obj.style.display="none";
		}
	}
}


function setstorage(name,value){
	if (window.localStorage){
		localStorage[name]=value+'';
	}else{
		//setCookie(name, value, 1000*60*60*24*365*10); 
	}
}

function getstorage(name){
	var s;
	if (window.localStorage){
		s=localStorage[name];
	}else{
		//s=getCookie(name);
	}
	return s;
}

function fillnumber(s){
	s=String(s);
	if ( s.length==1 ) { 
		return '0'+s;  
	}
	return s;
}	
function datetimetostring(ts){
	var t=new Date(ts);
	var s='';
	if(!isNaN(t)){
		var y=t.getFullYear();
		var m=t.getMonth()+1;
		var d=t.getDate();
		s=y+'-'+fillnumber(m)+'-'+fillnumber(d)+' '+fillnumber(t.getHours())+':'+fillnumber(t.getMinutes())+':'+fillnumber(t.getSeconds());
	}
	return s;
}

var gformats=[["pdf","application/pdf"],["gif","image/gif"],["jpg","image/jpeg"],["jpeg","image/jpeg"],["tif","image/tiff"],["tiff","image/tiff"],["png","image/png"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
["htm","text/html"],["html","text/html"],["txt","text/plain"],["text","text/plain"],["odt","application/vnd.oasis.opendocument.text"],
["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["odp","application/vnd.oasis.opendocument.presentation"],
["xls","application/vnd.ms-excel"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["csv","text/csv"],["tsv","text/tab-separated-values"]];
function getmimetype(s){
	var arr=(s || '').split(".");
	var ext=arr[arr.length-1].toLowerCase();
	for(var i=0; i <= gformats.length-1; i++){
		if(gformats[i][0]==ext){
			return gformats[i][1];
		}
	}
}

var supportlanguage = new Array("af","sq","ar","hy","az","eu","be","bg","ca","zh-CN","hr","cs","da","nl","en","et","tl","fi","fr","gl","ka","de","el","ht","iw","hi","hu","is","id","ga","it","ja","ko","lv","lt","mk","ms","mt","no","fa","pl","pt","ro","ru","sr","sk","sl","es","sw","sv","th","tr","uk","ur","vi","cy","yi");
var supportlanguage2 = new Array("Afrikaans","Albanian","Arabic","Armenian","Azerbaijani","Basque","Belarusian","Bulgarian","Catalan","Chinese","Croatian","Czech","Danish",
		"Dutch","English","Estonian","Filipino","Finnish","French","Galician","Georgian","German","Greek","Haitian Creole","Hebrew","Hindi","Hungarian","Icelandic","Indonesian","Irish","Italian","Japanese","Korean","Latvian","Lithuanian","Macedonian","Malay","Maltese","Norwegian","Persian","Polish","Portuguese","Romanian","Russian","Serbian","Slovak","Slovenian","Spanish","Swahili","Swedish","Thai","Turkish","Ukrainian","Urdu","Vietnamese","Welsh","Yiddish");
function check_lang(s){
	for(i = 0; i < supportlanguage.length; i++){
		if(supportlanguage[i]==s){
			return true;
		}
	}
}


function proc_saveopt(){
	var b=[];
	var c;
	var obj=_getid("optcontainer");
	var a=obj.getElementsByTagName('INPUT');
	for(var i = 0; i < a.length; i++){    
		if(a[i].type=='checkbox'){
			c={};
			c.name=a[i].name;
			c.type=a[i].type;
			c.checked=a[i].checked;
			b.push(c);
		}else if(a[i].type=='text' || a[i].type=='password'){
			c={};
			c.name=a[i].name;
			c.type=a[i].type;
			c.value=a[i].value || '';
			if(a[i].name=='o_pass_value' && !document.optcontainer['o_pass_keep'].checked) c.value='';
			b.push(c);
		}
	}
	var a=obj.getElementsByTagName('SELECT');
	for(var i = 0; i < a.length; i++){    
		if(a[i].form && a[i].form.name){
			c={};
			c.name=a[i].name;
			c.type='select';
			c.value=a[i].value || '';
			b.push(c);
		}
	}

	if(window.JSON) setstorage('c_opt',JSON.stringify(b));
}
function proc_loadopt(){
	var s=getstorage('c_opt');
	var b=[];
	try{
		b=JSON.parse(s);
	}catch(err){
		b=[];
	}
	if(!b) b=[];

	var c;
	for(var i = 0; i < b.length; i++){    
		if(b[i].type=='checkbox'){
			c=document.optcontainer[b[i].name];
			if(c) c.checked=b[i].checked;
		}else if(b[i].type=='select' || b[i].type=='text' || b[i].type=='password'){
			c=document.optcontainer[b[i].name];
			if(c) c.value=b[i].value;
		}
	}
	var a=_getid("optcontainer").getElementsByTagName('*');
	for(var i = 0; i < a.length; i++){    
		if(a[i].tagName=='SELECT'){
			a[i].onchange=proc_saveopt;
		}else if(a[i].tagName=='INPUT'){
			if(a[i].type=='checkbox') a[i].onclick=proc_saveopt;
			else if(a[i].type=='text' || a[i].type=='password') a[i].onchange=proc_saveopt;
		}
	}
}


function proc_show(name){
	var a=_getid(name);
	if(!a)return;
	if(a.style.display=='') a.style.display='none';
	else a.style.display='';
}
function f_switchlog(id,f){
	for(var i = 1; i <= 7; i++){
		var a=_getid("log"+i);
		if(a) a.style.display='none';
	}
	var a=_getid("log"+id);
	a.style.display='';

	var a=_getid("logtab").getElementsByTagName('A');
	for(var i = 0; i < a.length; i++){    
		a[i].style.fontWeight="normal";
	}
	f.style.fontWeight="bold";
	return false;
}
function f_clearlog(){
	for(var i = 1; i <= 7; i++){
		if(i==5)continue;
		var a=_getid("log"+i);
		if(a){
			if(i==4) a.value='';
			else a.innerHTML='';
		}
	}
}

var iserror;
function proc_log(name,s,state,s2){
	function go(name){
		var obj=_getid(name);
		var a=document.createElement("div");
		a.setAttribute('style','display:block;');
		if(!state) state='';
		var s3='<font class="'+state+'">'+henc(s)+'</font>';
		if(s2) s3+=' '+s2;
		a.innerHTML=s3;		
		obj.appendChild(a);  
		obj.scrollTop=obj.scrollHeight;
	}
	go(name);
	if(state=='error'){
		iserror=true;
		//go('log3');
	}
}
function getsize(fileSize){
	if(!fileSize) return 'Unknown';
	function humanFileSize(bytes){
		var thresh = 1024;
		if(bytes < thresh) return bytes + ' B';
		var units = ['kB','MB','GB','TB','PB','EB','ZB','YB'];
		var u = -1;
		do {
			bytes /= thresh;
			++u;
		} while(bytes >= thresh);
		return bytes.toFixed(1)+' '+units[u];
	}
	return humanFileSize(fileSize);
}					

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}