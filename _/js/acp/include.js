//Shows the accessdallas popup, also setting the src of the Iframe in the popup to the src of the page passed
function IFramePopup(pageSrc, headerText, newWidth, newHeight)
{
	setbackground();
	var iframeRef = document.getElementById("PopupBoxIframe");
	var popupRef = document.getElementById("PopupBoxWrapper");
	var popupBodyRef = document.getElementById("PopupBoxBody");
	var popupHeaderSpanRef = document.getElementById("PopupBoxHeaderText");

	
	//set the header text (or title) of the popup box
	popupHeaderSpanRef.innerHTML = headerText;
	
	//set the width and height of the popup element
	popupRef.style.width = newWidth + "px";
	popupRef.style.height = newHeight + "px";
	
	
	//set the height and width of the popupBoxBody (which encapsulates the iframe) and the iframe itself
	// NOTE that I subtract 2px from the with of the iframe to account for the border of the bodyWrapper
	newWidth = newWidth - 2;
	newHeight = newHeight - 2;
	
	iframeRef.width = newWidth + "px";
	iframeRef.height = newHeight + "px";
	iframeRef.style.height = newHeight + "px";
	iframeRef.style.width = newWidth + "px";
	
	popupBodyRef.style.height = newHeight + "px";
	popupBodyRef.style.width = newWidth + "px";
	
	
	//now position the popup to the center of the page
	
	//get the available width and height of the screen 
	//the screen width and height will be dependant on the size of the browser window (which is different depending on which property is available)
	//by default, this will be the screen.availHeight and availWidth
    var availableScreenHeight = screen.availHeight - 125/* an estimate to subtract for the top chrome */;
	var availableScreenWidth = screen.availWidth;
	
	//set the proper width depending on which property is available (this is better cause screen.availWidth) gives you the width of the screen, not browser
	if (window.innerWidth)//this is for Mozilla
	{
		availableScreenWidth = window.innerWidth;
	}
	else if (document.body.offsetWidth)//this is for IE
	{
		availableScreenWidth = document.body.offsetWidth;
	}
	
	//subtract the width and height of the popup element
	availableScreenWidth = availableScreenWidth - newWidth;
	availableScreenHeight = availableScreenHeight - newHeight;
	
	
	//divide the available widht and height (which has the element's widht/height already subtracted) by 2 (half of the screen)
	var popupScreenLeft = availableScreenWidth / 2;
	var popupScreenTop = availableScreenHeight / 2;
	
	//adjust for the scrolling of the body
	var scrollLeft = 0;
	var scrollTop = 0;
	
	
	if (document.documentElement.scrollTop)
		scrollTop = document.documentElement.scrollTop;
	
	if (document.documentElement.scrollLeft)
		scrollLeft = document.documentElement.scrollLeft;
	
	//adjust for scrolling
	popupScreenLeft += scrollLeft;
	popupScreenTop += scrollTop;
	
	//make sure the position is not negative numbers so the element wont be off the screen
	if (popupScreenLeft < 2) popupScreenLeft = 2;
	if (popupScreenTop < 2) popupScreenTop = 2;
	
	//position the popup
	popupRef.style.left = popupScreenLeft + "px";
	popupRef.style.top = popupScreenTop + "px";
	
	//make if visible
	popupRef.style.visibility = "visible";
	
	//set the src of the popup iframe
	iframeRef.src = pageSrc;
	
}//end of IFramePopup

//-->

function hideAccessPopup()
{
	//just in case, remove the event handler for the popup dragging 
	releaseMouseDownDragEventForPopup();
	
	//make the popup div invisible and reposition it off the browser
	document.getElementById("PopupBoxWrapper").style.visibility = "hidden";
	document.getElementById("PopupBoxWrapper").style.left = "-2000px";
    document.getElementById("PopupBoxWrapper").style.top = "-2000px";
    
	//clear the iframe of content
	document.getElementById("PopupBoxIframe").src = "";
	
	setbackground();
}//end of hideAccessDallasPopup

//release drag event for popup
function releaseMouseDownDragEventForPopup(){
   document.body.onmousemove = null;
}


function setbackground(){	
	if(window.innerHeight)//this is for Mozilla
	{
		screenheight = window.innerHeight - 92;
	}else if(document.body.offsetWidth)//this is for IE
	{
		screenheight = document.body.offsetHeight - 92;
	}
	if(document.getElementById('overDiv').style.display == 'none'){
		document.getElementById('overDiv').style.display = '';
		document.getElementById('overDiv').style.height = screenheight+'px';
	}else{
		document.getElementById('overDiv').style.height = '0px';
		document.getElementById("PopupBoxIframe").src = document.getElementById("iframe_src").value;
		document.getElementById('overDiv').style.display = 'none';
	}	
}