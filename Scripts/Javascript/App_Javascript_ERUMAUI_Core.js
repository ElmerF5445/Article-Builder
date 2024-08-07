/*
    Core functions
*/

function Element_Attribute_Set(ID, Attribute, Value){
    document.getElementById(ID).setAttribute(Attribute, Value);
}

function Element_Attribute_Remove(ID, Attribute){
    document.getElementById(ID).removeAttribute(Attribute);
}

function Element_Attribute_Get(ID, Attribute){
	return document.getElementById(ID).getAttribute(Attribute);
}

function Element_Opacity_Set(ID, Opacity){
    if (Opacity >= 0 && Opacity <= 100){
        document.getElementById(ID).style.opacity = Opacity + "%";
    }
}

function Element_Style_Animate(ElementID, Animation_Name, Animation_Duration, Animation_FillMode){
	document.getElementById(ElementID).style.animationName = Animation_Name;
	document.getElementById(ElementID).style.animationDuration = Animation_Duration;
	document.getElementById(ElementID).style.animationFillMode = Animation_FillMode;
}

function Element_Style_Animate_OnFinish_Display(ElementID, Animation_Name, Animation_Duration, Animation_FillMode, OnFinish_Display){
	document.getElementById(ElementID).style.animationName = Animation_Name;
	document.getElementById(ElementID).style.animationDuration = Animation_Duration;
	document.getElementById(ElementID).style.animationFillMode = Animation_FillMode;
	document.getElementById(ElementID).addEventListener("animationend", () => {
		Element_Style_Display(ElementID, OnFinish_Display);
	})
}

function Element_Style_Animate_Batch_QuerySelector(QuerySelector, Animation_Name, Animation_Duration, Animation_FillMode, Animation_Iteration, Animation_Delay){
	var Element_Delay = 0;
	var Element_QuerySelector = document.querySelectorAll(QuerySelector);
	for (a = 0; a < Element_QuerySelector.length; a++){
		Element_QuerySelector[a].style.animationName = Animation_Name;
		Element_QuerySelector[a].style.animationDuration = Animation_Duration;
		Element_QuerySelector[a].style.animationFillMode = Animation_FillMode;
		Element_QuerySelector[a].style.animationIterationCount = Animation_Iteration;
		Element_Delay += Animation_Delay;
		if (Animation_Delay != 0){
			Element_QuerySelector[a].style.animationDelay = Element_Delay + "ms";
		} else {
			Element_QuerySelector[a].style.animationDelay = "0s";
		}
		
	}
}

function Element_Style_Display(ElementID, ElementDisplay){
	document.getElementById(ElementID).style.display = ElementDisplay;
}

function Page_ChangePage(URL){
	window.location = URL;
}