/*
Add all Javascript file names in the array below to load it in the page
*/
let App_Javascript_List = [ "App_Javascript_ERUMAUI.js" + "App_Javascript_ERUMAUI_Core.js", "App_Javascript_Initialization.js", "App_Javascript_Debugging.js"];

window.onload = App_Load_Additional_Javascript();

function App_Load_Additional_Javascript(){
    for (a = 0; a < App_Javascript_List.length; a++){
        var App_Javascript_ScriptTag = document.createElement("script");
        App_Javascript_ScriptTag.setAttribute("src", "../Scripts/Javascript/" + App_Javascript_List[a]);
        App_Javascript_ScriptTag.setAttribute("async", true);
        document.body.appendChild(App_Javascript_ScriptTag);
    }
}