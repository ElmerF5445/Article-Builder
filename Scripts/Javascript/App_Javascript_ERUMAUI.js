function LoadingScreen_Hide(){
    Element_Opacity_Set("LoadingScreen", 0);
    Element_Attribute_Set("LoadingScreen", "State", "Disabled");
}

function LoadingScreen_Show(){
    Element_Opacity_Set("LoadingScreen", 100);
	Element_Attribute_Set("LoadingScreen", "State", "Enabled");
}

function Header_Toggle_PageNavigation(){
    if (Element_Attribute_Get("Header_PageNavigation_Menu", "State") == "Inactive"){
        // Element_Style_Display("Header_PageNavigation_Menu", "grid");
		Element_Attribute_Set("Header_PageNavigation_Menu", "State", "Active");
        Element_Style_Animate("Header_PageNavigation_Menu", "Overlays_Menu_Open", "0.3s", "forwards");
		Element_Style_Animate_Batch_QuerySelector(".Header_PageNavigation_Menu_Content", "Overlays_Menu_Content_Open", "0.3s", "forwards", "1", 50);
		Element_Style_Animate_Batch_QuerySelector(".Header_PageNavigation_Menu_Button_Item", "Overlays_Menu_Content_Open", "0.3s", "forwards", "1", 50);
    } else if (Element_Attribute_Get("Header_PageNavigation_Menu", "State") == "Active"){
        Element_Style_Animate("Header_PageNavigation_Menu", "Overlays_Menu_Close", "0.3s", "forwards");
		// Element_Attribute_Set("Header_PageNavigation_Menu", "State", "Inactive");
		Element_Style_Animate_Batch_QuerySelector(".Header_PageNavigation_Menu_Content", "Overlays_Menu_Content_Close", "0.3s", "forwards", "1", 0);
        setTimeout(function(){Element_Attribute_Set("Header_PageNavigation_Menu", "State", "Inactive");}, 300);
    }
}

function Header_Toggle_StatusTray(){
    if (Element_Attribute_Get("Header_StatusTray_Menu", "State") == "Inactive"){
        // Element_Style_Display("Header_StatusTray_Menu", "grid");
		Element_Attribute_Set("Header_StatusTray_Menu", "State", "Active");
        Element_Style_Animate("Header_StatusTray_Menu", "Overlays_Menu_Open", "0.3s", "forwards");
		Element_Style_Animate_Batch_QuerySelector(".Header_StatusTray_Menu_Content", "Overlays_Menu_Content_Open", "0.3s", "forwards", "1", 50);
		Element_Style_Animate_Batch_QuerySelector(".Header_PageNavigation_Menu_Button_Item", "Overlays_Menu_Content_Open", "0.3s", "forwards", "1", 50);
    } else if (Element_Attribute_Get("Header_StatusTray_Menu", "State") == "Active"){
        Element_Style_Animate("Header_StatusTray_Menu", "Overlays_Menu_Close", "0.3s", "forwards");
		Element_Style_Animate_Batch_QuerySelector(".Header_StatusTray_Menu_Content", "Overlays_Menu_Content_Close", "0.3s", "forwards", "1", 0);
        setTimeout(function(){Element_Attribute_Set("Header_StatusTray_Menu", "State", "Inactive");}, 300);
    }
}

function ClockScreen_Toggle(){
	if (Element_Attribute_Get("ClockScreen", "State") == "Inactive"){
		Element_Attribute_Set("ClockScreen", "State", "Active");
		Element_Style_Display("ClockScreen", "grid");
		Element_Style_Animate("ClockScreen", "ClockScreen_Open", "0.5s", "forwards");
	} else if (Element_Attribute_Get("ClockScreen", "State") == "Active"){
		Element_Attribute_Set("ClockScreen", "State", "Inactive");
		Element_Style_Animate("ClockScreen", "ClockScreen_Close", "0.5s", "forwards");
		setTimeout(function() {
			Element_Style_Display("ClockScreen", "none");
		}, 500);
	}
}

function Sidebar_Toggle(){
    var Sidebar_State = Element_Attribute_Get("Sidebar", "State");
	if (Sidebar_State == "Collapsed" || Sidebar_State == "Collapsed_Hide"){
        Element_Attribute_Set("Sidebar", "State", "Expanded");
		if (App_Property.Sidebar.PushContentWhenExpanded == true){
			Element_Attribute_Set("MainContent_Container", "Style_PusherActive", "Active");
			Element_Attribute_Set("MainContent_Container_Pusher", "State", "Active");
		}
	} else if (Sidebar_State == "Expanded"){
		Element_Attribute_Set("Sidebar", "State", "Collapsed");
		if (App_Property.Sidebar.HideWhenCollapsed == true){
			Element_Attribute_Set("Sidebar", "State", "Collapsed_Hide");
		}
		if (App_Property.Sidebar.PushContentWhenExpanded == true){
			Element_Attribute_Remove("MainContent_Container", "Style_PusherActive");
			Element_Attribute_Remove("MainContent_Container_Pusher", "State");
		}
	}
}


var pageProperty_enableRibbon;

function Tabs_DisplayFirstPage(){
	Tabs_ChangeTab_Specific(0, "Sidebar");
}


var Tabs_Direction_Target_SelectorContainer;
var Tabs_Direction_Target_SelectorContainer_Children;
var Tabs_Direction_Target_SelectorContainer_Children_Clickable = [];
var Tabs_Direction_Target_SelectorContainer_Children_Clickable_Selected;
var Tabs_Direction_Target_SelectorContainer_Children_Clickable_Selected_Element;

function Tabs_ChangeTab_Specific(TabIndex, TargetSelector){
	Tabs_Direction_Target_SelectorContainer_Children_Clickable = [];
	Tabs_Direction_Target_SelectorContainer = document.getElementById(TargetSelector);
	Tabs_Direction_Target_SelectorContainer_Children = Tabs_Direction_Target_SelectorContainer.children;
	for (a = 0; a < Tabs_Direction_Target_SelectorContainer_Children.length; a++){
		if (Tabs_Direction_Target_SelectorContainer_Children[a].getAttribute("onclick") != null){
			Tabs_Direction_Target_SelectorContainer_Children_Clickable.push(Tabs_Direction_Target_SelectorContainer_Children[a]);
		}
	}
	Tabs_Direction_Target_SelectorContainer_Children_Clickable_Selected_Element = Tabs_Direction_Target_SelectorContainer_Children_Clickable[TabIndex];
	Tabs_Direction_Target_SelectorContainer_Children_Clickable_Selected_Element.click();

}

function Tabs_ChangeTab_Direction(Direction, TargetSelector){
	Tabs_Direction_Target_SelectorContainer_Children_Clickable = [];
	Tabs_Direction_Target_SelectorContainer = document.getElementById(TargetSelector);
	Tabs_Direction_Target_SelectorContainer_Children = Tabs_Direction_Target_SelectorContainer.children;
	for (a = 0; a < Tabs_Direction_Target_SelectorContainer_Children.length; a++){
		if (Tabs_Direction_Target_SelectorContainer_Children[a].getAttribute("onclick") != null){
			Tabs_Direction_Target_SelectorContainer_Children_Clickable.push(Tabs_Direction_Target_SelectorContainer_Children[a]);
		}
	}
	for (a = 0; a < Tabs_Direction_Target_SelectorContainer_Children_Clickable.length; a++){
		if (Tabs_Direction_Target_SelectorContainer_Children_Clickable[a].hasAttribute("State")){
			Tabs_Direction_Target_SelectorContainer_Children_Clickable_Selected = Tabs_Direction_Target_SelectorContainer_Children_Clickable.indexOf(Tabs_Direction_Target_SelectorContainer_Children_Clickable[a]);
			break;
		}
	}
	if (Direction == "Forwards"){
		Tabs_Direction_Target_SelectorContainer_Children_Clickable_Selected_Element = Tabs_Direction_Target_SelectorContainer_Children_Clickable[(Tabs_Direction_Target_SelectorContainer_Children_Clickable_Selected + 1) % Tabs_Direction_Target_SelectorContainer_Children_Clickable.length];

		Tabs_Direction_Target_SelectorContainer_Children_Clickable_Selected_Element.click();

	} else if (Direction == "Backwards") {
		Tabs_Direction_Target_SelectorContainer_Children_Clickable_Selected_Element = Tabs_Direction_Target_SelectorContainer_Children_Clickable[(Tabs_Direction_Target_SelectorContainer_Children_Clickable_Selected - 1 + Tabs_Direction_Target_SelectorContainer_Children_Clickable.length) % Tabs_Direction_Target_SelectorContainer_Children_Clickable.length];

		Tabs_Direction_Target_SelectorContainer_Children_Clickable_Selected_Element.click();

	}
	
}

var Tabs_Button_ID;
var Tabs_Button_TabTitle;
var Tabs_Button_Target_Container;
var Tabs_Button_Target_Tab;
var Tabs_Button_Parent;

var Tabs_Target_Container;
var Tabs_Target_Container_CurrentTab;
var Tabs_Target_Container_TabList = [];
var Tabs_Target_Container_TabList_ID = [];
var Tabs_Target_Container_TabList_ID_Index_CurrentTab;
var Tabs_Target_Container_TabList_ID_Index_TargetTab;
var Tabs_MainView_OriginalState;
function Tabs_ChangeTab(ButtonID, Layout){
	Tabs_Target_Container_TabList = [];
	Tabs_Target_Container_TabList_ID = [];
	/* Button properties */
	Tabs_Button_ID = ButtonID;
	Tabs_Button_TabTitle = document.getElementById(Tabs_Button_ID).getAttribute("Tabs_Tab_Title");
	Tabs_Button_Target_Container = document.getElementById(Tabs_Button_ID).getAttribute("Tabs_Tab_Target_Container");
	Tabs_Button_Target_Tab = document.getElementById(Tabs_Button_ID).getAttribute("Tabs_Tab_Target_Tab");
	Tabs_Button_Parent = document.getElementById(Tabs_Button_ID).parentNode;

	/* Target container properties */
	Tabs_Target_Container = document.getElementById(Tabs_Button_Target_Container);
	Tabs_Target_Container_CurrentTab = Tabs_Target_Container.getAttribute("Tabs_CurrentTab");
	Tabs_Target_Container_TabList = Array.from(Tabs_Target_Container.children);
	for (a = 0; a < Tabs_Target_Container_TabList.length; a++){
		Tabs_Target_Container_TabList_ID[a] = Tabs_Target_Container_TabList[a].getAttribute("id");
	}
	if (Tabs_Target_Container_CurrentTab == ""){
		Tabs_Target_Container_CurrentTab = Tabs_Target_Container_TabList_ID[0];
		for (a = 1; a < Tabs_Target_Container_TabList_ID.length; a++){
			// document.getElementById(Tabs_Target_Container_TabList_ID[a]).style.visibility = "hidden";
			document.getElementById(Tabs_Target_Container_TabList_ID[a]).style.display = "none";
		}
	}

	/* Selector buttons state */
	// Resets State value for each item in the selection container
	for (a = 0; a < Tabs_Button_Parent.children.length; a++){
		Tabs_Button_Parent.children[a].removeAttribute("State");
	}
	// Makes the clicked button the active item in the selection container
	document.getElementById(Tabs_Button_ID).setAttribute("State", "Selected");

	/* Tab switching */
	Tabs_Target_Container_TabList_ID_Index_CurrentTab = Tabs_Target_Container_TabList_ID.indexOf(Tabs_Target_Container_CurrentTab);
	Tabs_Target_Container_TabList_ID_Index_TargetTab = Tabs_Target_Container_TabList_ID.indexOf(Tabs_Button_Target_Tab);
	if (Tabs_Button_Target_Tab != Tabs_Target_Container_CurrentTab){
		document.getElementById(Tabs_Button_Target_Tab).style.display = "block";
		document.getElementById(Tabs_Button_Target_Tab).style.opacity = "0%";
		if (Tabs_Target_Container_TabList_ID_Index_TargetTab < Tabs_Target_Container_TabList_ID_Index_CurrentTab){
			// If the target tab is less than / on the left side of the current tab
			if (Layout == "Vertical"){
				document.getElementById(Tabs_Button_Target_Tab).setAttribute("Tabs_Transition", "NewTab_Upwards");
				document.getElementById(Tabs_Target_Container_CurrentTab).setAttribute("Tabs_Transition", "CurrentTab_Upwards");
			} else if (Layout == "Horizontal"){
				document.getElementById(Tabs_Button_Target_Tab).setAttribute("Tabs_Transition", "NewTab_Left");
				document.getElementById(Tabs_Target_Container_CurrentTab).setAttribute("Tabs_Transition", "CurrentTab_Left");
			}
		} else if (Tabs_Target_Container_TabList_ID_Index_TargetTab > Tabs_Target_Container_TabList_ID_Index_CurrentTab){
			// If the target tab is greater than / on the right side of the current tab
			if (Layout == "Vertical"){
				document.getElementById(Tabs_Button_Target_Tab).setAttribute("Tabs_Transition", "NewTab_Downwards");
				document.getElementById(Tabs_Target_Container_CurrentTab).setAttribute("Tabs_Transition", "CurrentTab_Downwards");
			} else if (Layout == "Horizontal"){
				document.getElementById(Tabs_Button_Target_Tab).setAttribute("Tabs_Transition", "NewTab_Right");
				document.getElementById(Tabs_Target_Container_CurrentTab).setAttribute("Tabs_Transition", "CurrentTab_Right");
			}
			
		}
		document.getElementById(Tabs_Target_Container_CurrentTab).onanimationend = () => {
			
			document.getElementById(Tabs_Target_Container_CurrentTab).onanimationend = null;
			for (a = 0; a < Tabs_Target_Container_TabList_ID.length; a++){
				document.getElementById(Tabs_Target_Container_TabList_ID[a]).removeAttribute("Tabs_Transition");
				document.getElementById(Tabs_Target_Container_CurrentTab).style.display = "none";
			}
			
			document.getElementById(Tabs_Button_Target_Tab).style.opacity = "100%";
			if (Tabs_Target_Container_CurrentTab != Tabs_Button_Target_Tab){
				document.getElementById(Tabs_Target_Container_CurrentTab).style.display = "none";
			}
		};
	}
	if (document.getElementById(Tabs_Button_ID).getAttribute("Tabs_UseRibbon") == "true"){
		var Tabs_Tab_Target_Ribbon = document.getElementById(Tabs_Button_ID).getAttribute("Tabs_Tab_Target_Ribbon");
		var Tabs_Tab_Target_Ribbon_Parent = Array.from(document.getElementById(Tabs_Tab_Target_Ribbon).parentNode.children);
		for (a = 0; a < Tabs_Tab_Target_Ribbon_Parent.length; a++){
			Tabs_Tab_Target_Ribbon_Parent[a].setAttribute("style", "display: none;");
		}
		document.getElementById(Tabs_Tab_Target_Ribbon).style.display = "flex";
		Ribbon_Toggle("Enable");
	} else if (document.getElementById(Tabs_Button_ID).getAttribute("Tabs_UseRibbon") == "hide"){
		Ribbon_Toggle("Disable");
	}
	if (document.getElementById(Tabs_Button_ID).getAttribute("Tabs_UseHeaderTitle") == "true"){
		document.getElementById("pageElement_Header_Title").innerHTML = Tabs_Button_TabTitle;
	}
	if (App_Property != null || App_Property != undefined){
		if (Element_Attribute_Get(Tabs_Button_ID, "Tabs_UseFullContainer") == null){
			
		} else if (Element_Attribute_Get(Tabs_Button_ID, "Tabs_UseFullContainer") == "true"){
			App_Property.Page.MainView.UseFullContainer = true;
			Startup_Page_ApplyConfigurations("QuickChange", "ContainerOnly");
		} else if (Element_Attribute_Get(Tabs_Button_ID, "Tabs_UseFullContainer") == "false"){
			App_Property.Page.MainView.UseFullContainer = false;
			Startup_Page_ApplyConfigurations("QuickChange", "ContainerOnly");
		}
		
	}
	
	Tabs_Target_Container.setAttribute("Tabs_CurrentTab", Tabs_Button_Target_Tab);
}

function Ribbon_Toggle(State){
	if (State == "Enable"){
		if (pageProperty_enableRibbon == 1){
            Element_Attribute_Set("MainContent", "Style_Margin_Ribbon", "Enabled");
            Element_Style_Display("Ribbon", "flex");
			// document.getElementById("pageElement_Content").style.height = "calc(100% - 80px)";
			// document.getElementById("pageElement_Content").style.marginTop = "85px";
			// document.getElementById("pageElement_Ribbon").style.display = "flex";
			// if (pageProperty_lockSidebar == 1){
			// 	document.getElementById("pageElement_Ribbon").style.marginLeft = "0px";
			// 	document.getElementById("pageElement_Ribbon").style.width = "100%";
			// }
		} else {
            Element_Attribute_Set("MainContent", "Style_Margin_Ribbon", "Disabled");
			// document.getElementById("pageElement_Content").style.height = "calc(100% - 50px)";
			// document.getElementById("pageElement_Content").style.marginTop = "50px";
		}
	} else if (State == "Disable"){
        Element_Attribute_Set("MainContent", "Style_Margin_Ribbon", "Disabled");
        Element_Style_Display("Ribbon", "none");
		// document.getElementById("pageElement_Ribbon").style.display = "none";
		// document.getElementById("pageElement_Content").style.height = "calc(100% - 50px)";
		// document.getElementById("pageElement_Content").style.marginTop = "50px";
	}
}

function Accordion_Toggle(ID){
    var Accordion_State = document.getElementById(ID).querySelector(".Accordion_Content").getAttribute("State");
    if (Accordion_State == "Collapsed"){
        document.getElementById(ID).setAttribute("State", "Expanded");
        document.getElementById(ID).querySelector(".Accordion_Title_Arrow").setAttribute("State", "Expanded");
        document.getElementById(ID).querySelector(".Accordion_Content").setAttribute("State", "Expanded");
        document.getElementById(ID).querySelector(".Accordion_Content").style.animationName = "Accordion_Open";
        document.getElementById(ID).querySelector(".Accordion_Content").style.animationDuration = "0.3s";
        document.getElementById(ID).querySelector(".Accordion_Content").style.animationFillMode = "forwards";
        document.getElementById(ID).querySelector(".Accordion_Content").style.animationTimingFunction = "ease-out";
    } else if (Accordion_State == "Expanded"){
        document.getElementById(ID).setAttribute("State", "Collapsed");
        document.getElementById(ID).querySelector(".Accordion_Title_Arrow").setAttribute("State", "Collapsed");
        document.getElementById(ID).querySelector(".Accordion_Content").setAttribute("State", "Collapsed");
        document.getElementById(ID).querySelector(".Accordion_Content").style.animationName = "Accordion_Close";
        document.getElementById(ID).querySelector(".Accordion_Content").style.animationDuration = "0.3s";
        document.getElementById(ID).querySelector(".Accordion_Content").style.animationFillMode = "forwards";
        document.getElementById(ID).querySelector(".Accordion_Content").style.animationTimingFunction = "ease-in-out";
    }
}

var Dropdown_TargetList;
var Dropdown_List;
var Dropdown_List_Items;
var Dropdown_Button;
var Dropdown_Button_State;
function Dropdown_ToggleList(ID){
	Dropdown_Button = document.getElementById(ID);
	Dropdown_Button_State = Dropdown_Button.getAttribute("State");
	Dropdown_TargetList = Dropdown_Button.getAttribute("Dropdown_TargetList");
	if (Dropdown_Button_State == "Inactive"){
		Dropdown_Button.setAttribute("State", "Active");
		Dropdown_List = document.getElementById(Dropdown_TargetList);
		Element_Style_Display(Dropdown_TargetList, "block");
		Element_Style_Animate(Dropdown_TargetList, "Dropdown_List_Open", "0.3s", "forwards");
		Element_Style_Animate_OnFinish_Display(Dropdown_TargetList, "Dropdown_List_Open", "0.3s", "forwards", "block");
		Dropdown_List_Items = Dropdown_List.querySelectorAll(".Dropdown_List_Item");
		for (a = 0; a < Dropdown_List_Items.length; a++){
			Dropdown_List_Items[a].style.animationName = "Dropdown_List_Items_Open";
			Dropdown_List_Items[a].style.animationDuration = "0.3s";
			Dropdown_List_Items[a].style.animationFillMode = "forwards";
		}
	} else if (Dropdown_Button_State == "Active"){
		Dropdown_Button.setAttribute("State", "Inactive");
		Dropdown_List = document.getElementById(Dropdown_TargetList);
		Element_Style_Animate_OnFinish_Display(Dropdown_TargetList, "Dropdown_List_Close", "0.3s", "forwards", "none");
		Dropdown_List_Items = Dropdown_List.querySelectorAll(".Dropdown_List_Item");
		for (a = 0; a < Dropdown_List_Items.length; a++){
			Dropdown_List_Items[a].style.animationName = "Dropdown_List_Items_Close";
			Dropdown_List_Items[a].style.animationDuration = "0.3s";
			Dropdown_List_Items[a].style.animationFillMode = "forwards";
		}
	}
}

var Dropdown_TargetButton;
function Dropdown_SubmitValue(ParentNode, InnerText){
	Dropdown_TargetButton = ParentNode.getAttribute("Dropdown_TargetButton");
	document.getElementById(Dropdown_TargetButton).querySelector(".Dropdown_Button_Text").innerText = InnerText;
	document.getElementById(Dropdown_TargetButton).click();
}

function Buttons_Toggle(ID){
	var Button_Element = document.getElementById(ID);
	if (Button_Element.getAttribute("State") == "Active"){
		Button_Element.setAttribute("State","Inactive");
	} else if (Button_Element.getAttribute("State") == "Inactive"){
		Button_Element.setAttribute("State","Active");
	} else if (Button_Element.getAttribute("State") == null){
		Button_Element.setAttribute("State","Active");
	}
}

function Radio_Select(ID){
	var Radio_Button_Element = document.getElementById(ID);
	var Radio_Button_Parent_Element = document.getElementById(ID).parentNode;
	var Radio_Button_Parent_Children_Elements = Radio_Button_Parent_Element.children;
	for (a = 0; a < Radio_Button_Parent_Children_Elements.length; a++){
		Radio_Button_Parent_Children_Elements[a].setAttribute("State", "Inactive");
	}	
	Radio_Button_Parent_Element.setAttribute("Radio_ActiveButton", ID);
	Radio_Button_Element.setAttribute("State", "Active");
}


var Subwindows_ActiveSubwindows = [];
var Subwindows_CurrentlyActiveSubwindow;
function Subwindows_Open(ID){
	if (Subwindows_ActiveSubwindows.length <= 0){
		Element_Attribute_Set("Subwindows", "State", "Active");
		Element_Style_Animate("Subwindows", "Subwindow_MainContainer_Open", "0.3s", "forwards");
	}
	Subwindows_ActiveSubwindows.push(ID);
	Element_Attribute_Set(ID, "Visibility", "Open");
	Element_Style_Animate(ID, "Subwindow_Open", "0.3s", "forwards");
	for(a = 0; a < Subwindows_ActiveSubwindows.length - 1; a++){
		Element_Attribute_Set(Subwindows_ActiveSubwindows[a], "State", "Inactive");
	}
	Element_Attribute_Set(ID, "State", "Active");
	document.getElementById(ID).style.zIndex = Subwindows_ActiveSubwindows.length;
	Subwindows_CurrentlyActiveSubwindow = Subwindows_ActiveSubwindows[Subwindows_ActiveSubwindows.length - 1];
}

function Subwindows_Close(ID){
	Subwindows_ActiveSubwindows.splice(Subwindows_ActiveSubwindows.indexOf(ID), 1);
	Element_Style_Animate(ID, "Subwindow_Close", "0.3s", "forwards");
	setTimeout(function(){
		Element_Attribute_Remove(ID, "State");
		Element_Attribute_Remove(ID, "Visibility");
	}, 300);	
	if (Subwindows_ActiveSubwindows.length > 0){
		for(a = 0; a < Subwindows_ActiveSubwindows.length - 1; a++){
			Element_Attribute_Set(Subwindows_ActiveSubwindows[a], "State", "Inactive");
		}
		Element_Attribute_Set(Subwindows_ActiveSubwindows[Subwindows_ActiveSubwindows.length - 1], "State", "Active");
	} else if (Subwindows_ActiveSubwindows.length <= 0){
		Element_Style_Animate("Subwindows", "Subwindow_MainContainer_Close", "0.3s", "forwards");
		setTimeout(function(){
			Element_Attribute_Remove("Subwindows", "State");
		}, 300);	
	}
	Subwindows_CurrentlyActiveSubwindow = Subwindows_ActiveSubwindows[Subwindows_ActiveSubwindows.length - 1];
}


var Toasts_TotalCount = 1;
function Toasts_CreateToast(Toast_IconLink, Toast_Title_Text, Toast_Content_Text){
	var Toast_Div = document.createElement('div');
	Toast_Div.className = "Toast";
	Toast_Div.setAttribute("id", "Toast_" + Toasts_TotalCount);
	Toast_Div.setAttribute("onclick", "Toasts_CloseToast(this.id)");
	Toast_Div.style.animationName = "Toast_Open";
	Toast_Div.style.animationDuration = "0.3s";
	Toast_Div.style.animationFillMode = "forwards";
	setTimeout(function(){
		Toast_Div.style.animationName = "Toast_Close";
		Toast_Div.style.animationDuration = "0.3s";
		Toast_Div.style.animationFillMode = "forwards";
		setTimeout(function(){
			Toast_Div.style.display = "none";
		}, 300);
	}, 3000);
	document.getElementById("Toasts").appendChild(Toast_Div);


	var Toast_Icon = document.createElement('img');
	Toast_Icon.className = "Toast_Icon";
	Toast_Icon.src = Toast_IconLink;

	var Toast_Title = document.createElement('h2');
	Toast_Title.className = "Toast_Title";
	Toast_Title.innerHTML = Toast_Title_Text;
	
	var Toast_Content = document.createElement('p');
	Toast_Content.className = "Toast_Content";
	Toast_Content.innerHTML = Toast_Content_Text;
	document.getElementById("Toast_" + Toasts_TotalCount).appendChild(Toast_Icon);
	document.getElementById("Toast_" + Toasts_TotalCount).appendChild(Toast_Title);
	document.getElementById("Toast_" + Toasts_TotalCount).appendChild(Toast_Content);
	Toasts_TotalCount++;
}

function Toasts_CloseToast(ID){
	var Toast_Div = document.getElementById(ID);
	Toast_Div.style.animationName = "Toast_Close";
	Toast_Div.style.animationDuration = "0.3s";
	Toast_Div.style.animationFillMode = "forwards";
	setTimeout(function(){
		Toast_Div.style.display = "none";
	}, 300);
}

let TextAreas = document.querySelectorAll(".Input_Text_Long");
TextAreas.forEach(TextArea_Element => {
	if (TextArea_Element.getAttribute("Autoresize") == "true"){
		TextArea_Element.addEventListener('input', function(){
			this.style.height = 'auto';
			this.style.height = ((this.scrollHeight) - 20) + 'px';
		});
	}
});

function TextArea_SnapToSize_All(){
	TextAreas = document.querySelectorAll(".Input_Text_Long");
	TextAreas.forEach(TextArea_Element => {
		if (TextArea_Element.getAttribute("Autoresize") == "true"){
			TextArea_Element.style.height = 'auto';
			TextArea_Element.style.height = ((TextArea_Element.scrollHeight) - 20) + 'px';
		}
	});
}

function TextArea_SnapToSize(ID){
	TextAreas = document.getElementById(ID);
	if (TextAreas.getAttribute("Autoresize") == "true"){
		TextAreas.style.height = 'auto';
		TextAreas.style.height = ((TextAreas.scrollHeight) - 20) + 'px';
	}
}