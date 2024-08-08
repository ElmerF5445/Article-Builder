/*
Properties, starting functions, etc.
*/

/* App Information */
let App_Info = {
  // Title of the project
  Title: "Article Builder",
  // Title of the project's version
  Version_Title: "1.0",
  // Version number
  Version_Number: "1.0",
  // Latest compilation date of the project
  Version_CompilationDate: "6 August 2024",
  // Copyright text that appears in certain menu and screen elements
  Copyright_Title: "Content By ElmerF 2024",
  // Content By ElmerF logo
  Copyright_Icon: "Assets/Icons/ContentByElmerF.png",
  // Prefix that will be used by modules that use local and session storage
  Key_Prefix: "AB",
};

/* App Properties */
let App_Property = {
  // Title of the page that will appear in the menu and browser window
  Page_Title: "Template",
  // Icon that will appear on the tab favicon and other menu elements
  Page_Icon: "Assets/Icons/favicon.png",
  //
  Page_Style: 0,
  // If set to true, the sidebar will disappear on the side when collapsed
  Sidebar_HideWhenCollapsed: false,
  // If set to true, the sidebar will push MainContent when expanded
  Sidebar_PushContentWhenExpanded: false,
  // The sidebar's width in pixels when expanded
  Sidebar_Width_Expanded: 300,
  // The sidebar's width in pixels when collapsed
  Sidebar_Width_Collapsed: 40,
  // Use the sidebar for tabs
  Sidebar_UseTabs: true,
  // If set to true, the Content container will occupy the full space of the MainContent container
  UseFullContainer: false,
  // If set to true, the loading screen will cover the screen until the page is fully loaded
  LoadingScreen_Enabled: true,
  // Style of the LoadingScreen: 0 - Black screen, 1 - Simple, 2 - Splash screen; 3 - Custom screen
  LoadingScreen_Style: 1,
  // If set to true, the Header will occupy space on the top
  Pin_Header: true,
  // If set to true, the Ribbon will occupy space below the Header
  Pin_Ribbon: true,
  // If set to true, the Sidebar will occupy space on the side
  Pin_Sidebar: true,
};
// This is a duplicate of App_Property that stores the original properties upon page load. If any properties are modified in App_Property, the system can use this to revert back to the original state the page is in when it was first loaded.
let App_Property_OriginalState = {};

/* Hide elements */
// Array of element IDs that will be hidden during page load.
// This can be used to disable features
let App_HideElements = [];

/* Page navigation */
// Arrays of titles, IDs, and icons for the page navigation menu
let App_PageNavigation_Titles = ["App Template", "Color Tester", "Settings"];
let App_PageNavigation_Links = [
  "App_Template.html",
  "App_ColorTester.html",
  "App_UniversalSettings.html",
];
let App_PageNavigation_Icons = [
  "Assets/Icons/icon_home.png",
  "Assets/Icons/iconNew_customization.png",
  "Assets/Icons/icon_settings.png",
];

var path = window.location.pathname;
var App_CurrentPageName = path.split("/").pop();

window.onload = Startup_Check_Session();

var App_FirstSessionLoad = false;

function Startup_Check_Session() {
  if (sessionStorage.getItem("ABE_FirstSessionLoad") === null) {
    console.log("Session key does not exist");
    sessionStorage.setItem("ABE_FirstSessionLoad", "yes");
    console.log("Added session key");
    App_FirstSessionLoad = true;
  }
//   Startup_Page_ChangeConfigurations();
}

var PropertiesFileURL = "Scripts/Javascript/App_Properties.json";
let App_Page_Properties = {};
async function Startup_Fetch_File_Properties(URL) {
  try {
    const JSON_File = await fetch(URL);
    const JSON_Data = await JSON_File.json();
    return JSON_Data;
  } catch (error) {
    console.error(
      "Startup_Fetch_File_Properties failed to fetch the properties file."
    );
    return null;
  }
}

// Gets the manifest file and stores the data to SubjectList
Startup_Fetch_File_Properties(PropertiesFileURL)
  .then((data) => {
    if (data !== null) {
        App_Page_Properties = data;
        console.log("JSON file '" + PropertiesFileURL + "' loaded.");
        console.log("Searching for correct page file name...");
        for (a = 0; a < App_Page_Properties.length; a++){
            if (App_Page_Properties[a].Page_File == App_CurrentPageName){
                console.log("First match found at " + a);
                App_Property = App_Page_Properties[a].Page_Property;
                App_Property_OriginalState = App_Property;
                console.log("Set App_Property to current page property data.");
                console.log("Loading success.");
                Startup_Page_ApplyConfigurations();
            }
        }
    }
  })
  .catch((error) => {
    console.error("Error fetching JSON file:", error);
  });

// This is used by other functions to get the manifest data
async function Startup_Load_File_Properties(PropertiesFileURL) {
  const data = await Startup_Fetch_File_Properties(
    PropertiesFileURL
  );
  Startup_Page_ApplyConfigurations("Initialize");
  return data;
}

function Startup_Page_ApplyConfigurations(Mode, Parameter) {
  /* Modes:
    Initialize - Triggered during the initialization of the page
    FromFunctions - Triggered by other functions
    QuickChange - Does not trigger LoadingScreen_Show()
  */
 /* Parameters: 
    null - No value
    ThisOnly - Does not trigger Startup_Page_ApplyInformation() 
    ContainerOnly - Only applies configurations for MainViewContainer
 */
  if (Parameter != "ContainerOnly"){
      // Sets LoadingScreen style
    if (App_Property.LoadingScreen.Configuration == "Black") {
      document
        .getElementById("LoadingScreen_Simple")
        .setAttribute("Display", "none");
      document
        .getElementById("LoadingScreen_Splash")
        .setAttribute("Display", "none");
      document
        .getElementById("LoadingScreen_Custom")
        .setAttribute("Display", "none");
    } else if (App_Property.LoadingScreen.Configuration == "Simple") {
      document
        .getElementById("LoadingScreen_Simple")
        .setAttribute("Display", "grid");
      document
        .getElementById("LoadingScreen_Splash")
        .setAttribute("Display", "none");
      document
        .getElementById("LoadingScreen_Custom")
        .setAttribute("Display", "none");
    } else if (App_Property.LoadingScreen.Configuration == "Splash") {
      document
        .getElementById("LoadingScreen_Simple")
        .setAttribute("Display", "none");
      document
        .getElementById("LoadingScreen_Splash")
        .setAttribute("Display", "grid");
      document
        .getElementById("LoadingScreen_Custom")
        .setAttribute("Display", "none");
    } else if (App_Property.LoadingScreen.Configuration == "Custom") {
      document
        .getElementById("LoadingScreen_Simple")
        .setAttribute("Display", "none");
      document
        .getElementById("LoadingScreen_Splash")
        .setAttribute("Display", "none");
      document
        .getElementById("LoadingScreen_Custom")
        .setAttribute("Display", "grid");
    }

    if (Mode != "QuickChange"){
      LoadingScreen_Show();
    }
    Element_Attribute_Set("LoadingScreen_Simple", "Opacitation", "Transparent");
    Element_Attribute_Set("LoadingScreen_Splash", "Opacitation", "Transparent");

    if (document.getElementById("Sidebar").style.display != "none" && document.getElementById("Sidebar").classList.contains("Tabs_Vertical_Container_Selector") == true) {
      if (Mode != "QuickChange"){
        Tabs_DisplayFirstPage();
      }
    }

    // Determines if the loading screen is disabled to hide it
    if (App_Property.Features.LoadingScreen == false) {
      document.getElementById("LoadingScreen").setAttribute("Display", "none");
    } else {
      document.getElementById("LoadingScreen").setAttribute("Display", "block");
    }

    // Sets the width for the expanded and collapsed state of the Sidebar
    var stylesheet = document.querySelector(":root");
    stylesheet.style.setProperty("--Sidebar-Width-Expanded", App_Property.Sidebar.Width_Expanded + "px");
    stylesheet.style.setProperty("--Sidebar-Width-Collapsed",App_Property.Sidebar.Width_Collapsed + "px");

    // Generates PageNavigation buttons
    document.getElementById("Header_PageNavigation_Menu_Links").innerHTML = "";
    if (App_Property.Header.Menu_Contents.PageNavigation.length > 0){
      for (a = 0; a < App_Property.Header.Menu_Contents.PageNavigation.length; a++) {
        var App_PageNavigation_Element_HTML = `<div class="Header_PageNavigation_Menu_Button_Item">
            <img class='Header_PageNavigation_Menu_Button_Item_Icon' src='${App_Property.Header.Menu_Contents.PageNavigation[a].Icon}' draggable='false' loading='lazy'/>
            <p class="Header_PageNavigation_Menu_Button_Item_Text">
                ${App_Property.Header.Menu_Contents.PageNavigation[a].Title}
            </p>
        </div>`;
        var App_PageNavigation_Element_Anchor = document.createElement('a');
        if (App_Property.Header.Menu_Contents.PageNavigation[a].Link != null){
            App_PageNavigation_Element_Anchor.setAttribute('href', App_Property.Header.Menu_Contents.PageNavigation[a].Link);
        }
        
        App_PageNavigation_Element_Anchor.innerHTML = App_PageNavigation_Element_HTML;
        document.getElementById("Header_PageNavigation_Menu_Links").appendChild(App_PageNavigation_Element_Anchor);
      }
    }
    // Generates PageAction buttons
    document.getElementById("Header_PageActions_Menu_Links").innerHTML = "";
    if (App_Property.Header.Menu_Contents.Actions.length > 0){
      for (a = 0; a < App_Property.Header.Menu_Contents.Actions.length; a++) {
        var App_PageAction_Element_HTML = `<div class="Header_PageNavigation_Menu_Button_Item" onclick=${App_Property.Header.Menu_Contents.Actions[a].OnclickFunction}>
            <img class='Header_PageNavigation_Menu_Button_Item_Icon' src='${App_Property.Header.Menu_Contents.Actions[a].Icon}' draggable='false' loading='lazy'/>
            <p class="Header_PageNavigation_Menu_Button_Item_Text">
                ${App_Property.Header.Menu_Contents.Actions[a].Title}
            </p>
        </div>`;
        var App_PageAction_Element_Anchor = document.createElement('a');
        if (App_Property.Header.Menu_Contents.Actions[a].Link != null){
            App_PageAction_Element_Anchor.setAttribute('href', App_Property.Header.Menu_Contents.Actions[a].Link);
        }
        if (App_Property.Header.Menu_Contents.Actions[a].CloseAfterClick != null){
          if (App_Property.Header.Menu_Contents.Actions[a].CloseAfterClick == true){
            App_PageAction_Element_Anchor.setAttribute('onclick', "Header_Toggle_PageNavigation()");
          }
        }
        App_PageAction_Element_Anchor.innerHTML = App_PageAction_Element_HTML;
        document.getElementById("Header_PageActions_Menu_Links").appendChild(App_PageAction_Element_Anchor);
      }
    }

    if (App_Property.Features.StatusBar == true || App_Property.Features.ClockScreen == true){
      Clock_Update_Time();
      Date_Update_Date();
      document.getElementById("Header_StatusTray").style.display = null;
    } else {
      document.getElementById("Header_StatusTray").style.display = "none";
    }
    if (App_Property.Features.StatusBar_Elements.Battery == true || App_Property.Features.ClockScreen == true){
      Battery_Update_Level();
    }
    if (App_Property.Features.StatusBar_Elements.Connection == true ||
      App_Property.Features.ClockScreen == true
    ) {
      Connection_Update_Status();
    }

    if (App_Property.Features.Header == false) {
      Element_Attribute_Set("MainContent", "Style_Margin_Header", "Disabled");
      document.getElementById("Header").style.display = "none";
      // Element_Attribute_Set("Sidebar", "Style_Margin_Header", "Enabled");
    } else {
      Element_Attribute_Set("MainContent", "Style_Margin_Header", "Enabled");
      document.getElementById("Header").style.display = null;
    }

    if (App_Property.Sidebar.HideWhenCollapsed == true) {
      Element_Attribute_Set("MainContent", "Style_Margin_Sidebar", "Disabled");
      Element_Attribute_Set("Ribbon", "Style_Margin_Sidebar", "Disabled");
      Element_Attribute_Set("Sidebar", "State", "Collapsed_Hide");
    } else {
      Element_Attribute_Set("MainContent", "Style_Margin_Sidebar", "Enabled");
      Element_Attribute_Set("Ribbon", "Style_Margin_Sidebar", "Enabled");
      Element_Attribute_Set("Sidebar", "State", "Collapsed");
    }

    if (App_Property.Features.Sidebar == false) {
      Element_Attribute_Set("MainContent", "Style_Margin_Sidebar", "Disabled");
      Element_Attribute_Set("Header", "Style_Margin_Sidebar", "Disabled");
      Element_Attribute_Set("Ribbon", "Style_Margin_Sidebar", "Disabled");
      document.getElementById("Sidebar").style.display = "none";
    } else {
      Element_Attribute_Set("MainContent", "Style_Margin_Sidebar", "Disabled");
      Element_Attribute_Set("Header", "Style_Margin_Sidebar", "Enabled");
      Element_Attribute_Set("Ribbon", "Style_Margin_Sidebar", "Enabled");
      document.getElementById("Sidebar").style.display = null;
    }

    if (App_Property.Features.Sidebar_Elements.Toggle == false) {
      Element_Attribute_Set("Sidebar", "Style_Margin_Header", "Disabled");
      Element_Attribute_Set("Header", "Style_Margin_SidebarToggle", "Disabled");
      Element_Attribute_Set("Header", "Style_Margin_SidebarToggle", "Disabled");
      document.getElementById("Header_SidebarToggle").style.display = "none";
      // Element_Attribute_Set("Sidebar", "Style_Margin_Header", "Enabled");
    } else {
      Element_Attribute_Set("Sidebar", "Style_Margin_Header", "Enabled");
      Element_Attribute_Set("Header", "Style_Margin_SidebarToggle", "Enabled");
      Element_Attribute_Set("Header", "Style_Margin_SidebarToggle", "Enabled");
      document.getElementById("Header_SidebarToggle").style.display = null;
    }


    if (App_Property.Features.Ribbon == false) {
      Element_Attribute_Set("MainContent", "Style_Margin_Ribbon", "Disabled");
      document.getElementById("Ribbon").style.display = "none";
    } else {
      Element_Attribute_Set("MainContent", "Style_Margin_Ribbon", "Enabled");
      pageProperty_enableRibbon = 1;
    }
  }
  // Determines if the main content uses the full container
  if (App_Property.Page.MainView.UseFullContainer == true) {
    Element_Attribute_Set("Content", "Style_Margin", "Disabled");
  } else {
    Element_Attribute_Set("Content", "Style_Margin", "Enabled");
  }

  if (Parameter == null && Parameter != "ThisOnly"){
    Startup_Page_ApplyInformation();
  }
}

function Startup_Page_ApplyInformation() {
  if (App_Property.Features.LoadingScreen == true) {
    if (App_Property.LoadingScreen.Configuration == "Simple") {
      document.getElementById("LoadingScreen_Icon_Simple").src =
        App_Property.Page.Icon;
      document.getElementById("LoadingScreen_Title_Simple").innerHTML =
      App_Property.TitleBar_Title;
      document.getElementById("LoadingScreen_Subtitle_Simple").innerHTML =
        App_Property.Page.Title;
      document.getElementById("LoadingScreen_Copyright_Icon_Simple").src =
        App_Info.Copyright_Icon;
      document.getElementById(
        "LoadingScreen_Copyright_Title_Simple"
      ).innerHTML = App_Info.Copyright_Title;
    } else if (App_Property.LoadingScreen.Configuration == "Splash") {
      document.getElementById("LoadingScreen_Icon_Splash").src =
      App_Property.Page.Icon;
      document.getElementById("LoadingScreen_Title_Splash").innerHTML =
      App_Property.TitleBar_Title;
      document.getElementById("LoadingScreen_Subtitle_Splash").innerHTML =
      App_Property.Page.Title;
      document.getElementById("LoadingScreen_Copyright_Icon_Splash").src =
      App_Info.Copyright_Icon;
      document.getElementById(
        "LoadingScreen_Copyright_Title_Splash"
      ).innerHTML = App_Info.Copyright_Title;
    }
  }

  document.getElementById("Page_Favicon").src = App_Property.Page.Icon;
  document.getElementById("Page_Title").innerText = App_Property.TitleBar_Title + " | " + App_Property.Page.Title;
  document.getElementById("Header_PageNavigation_Menu_Title").innerHTML = App_Property.Page.Title;
  document.getElementById("Header_PageNavigation_Icon").src = App_Property.Page.Icon;
  document.getElementById("Header_PageNavigation_Title").innerHTML = App_Property.Header.Title;

  Startup_Page_HideElements();
}

function Startup_Page_HideElements() {
  if (App_HideElements.length > 0) {
    for (a = 0; a < App_HideElements.length; a++) {
      document
        .getElementById(App_HideElements[a])
        .setAttribute("Display", "none");
      document
        .getElementById(App_HideElements[a])
        .setAttribute("UI_Status", "Disabled");
    }
  }
  Startup_Page_AdditionalFunctions();
}

function Startup_Page_AdditionalFunctions() {
  // Specify any additional functions that will be executed on page load here
  Startup_Page_FinishInitialization();
}

function Startup_Page_FinishInitialization() {
  console.log(
    App_Info.Title +
      " " +
      App_Info.Version_Title +
      " | " +
      App_Info.Copyright_Title
  );
  if (App_Property.Features.Projects == true){
    Projects_Check_Manifest();
  }
  Element_Attribute_Set("LoadingScreen_Simple", "Opacitation", "Opaque");
  Element_Attribute_Set("LoadingScreen_Splash", "Opacitation", "Opaque");
  setTimeout(LoadingScreen_Hide, 4000);
}