let AB_Editor_Data = {
    "Metadata": {
        "Article_Banner": "https://elmerf5445.github.io/Article-Builder/Assets/Background/Splash.png",
        "Article_Title": null,
        "Article_Title_Height": null,
        "Article_Author": null,
        "Article_Category": null,
        "Article_PublishingDate": null
    },
    "Contents": [
        // {
        //     "Type": "Primary_Title",
        //     "Content": null,
        //     "Height": null
        // },
        // {
        //     "Type": "Secondary_Title",
        //     "Content": null,
        //     "Height": null
        // },
        // {
        //     "Type": "Tertiary_Title",
        //     "Content": null,
        //     "Height": null
        // },
        // {
        //     "Type": "Paragraph",
        //     "Content": null,
        //     "Height": null
        // },
        // {
        //     "Type": "Image",
        //     "Source": null,
        //     "Description": null,
        //     "Credits": null 
        // },
        // {
        //     "Type": "Numbered_List",
        //     "Header": null,
        //     "Content": null
        // },
        // {
        //     "Type": "Bulleted_List",
        //     "Header": null,
        //     "Content": null
        // },
        // {
        //     "Type": "Quote",
        //     "Content": null,
        //     "Source": null
        // },
        // {
        //     "Type": "Video",
        //     "Source": null
        // }
    ]
}


document.addEventListener("DOMContentLoaded", (event) => {
    Editor_Element_Definitions_Load();
});

let AB_Editor_Element_Definitions = [];
function Editor_Element_Definitions_Load(){
    const request = new XMLHttpRequest();
    request.open("GET", "Scripts/Javascript/AB_Editor_Elements_Definition.json", false);
    request.send();
    if (request.status === 200){
        var response = request.responseText;
        AB_Editor_Element_Definitions = JSON.parse(response);
    } else {
        console.error("An error has occured when loading the element definitions.");
    }
}

function Editor_Element_Add(Type){
    let Editor_Element_Definition = Editor_Element_Definitions_Find("Fetch", Type);
    let Editor_Element_Content = null;
    
    if (Editor_Element_Definition != null){
        Editor_Element_Content = Editor_Element_Definition.Editor_Data_Starting;
        if (Editor_Element_InsertionPoint <= AB_Editor_Data.Contents.length){
            AB_Editor_Data.Contents.splice(Editor_Element_InsertionPoint + 1, 0, Editor_Element_Content);
        } else {
            AB_Editor_Data.Contents.push(Editor_Element_Content);
        }
        Editor_Article_Render("Editor_Element_Add");
    } else {
        console.error("Element definition not found.");
    }
    
}

function Editor_Element_Delete(Item){
    AB_Editor_Data.Contents.splice(Item, 1);
    Editor_Article_Render();
}

var Editor_Element_Rearrange_Switch_State = 0; // 0 - Inactive, 1 - Element 1 selected, do swap
var Editor_Element_Rearrange_Switch_Element_1;
var Editor_Element_Rearrange_Switch_Element_1_Index;
var Editor_Element_Rearrange_Switch_Element_2;
var Editor_Element_Rearrange_Switch_Element_2_Index;
function Editor_Element_Rearrange_Switch(Item, ID){
    if (Editor_Element_Rearrange_Switch_State == 0){
        Editor_Element_Rearrange_Switch_Element_1 = AB_Editor_Data.Contents[Item];
        Editor_Element_Rearrange_Switch_Element_1_Index = Item;
        Element_Attribute_Set(ID, "State", "Selected");
        Editor_Element_Rearrange_Switch_State = 1;
    } else if (Editor_Element_Rearrange_Switch_State == 1){
        Editor_Element_Rearrange_Switch_Element_2 = AB_Editor_Data.Contents[Item];
        Editor_Element_Rearrange_Switch_Element_2_Index = Item;

        AB_Editor_Data.Contents[Editor_Element_Rearrange_Switch_Element_1_Index] = Editor_Element_Rearrange_Switch_Element_2;
        AB_Editor_Data.Contents[Editor_Element_Rearrange_Switch_Element_2_Index] = Editor_Element_Rearrange_Switch_Element_1;
        Editor_Element_Rearrange_Switch_State = 0;

        Editor_Article_Render();
    }
}

function Editor_Element_Rearrange_Insert(Index_Above, Index_Below){
    if (Editor_Element_Rearrange_Switch_State == 1){
        AB_Editor_Data.Contents.splice(Editor_Element_Rearrange_Switch_Element_1_Index, 1);
        AB_Editor_Data.Contents.splice(Index_Below, 0, Editor_Element_Rearrange_Switch_Element_1);
        
        Editor_Element_Rearrange_Switch_State = 0;
        
        Editor_Article_Render();

        if (document.getElementById(`Element_${Index_Below - 1}_Input_0`) != null){
            Editor_LastInteracted_Set(`Element_${Index_Below - 1}_Input_0`);
        } else if (document.getElementById(`Element_${Index_Below - 1}_TextArea_0`) != null){
            Editor_LastInteracted_Set(`Element_${Index_Below - 1}_TextArea_0`);
        } 
    }
}

function Editor_Element_JumpTo(ID){
    document.getElementById(ID).scrollIntoView();
    if (document.getElementById(`${ID}_Input_0`) != null){
        Editor_LastInteracted_Set(`${ID}_Input_0`);
    } else if (document.getElementById(`${ID}_TextArea_0`) != null){
        Editor_LastInteracted_Set(`${ID}_TextArea_0`);
    } 
    Editor_LastInteracted_Focus();
}

function Editor_Element_Definitions_Find(Action, Type){
    if (Action == "Fetch"){
        let Definition = null;
        for (Definition of AB_Editor_Element_Definitions){
            if (Definition.Type == Type){
                return Definition;
            }
        }
        if (Definition == null){
            console.error("Element definition not found.");
            return null;
        } else {
            return Definition;
        }
    }
}

function Editor_Article_Render(Source){
    Editor_Element_Rearrange_Switch_State = 0;
    document.getElementById("AB_Editor_Content").innerHTML = "";
    document.getElementById("AB_Sidebar_List").innerHTML = "";
    // Set header values
    document.getElementById("AB_Editor_Header_Title").value = AB_Editor_Data.Metadata.Article_Title;
    document.getElementById("AB_Editor_Header_Title").style.height = AB_Editor_Data.Metadata.Article_Title_Height;
    document.getElementById("AB_Editor_Header_Author").value = AB_Editor_Data.Metadata.Article_Author;
    document.getElementById("AB_Editor_Header_Category").value = AB_Editor_Data.Metadata.Article_Category;
    document.getElementById("AB_Editor_Header_DatePublished").value = AB_Editor_Data.Metadata.Article_PublishingDate;

    var Count = 0;
    // Generate inputs and sidebar items
    for (Content of AB_Editor_Data.Contents){
        var Editor_Element_Definition = Editor_Element_Definitions_Find("Fetch", Content.Type);
        if (Editor_Element_Definition != null){
            var Editor_Element_InnerHTML = Editor_Element_Definition.Editor_Element;
            var Sidebar_Element_Title = Editor_Element_Definition.Editor_List.Name;
            var Sidebar_Element_Content = Content[Editor_Element_Definition.Editor_List.Data_Key];

            var Sidebar_Element_InnerHTML = `
            <div class="AB_Sidebar_List_Item" id="Sidebar_${Count}">
                <div class="AB_Sidebar_List_Item_Content" onclick="Editor_Element_Rearrange_Switch(${Count}, this.parentNode.id), Editor_Element_JumpTo('Element_${Count}')">
                    <p class="AB_Sidebar_List_Item_Type">
                        ${Sidebar_Element_Title}
                    </p>
                    <p class="AB_Sidebar_List_Item_Text">
                        ${Sidebar_Element_Content}
                    </p>
                </div>
                <img class='AB_Sidebar_List_Item_Jump' src='Assets/Icons/iconNew_link.png' draggable='false' loading='lazy' onclick="Editor_Element_JumpTo('Element_${Count}')"/>
                <img class='AB_Sidebar_List_Item_Delete' src='Assets/Icons/iconNew_delete.png' draggable='false' loading='lazy' onclick="Editor_Element_Delete('${Count}')"/>
            </div>
            <div class="AB_Sidebar_List_Item_Inserter" id="Insert_${Count}" onclick="Editor_Element_Rearrange_Insert(${Count}, ${Count + 1})">
                <p class="AB_Sidebar_List_Item_Inserter_Text">
                    Insert between
                </p>
            </div>
            `;

            var Editor_Element = document.createElement('span');
            Editor_Element.setAttribute("id", `Element_${Count}`);
            Editor_Element.setAttribute("class", "AB_Element");
            Editor_Element.setAttribute("Element_Type", Content.Type);
            Editor_Element.innerHTML = Editor_Element_InnerHTML;

            var Sidebar_Element = document.createElement('span');
            Sidebar_Element.innerHTML = Sidebar_Element_InnerHTML;

            document.getElementById("AB_Editor_Content").appendChild(Editor_Element);
            document.getElementById("AB_Sidebar_List").appendChild(Sidebar_Element);

            var Editor_Element_TextAreas = document.getElementById(`Element_${Count}`).getElementsByTagName("textarea");
            if (Editor_Element_TextAreas.length != 0){
                for (b = 0; b <= Editor_Element_TextAreas.length - 1; b++){
                    Editor_Element_TextAreas[b].setAttribute("id", `Element_${Count}_TextArea_${b}`);
                    Editor_Element_TextAreas[b].setAttribute("onchange", `Editor_Article_Data_Update(), Editor_LastInteracted_Set(this.id), Editor_InsertionPoint_Set(${Count}), TextArea_SnapToSize_All()`);
                    Editor_Element_TextAreas[b].setAttribute("oninput", `Editor_LastInteracted_Set(this.id), Editor_InsertionPoint_Set(${Count}), TextArea_SnapToSize_All()`);
                    Editor_Element_TextAreas[b].setAttribute("onfocus", `Editor_LastInteracted_Set(this.id), Editor_InsertionPoint_Set(${Count}), TextArea_SnapToSize_All()`);
                }
            }
            
            var Editor_Element_Inputs = document.getElementById(`Element_${Count}`).getElementsByTagName("input");
            if (Editor_Element_Inputs.length != 0){
                for (c = 0; c <= Editor_Element_Inputs.length - 1; c++){
                    Editor_Element_Inputs[c].setAttribute("id", `Element_${Count}_Input_${c}`);
                    Editor_Element_Inputs[c].setAttribute("onchange", `Editor_Article_Data_Update(), Editor_LastInteracted_Set(this.id), Editor_InsertionPoint_Set(${Count}), TextArea_SnapToSize_All()`);
                    Editor_Element_Inputs[c].setAttribute("oninput", `Editor_LastInteracted_Set(this.id), Editor_InsertionPoint_Set(${Count}), TextArea_SnapToSize_All()`);
                    Editor_Element_Inputs[c].setAttribute("onfocus", `Editor_LastInteracted_Set(this.id), Editor_InsertionPoint_Set(${Count}), TextArea_SnapToSize_All()`);
                }
            }
            Count++;
        }
    }

    if (Source == "Editor_Element_Add"){
        if (document.getElementById(`Element_${Count - 1}_Input_0`) != null){
            Editor_LastInteracted_Set(`Element_${Count - 1}_Input_0`);
        } else if (document.getElementById(`Element_${Count - 1}_TextArea_0`) != null){
            Editor_LastInteracted_Set(`Element_${Count - 1}_TextArea_0`);
        } 
    }

    Editor_Article_Render_Data();
}

function Editor_Article_Render_Data(){
    document.getElementById("AB_Editor_Header_Banner").value = AB_Editor_Data.Metadata.Article_Banner;
    document.getElementById("AB_Editor_Banner_Image").src = AB_Editor_Data.Metadata.Article_Banner;
    document.getElementById("AB_Editor_Header_Title").value = AB_Editor_Data.Metadata.Article_Title;
    document.getElementById("AB_Editor_Header_Title").style.height = AB_Editor_Data.Metadata.Article_Title_Height;
    document.getElementById("AB_Editor_Header_Author").value = AB_Editor_Data.Metadata.Article_Author;
    document.getElementById("AB_Editor_Header_Category").value = AB_Editor_Data.Metadata.Article_Category;
    document.getElementById("AB_Editor_Header_DatePublished").value = AB_Editor_Data.Metadata.Article_PublishingDate;

    for (a = 0; a < AB_Editor_Data.Contents.length; a++){
        var Element = document.getElementById("Element_" + a);
        var Element_Type = AB_Editor_Data.Contents[a].Type;
        var Element_Definition = Editor_Element_Definitions_Find("Fetch", Element_Type);
        var Element_DataPoints = Element_Definition.Editor_Data_Points;
        for (b = 0; b < Element_DataPoints.length; b++){
            var DataPoint = Element_DataPoints[b];
            var DataPoint_Key = DataPoint.Key;
            var DataPoint_Attribute = DataPoint.Attribute;
            var DataPoint_QuerySelector = DataPoint.QuerySelector;
            var DataPoint_Data = AB_Editor_Data.Contents[a][DataPoint_Key];
            if (DataPoint_Data != null && DataPoint_Data != ""){
                if (DataPoint_Attribute == "value"){
                    Element.querySelector("." + DataPoint_QuerySelector).value = DataPoint_Data;
                } else {
                    Element.querySelector("." + DataPoint_QuerySelector).setAttribute(DataPoint_Attribute, DataPoint_Data);
                }
            }
        }
    }
    
    TextArea_SnapToSize_All();
    Editor_LastInteracted_Focus();
}

function Editor_Article_Data_Update(){
    AB_Editor_Data.Metadata.Article_Banner = document.getElementById("AB_Editor_Header_Banner").value;
    AB_Editor_Data.Metadata.Article_Title = document.getElementById("AB_Editor_Header_Title").value;
    AB_Editor_Data.Metadata.Article_Title_Height = document.getElementById("AB_Editor_Header_Title").style.height;
    AB_Editor_Data.Metadata.Article_Author = document.getElementById("AB_Editor_Header_Author").value;
    AB_Editor_Data.Metadata.Article_Category = document.getElementById("AB_Editor_Header_Category").value;
    AB_Editor_Data.Metadata.Article_PublishingDate = document.getElementById("AB_Editor_Header_DatePublished").value;

    for (a = 0; a < AB_Editor_Data.Contents.length; a++){
        var Element = document.getElementById("Element_" + a);
        var Element_Type = Element_Attribute_Get("Element_" + a, "Element_Type");
        var Element_Definition = Editor_Element_Definitions_Find("Fetch", Element_Type);
        var Element_DataPoints = Element_Definition.Editor_Data_Points;
        for (b = 0; b < Element_DataPoints.length; b++){
            var DataPoint = Element_DataPoints[b];
            var DataPoint_Key = DataPoint.Key;
            var DataPoint_Attribute = DataPoint.Attribute;
            var DataPoint_QuerySelector = DataPoint.QuerySelector;
            // var DataPoint_Data = AB_Editor_Data.Contents[a][DataPoint_Key];
            var DataPoint_Data;
            if (DataPoint_Attribute == "value"){
                DataPoint_Data = Element.querySelector("." + DataPoint_QuerySelector).value;
            } else {
                DataPoint_Data = Element.querySelector("." + DataPoint_QuerySelector).getAttribute(DataPoint_Attribute);
            }
            var Data_Copy = {...AB_Editor_Data.Contents[a]};
            Data_Copy[DataPoint_Key] = DataPoint_Data;
            AB_Editor_Data.Contents[a] = Data_Copy;
        }
    }
    
    Editor_Progress_Save();
    Editor_Article_Render();
}

function Editor_Article_Export(){
    if (document.getElementById('AB_Article_Export_FileName').value != null || document.getElementById('AB_Article_Export_FileName').value != ""){
        let Data = AB_Editor_Data;
        var Data_JSON = JSON.stringify(Data, null, 2);
        const Data_Blob = new Blob([Data_JSON], {type: 'application/json'});
        saveAs(Data_Blob, document.getElementById('AB_Article_Export_FileName').value + ".cbe_ab");
        Subwindows_Close('AB_Editor_Article_Export');
        Toasts_CreateToast("Assets/Icons/iconNew_download.png", "Article exported", "The file will be downloaded shortly.");
    } else {
        Subwindows_Open('AB_Editor_Error_Export_FileNameEmpty');
    }
}

function Editor_Article_Import(){
    var File_Element = document.getElementById("AB_Article_Import_File");
    var File_Element_File = File_Element.files[0];
    const Reader = new FileReader();
    Reader.onload = function(e){
        const Contents = e.target.result;
        const Data_JSON = JSON.parse(Contents);
        AB_Editor_Data = Data_JSON;
        Editor_Article_Render();
        Toasts_CreateToast("Assets/Icons/iconNew_download.png", "Article imported", `Article data successfully loaded.`);
    }

    Reader.readAsText(File_Element_File);
    Subwindows_Close("AB_Editor_Article_Import");
}

function Editor_Article_Render_Preview(){
    AB_Renderer_Article_Render(AB_Editor_Data);
    Tabs_ChangeTab_Specific(1, 'Sidebar');
    Element_Attribute_Set("AB_Editor_AddElements", "State", "Collapsed");
}

function Editor_ElementList_Toggle(){
    if(Element_Attribute_Get("AB_Sidebar", "State") == "Expanded"){
        Element_Attribute_Set("AB_Sidebar", "State", "Collapsed");
    } else {
        Element_Attribute_Set("AB_Sidebar", "State", "Expanded");
    }
}

var Editor_Element_LastInteracted = null;
function Editor_LastInteracted_Set(ID){
    Editor_Element_LastInteracted = ID;
}
function Editor_LastInteracted_Focus(){
    if (document.getElementById(Editor_Element_LastInteracted) != null){
        document.getElementById(Editor_Element_LastInteracted).focus();
    }
}

function Editor_Tag_Add(Tag_Opening, Tag_Closing){
    // Get the currently focused element
    var activeElement = document.activeElement;
 
    // Check if the active element is a textarea or text input
    if (activeElement.tagName.toLowerCase() === 'textarea' || activeElement.tagName.toLowerCase() === 'input') {
        // Get the cursor position
        var start = activeElement.selectionStart;
        var end = activeElement.selectionEnd;
 
        // Get the text content
        var text = activeElement.value;
 
        // Save the current state to the history
     //    textAreaHistory.push({ text: text, start: start, end: end });
 
        // Insert opening and closing tags around the selected text (or at the cursor position if no text is selected)
        var newText = text.slice(0, start) + Tag_Opening + text.slice(start, end) + Tag_Closing + text.slice(end);
 
        // Update the element value with the modified text
        activeElement.value = newText;
 
        // Adjust the cursor position after the inserted tags
        activeElement.selectionStart = start + Tag_Opening.length;
        activeElement.selectionEnd = end + Tag_Opening.length;
    } else {
        console.error('The currently active element is not a textarea or input.');
    }
     
 }
 
 // Listen for Ctrl+B key combination
 document.addEventListener('keydown', function(event) {
     if (event.ctrlKey && event.key === 'b') {
         event.preventDefault();
         Editor_Tag_Add('<b>', '</b>'); 
     }
     if (event.ctrlKey && event.key === 'i') {
         event.preventDefault();
         Editor_Tag_Add('<i>', '</i>'); 
     }
     if (event.ctrlKey && event.key === 'u') {
         event.preventDefault();
         Editor_Tag_Add('<u>', '</u>'); 
     }
     if (event.altKey && event.key === 'u') {
         event.preventDefault();
         Editor_Tag_Add('<ul>', '</ul>'); 
     }
     if (event.altKey && event.key === 'l') {
         event.preventDefault();
         Editor_Tag_Add('<li>', '</li>'); 
     }
     if (event.altKey && event.key === 'o') {
         event.preventDefault();
         Editor_Tag_Add('<ol>', '</ol>'); 
     }
    if (event.altKey && event.key === 'ArrowRight') {
        event.preventDefault();
        Sidebar_Toggle();
    }
    if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        Editor_Article_Render_Preview();
    }
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        Editor_Progress_Save();
    }
    if (event.ctrlKey && event.key === 'l') {
        event.preventDefault();
        Editor_Progress_Load();
    }
    if (event.ctrlKey && event.key === '1') {
        event.preventDefault();
        document.getElementById("AB_Editor_AddElements_Button_1").click();
    }
    if (event.ctrlKey && event.key === '2') {
        event.preventDefault();
        document.getElementById("AB_Editor_AddElements_Button_2").click();
    }
    if (event.ctrlKey && event.key === '3') {
        event.preventDefault();
        document.getElementById("AB_Editor_AddElements_Button_3").click();
    }
    if (event.ctrlKey && event.key === '4') {
        event.preventDefault();
        document.getElementById("AB_Editor_AddElements_Button_4").click();
    }
    if (event.ctrlKey && event.key === '5') {
        event.preventDefault();
        document.getElementById("AB_Editor_AddElements_Button_5").click();
    }
    if (event.ctrlKey && event.key === '6') {
        event.preventDefault();
        document.getElementById("AB_Editor_AddElements_Button_6").click();
    }
    if (event.ctrlKey && event.key === '7') {
        event.preventDefault();
        document.getElementById("AB_Editor_AddElements_Button_7").click();
    }
    if (event.ctrlKey && event.key === '8') {
        event.preventDefault();
        document.getElementById("AB_Editor_AddElements_Button_8").click();
    }
    if (event.ctrlKey && event.key === '9') {
        event.preventDefault();
        document.getElementById("AB_Editor_AddElements_Button_9").click();
    }
 });

 function Editor_Progress_Save(){
    localStorage.setItem("AB_Project_Progress", JSON.stringify(AB_Editor_Data));
    document.getElementById("pageElement_Header_Title").innerHTML = "Editor | Progress saved [" + document.getElementById("Header_StatusTray_Clock_Time").innerText + "]";
}

function Editor_Progress_Load(){
    if (localStorage.getItem("AB_Project_Progress") != null){
        AB_Editor_Data = JSON.parse(localStorage.getItem("AB_Project_Progress"));
        Editor_Article_Render();
        Toasts_CreateToast("Assets/Icons/iconNew_download.png", "Progress loaded", "The editor had been loaded to its recent state.");
    } else if (localStorage.getItem("AB_Project_Progress") == null){
        Toasts_CreateToast("Assets/Icons/icon_error.png", "Progress not found", "There were no recent saved progress.");
    }
}

var Editor_Element_InsertionPoint = 0;
function Editor_InsertionPoint_Set(Position){
    Editor_Element_InsertionPoint = Position;
}

function Editor_Element_Selector_Toggle(){
    if(Element_Attribute_Get("AB_Editor_AddElements", "State") == "Collapsed"){
        
    } else {
        Element_Attribute_Set("AB_Editor_AddElements", "State", "Collapsed");
    }
}