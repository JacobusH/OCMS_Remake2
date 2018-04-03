<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Admin Control Panel</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link href="<?=base_url().'styles/acp/css.css'?>" rel="stylesheet" type="text/css"/></link>
<link href="<?=base_url().'styles/acp/colorPicker.css'?>" rel="stylesheet" type="text/css"/></link>
<link href="<?=base_url().'styles/acp/spiffyCal_v2_1.css'?>" rel="stylesheet" type="text/css"/></link>
<link href="<?=base_url().'styles/acp/dhtmlwindow.css'?>" rel="stylesheet" type="text/css"/></link>
<link href="<?=base_url().'styles/acp/styles.css'?>" rel="stylesheet" type="text/css"/></link>

<script language="javascript" type="text/javascript" src="<?=base_url().'js/acp/switchcontent.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?=base_url().'js/acp/switchicon.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?=base_url().'js/acp/switchmenu.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?=base_url().'js/acp/switch.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?=base_url().'js/acp/sdmenu.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?=base_url().'js/acp/validation.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?=base_url().'js/acp/include.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?=base_url().'js/acp/ajax.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?=base_url().'js/acp/colorPicker.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?=base_url().'js/acp/spiffyCal_v2_1.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?=base_url().'js/acp/dhtmlwindow.js'?>"></script>
<script language="javascript" type="text/javascript" src="<?=base_url().'js/acp/wz_tooltip.js'?>"></script>

<script type="text/javascript">
var persistmenu="yes" //"yes" or "no". Make sure each SPAN content contains an incrementing ID starting at 1 (id="sub1", id="sub2", etc)
var persisttype="sitewide" //enter "sitewide" for menu to persist across site, "local" for this page only

if(document.getElementById){ //DynamicDrive.com change
	document.write('<style type="text/css">\n')
	document.write('.submenu{display: none;}\n')
	document.write('</style>\n')
}
if (window.addEventListener)
	window.addEventListener("load", onloadfunction, false)
else if (window.attachEvent)
	window.attachEvent("onload", onloadfunction)
else if (document.getElementById)
	window.onload=onloadfunction

if(persistmenu=="YES" && document.getElementById)
	window.onunload=savemenustate
</script>

</head>
<body oncontextmenu="return false;">

<div class=text id="spiffycalendar"></div>
<div id="container">
<!-- HEADER STARTS HERE -->
<div class="header" id="header">
	<div class="headergradient" id="headergradient">
		<a href="javascript:;" class="logo" id="logo"></a>
		<h3>Control Panel</h3>
	</div>
</div>
<!-- HEADER ENDS HERE -->

<!-- TOP NAVIGATION STARTS HERE -->

<div class="innertabs"><?=$actions?></div>

<!-- TOP NAVIGATION ENDS HERE -->

<!-- DHTML POPUP STARTS HERE -->
<div id="overDiv" style="display: none; z-index: 10; filter: alpha(opacity=15); left: 0px; float: left; width: 100%; line-height: 20px; position: absolute; height: 100%; background-color: #000000; text-align: center; moz-opacity: .15; opacity: .15;"></div>
<div id="PopupBoxWrapper">
	<div class="MainContentBoxHeaderTab" id="PopupBoxHeader">
		<div class="left"></div>
		<span id="PopupBoxHeaderText"></span>
		<div onmousedown="hideAccessPopup()" id="PopupBoxCloseButton" title="Click to close"><img alt="close" src="<?=base_url().'images/acp/close.gif'?>" /></div>
		<div class="right"></div>
   </div>
   <div id="PopupBoxBody">
		<iframe id="PopupBoxIframe" name="PopupBoxIframe" src="about:blank" frameBorder="0"></iframe>
		<input type="hidden" name="iframe_src" id="iframe_src" value="<?=base_url().'images/acp/loading.gif'?>">
   </div>
   <div class="bottom">
	 <div class="bottomleft"></div>
	 <span class="middle"></span>
	 <div class="bottomright"></div>
   </div>
</div>
<div id="MainContentWrapper"></div>
<!-- DHTML POPUP ENDS HERE -->

<!-- BODY STARTS HERE -->
<div id="bodypart">