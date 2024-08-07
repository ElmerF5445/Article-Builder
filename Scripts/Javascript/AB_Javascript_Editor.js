let AB_Editor_Data = {
    "Metadata": {
        "Article_Banner": null,
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

function Editor_Element_Add(Type){
    let Editor_Element_Content = {};
    if(Type == "Primary_Title"){
        Editor_Element_Content = {
            "Type": "Primary_Title",
            "Content": "",
            // "Height": "69px"
        }
    }
    if (Type == "Secondary_Title"){
        Editor_Element_Content = {
            "Type": "Secondary_Title",
            "Content": "",
            // "Height": "63px"
        }
    }
    if (Type == "Paragraph"){
        Editor_Element_Content = {
            "Type": "Paragraph",
            "Content": "",
            // "Height": "56px"
        }
    }
    if (Type == "Image"){
        Editor_Element_Content = {
            "Type": "Image",
            "Source": "",
            "Description": "",
            "Credits": "" 
        }
    }
    if (Type == "Numbered_List"){
        Editor_Element_Content = {
            "Type": "Numbered_List",
            "Header": "",
            "Content": ""
        }
    }
    if (Type == "Bulleted_List"){
        Editor_Element_Content = {
            "Type": "Bulleted_List",
            "Header": "",
            "Content": ""
        }
    }
    if (Type == "Quote"){
        Editor_Element_Content = {
            "Type": "Quote",
            "Content": "",
            "Source": ""
        }
    }
    if (Type == "Video"){
        Editor_Element_Content = {
            "Type": "Video",
            "Source": ""
        }
    }

    AB_Editor_Data.Contents.push(Editor_Element_Content);
    Editor_Article_Render();
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
    }
}

function Editor_Element_JumpTo(ID){
    document.getElementById(ID).scrollIntoView();
}

function Editor_Article_Render(){
    Editor_Element_Rearrange_Switch_State = 0;
    document.getElementById("AB_Editor_Content").innerHTML = "";
    document.getElementById("AB_Sidebar_List").innerHTML = "";
    // Set header values
    document.getElementById("AB_Editor_Header_Title").value = AB_Editor_Data.Metadata.Article_Title;
    document.getElementById("AB_Editor_Header_Title").style.height = AB_Editor_Data.Metadata.Article_Title_Height;
    document.getElementById("AB_Editor_Header_Author").value = AB_Editor_Data.Metadata.Article_Author;
    document.getElementById("AB_Editor_Header_Category").value = AB_Editor_Data.Metadata.Article_Category;
    document.getElementById("AB_Editor_Header_DatePublished").value = AB_Editor_Data.Metadata.Article_PublishingDate;

    // Generate inputs and sidebar items
    for (a = 0; a < AB_Editor_Data.Contents.length; a++){
        var Object = AB_Editor_Data.Contents[a];
        var Element_InnerHTML = ``;
        var Sidebar_InnerHTML = ``;

        Sidebar_InnerHTML = `
            <div class="AB_Sidebar_List_Item" id="Sidebar_${a}">
                <div class="AB_Sidebar_List_Item_Content" onclick="Editor_Element_Rearrange_Switch(${a}, this.parentNode.id)">
                    <p class="AB_Sidebar_List_Item_Type">
                        ${Object.Type}
                    </p>
                    <p class="AB_Sidebar_List_Item_Text">
                        ${Object.Content}
                    </p>
                </div>
                <img class='AB_Sidebar_List_Item_Jump' src='../Assets/Icons/iconNew_link.png' draggable='false' loading='lazy' onclick="Editor_Element_JumpTo('Element_${a}')"/>
                <img class='AB_Sidebar_List_Item_Delete' src='../Assets/Icons/iconNew_delete.png' draggable='false' loading='lazy' onclick="Editor_Element_Delete('${a}')"/>
            </div>
            <div class="AB_Sidebar_List_Item_Inserter" id="Insert_${a}" onclick="Editor_Element_Rearrange_Insert(${a}, ${a + 1})">
                <p class="AB_Sidebar_List_Item_Inserter_Text">
                    Insert between
                </p>
            </div>
        `;

        if (Object.Type == "Primary_Title"){
            Element_InnerHTML = `
                <textarea type="text" class="Input_Text_Long AB_Editor_Input AB_Element_Title" id="Element_${a}" autocomplete="off" Autoresize="true" placeholder="Primary title" Element_Type="Title_Primary" value="${Object.Content}" onchange="Editor_Article_Data_Update(), TextArea_SnapToSize(this.id)"></textarea>
            `;
        }
        if (Object.Type == "Secondary_Title"){
            Element_InnerHTML = `
                <textarea type="text" class="Input_Text_Long AB_Editor_Input AB_Element_Title" id="Element_${a}" autocomplete="off" Autoresize="true" placeholder="Secondary title" Element_Type="Title_Secondary" value="${Object.Content}" onchange="Editor_Article_Data_Update(), TextArea_SnapToSize(this.id)"></textarea>
            `;
        }
        if (Object.Type == "Paragraph"){
            Element_InnerHTML = `
                <textarea type="text" class="Input_Text_Long AB_Editor_Input AB_Element_Paragraph" id="Element_${a}" autocomplete="off" Autoresize="true" placeholder="Paragraph" Element_Type="Paragraph" value="${Object.Content}" onchange="Editor_Article_Data_Update(), TextArea_SnapToSize(this.id)"></textarea>
            `;
        }
        if (Object.Type == "Image"){
            Element_InnerHTML = `
                <div class="AB_Element_Image" Element_Type="Image" id="Element_${a}">
                    <img class='AB_Element_Image_Image' src='${Object.Source}' draggable='false' loading='lazy'/>
                    <input type="text" class="Input_Text AB_Editor_Input Image_Source" id="" autocomplete="off" placeholder="Source" value="${Object.Source}" onchange="Editor_Article_Data_Update()"/>
                    <input type="text" class="Input_Text AB_Editor_Input Image_Description" id="" autocomplete="off" placeholder="Description" value="${Object.Description}" onchange="Editor_Article_Data_Update()"/>
                    <input type="text" class="Input_Text AB_Editor_Input Image_Credits" id="" autocomplete="off" placeholder="Credits" value="${Object.Credits}" onchange="Editor_Article_Data_Update()"/>
                </div>
            `;
            Sidebar_InnerHTML = `
                <div class="AB_Sidebar_List_Item" id="Sidebar_${a}">
                    <div class="AB_Sidebar_List_Item_Content" onclick="Editor_Element_Rearrange_Switch(${a}, this.parentNode.id)">
                        <p class="AB_Sidebar_List_Item_Type">
                            ${Object.Type}
                        </p>
                        <p class="AB_Sidebar_List_Item_Text">
                            ${Object.Description}
                        </p>
                    </div>
                    <img class='AB_Sidebar_List_Item_Jump' src='../Assets/Icons/iconNew_link.png' draggable='false' loading='lazy' onclick="Editor_Element_JumpTo('Element_${a}')"/>
                    <img class='AB_Sidebar_List_Item_Delete' src='../Assets/Icons/iconNew_delete.png' draggable='false' loading='lazy' onclick="Editor_Element_Delete('${a}')"/>
                </div>
                <div class="AB_Sidebar_List_Item_Inserter" id="Insert_${a}" onclick="Editor_Element_Rearrange_Insert(${a}, ${a + 1})">
                <p class="AB_Sidebar_List_Item_Inserter_Text">
                    Insert between
                </p>
            </div>
            `;
        }
        if (Object.Type == "Numbered_List"){
            Element_InnerHTML = `
                <div class="AB_Element_List" Element_Type="Numbered_List" id="Element_${a}">
                    <input type="text" class="Input_Text AB_Editor_Input List_Header" id="" autocomplete="off" placeholder="Numbered list header" onchange="Editor_Article_Data_Update()"/>
                    <textarea type="text" class="Input_Text_Long AB_Editor_Input List_Contents" id="" autocomplete="off" Autoresize="true" placeholder="List contents (Use line breaks to separate line items)" onchange="Editor_Article_Data_Update()"></textarea>
                </div>
            `;
            Sidebar_InnerHTML = `
                <div class="AB_Sidebar_List_Item" id="Sidebar_${a}">
                    <div class="AB_Sidebar_List_Item_Content" onclick="Editor_Element_Rearrange_Switch(${a}, this.parentNode.id)">
                        <p class="AB_Sidebar_List_Item_Type">
                            ${Object.Type}
                        </p>
                        <p class="AB_Sidebar_List_Item_Text">
                            ${Object.Header}
                        </p>
                    </div>
                    <img class='AB_Sidebar_List_Item_Jump' src='../Assets/Icons/iconNew_link.png' draggable='false' loading='lazy' onclick="Editor_Element_JumpTo('Element_${a}')"/>
                    <img class='AB_Sidebar_List_Item_Delete' src='../Assets/Icons/iconNew_delete.png' draggable='false' loading='lazy' onclick="Editor_Element_Delete('${a}')"/>
                </div>
                <div class="AB_Sidebar_List_Item_Inserter" id="Insert_${a}" onclick="Editor_Element_Rearrange_Insert(${a}, ${a + 1})">
                <p class="AB_Sidebar_List_Item_Inserter_Text">
                    Insert between
                </p>
            </div>
            `;
        }
        if (Object.Type == "Bulleted_List"){
            Element_InnerHTML = `
                <div class="AB_Element_List" Element_Type="Bulleted_List" id="Element_${a}">
                    <input type="text" class="Input_Text AB_Editor_Input List_Header" id="" autocomplete="off" placeholder="Bulleted list header" onchange="Editor_Article_Data_Update()"/>
                    <textarea type="text" class="Input_Text_Long AB_Editor_Input List_Contents" id="" autocomplete="off" Autoresize="true" placeholder="List contents (Use line breaks to separate line items)" onchange="Editor_Article_Data_Update()"></textarea>
                </div>
            `;
            Sidebar_InnerHTML = `
                <div class="AB_Sidebar_List_Item" id="Sidebar_${a}">
                    <div class="AB_Sidebar_List_Item_Content" onclick="Editor_Element_Rearrange_Switch(${a}, this.parentNode.id)">
                        <p class="AB_Sidebar_List_Item_Type">
                            ${Object.Type}
                        </p>
                        <p class="AB_Sidebar_List_Item_Text">
                            ${Object.Header}
                        </p>
                    </div>
                    <img class='AB_Sidebar_List_Item_Jump' src='../Assets/Icons/iconNew_link.png' draggable='false' loading='lazy' onclick="Editor_Element_JumpTo('Element_${a}')"/>
                    <img class='AB_Sidebar_List_Item_Delete' src='../Assets/Icons/iconNew_delete.png' draggable='false' loading='lazy' onclick="Editor_Element_Delete('${a}')"/>
                </div>
                <div class="AB_Sidebar_List_Item_Inserter" id="Insert_${a}" onclick="Editor_Element_Rearrange_Insert(${a}, ${a + 1})">
                <p class="AB_Sidebar_List_Item_Inserter_Text">
                    Insert between
                </p>
            </div>
            `;
        }
        if (Object.Type == "Quote"){
            Element_InnerHTML = `
                <div class="AB_Element_Quote" Element_Type="Quote" id="Element_${a}">
                    <h1 class="AB_Element_Quote_Apostrophe Apostrophe_1">
                        "
                    </h1>
                    <textarea type="text" class="Input_Text_Long AB_Editor_Input AB_Element_Quote_Contents Quote_Content" id="" autocomplete="off" Autoresize="true" placeholder="Quote" onchange="Editor_Article_Data_Update()"></textarea>
                    <h1 class="AB_Element_Quote_Apostrophe Apostrophe_2">
                        "
                    </h1>
                    <input type="text" class="Input_Text AB_Editor_Input AB_Element_Quote_Source Quote_Source" id="" autocomplete="off" placeholder="Source" onchange="Editor_Article_Data_Update()"/>
                </div>
            `;
        }
        if (Object.Type == "Video"){
            Element_InnerHTML = `
                <div class="AB_Element_Video" Element_Type="Video" id="Element_${a}">
                    <iframe class="AB_Element_Video_Video" src="${Object.Source}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>
                    <input type="text" class="Input_Text AB_Editor_Input Video_Source" id="" autocomplete="off" placeholder="Source" onchange="Editor_Article_Data_Update()"/>
                </div>
            `;
            Sidebar_InnerHTML = `
                <div class="AB_Sidebar_List_Item" id="Sidebar_${a}">
                    <div class="AB_Sidebar_List_Item_Content" onclick="Editor_Element_Rearrange_Switch(${a}, this.parentNode.id)">
                        <p class="AB_Sidebar_List_Item_Type">
                            ${Object.Type}
                        </p>
                        <p class="AB_Sidebar_List_Item_Text">
                            ${Object.Source}
                        </p>
                    </div>
                    <img class='AB_Sidebar_List_Item_Jump' src='../Assets/Icons/iconNew_link.png' draggable='false' loading='lazy' onclick="Editor_Element_JumpTo('Element_${a}')"/>
                    <img class='AB_Sidebar_List_Item_Delete' src='../Assets/Icons/iconNew_delete.png' draggable='false' loading='lazy' onclick="Editor_Element_Delete('${a}')"/>
                </div>
                <div class="AB_Sidebar_List_Item_Inserter" id="Insert_${a}" onclick="Editor_Element_Rearrange_Insert(${a}, ${a + 1})">
                <p class="AB_Sidebar_List_Item_Inserter_Text">
                    Insert between
                </p>
            </div>
            `;
        }
        var Element = document.createElement('span');
        Element.innerHTML = Element_InnerHTML;

        var Sidebar = document.createElement('span');
        Sidebar.innerHTML = Sidebar_InnerHTML;

        document.getElementById("AB_Editor_Content").appendChild(Element);
        document.getElementById("AB_Sidebar_List").appendChild(Sidebar);
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
        if (Element_Type == "Primary_Title"){
            Element.value = AB_Editor_Data.Contents[a].Content;
        }
        if (Element_Type == "Secondary_Title"){
            Element.value = AB_Editor_Data.Contents[a].Content;
        }
        if (Element_Type == "Paragraph"){
            Element.value = AB_Editor_Data.Contents[a].Content;
        }
        if (Element_Type == "Image"){
            Element.querySelector(".Image_Source").value = AB_Editor_Data.Contents[a].Source;
            Element.querySelector(".Image_Description").value = AB_Editor_Data.Contents[a].Description;
            Element.querySelector(".Image_Credits").value = AB_Editor_Data.Contents[a].Credits;
        }
        if (Element_Type == "Numbered_List"){
            Element.querySelector(".List_Header").value = AB_Editor_Data.Contents[a].Header;
            Element.querySelector(".List_Contents").value = AB_Editor_Data.Contents[a].Content;
        }
        if (Element_Type == "Bulleted_List"){
            Element.querySelector(".List_Header").value = AB_Editor_Data.Contents[a].Header;
            Element.querySelector(".List_Contents").value = AB_Editor_Data.Contents[a].Content;
        }
        if (Element_Type == "Quote"){
            Element.querySelector(".Quote_Content").value = AB_Editor_Data.Contents[a].Content;
            Element.querySelector(".Quote_Source").value = AB_Editor_Data.Contents[a].Source;
        }
        if (Element_Type == "Quote"){
            Element.querySelector(".Video_Source").value = AB_Editor_Data.Contents[a].Source;
        }
        
    }
    TextArea_SnapToSize_All();
}

function Editor_Article_Data_Update(){
    AB_Editor_Data.Metadata.Article_Banner = document.getElementById("AB_Editor_Header_Banner").value;
    AB_Editor_Data.Metadata.Article_Title = document.getElementById("AB_Editor_Header_Title").value;
    AB_Editor_Data.Metadata.Article_Title_Height = document.getElementById("AB_Editor_Header_Title").style.height;
    AB_Editor_Data.Metadata.Article_Author = document.getElementById("AB_Editor_Header_Author").value;
    AB_Editor_Data.Metadata.Article_Category = document.getElementById("AB_Editor_Header_Category").value;
    AB_Editor_Data.Metadata.Article_PublishingDate = document.getElementById("AB_Editor_Header_DatePublished").value;
    for (a = 0; a < AB_Editor_Data.Contents.length; a++){
        var Element_Type = Element_Attribute_Get("Element_" + a, "Element_Type");
        if (Element_Type == "Title_Primary"){
            AB_Editor_Data.Contents[a].Content = document.getElementById(`Element_${a}`).value;
            // AB_Editor_Data.Contents[a].Height = document.getElementById(`Element_${a}`).style.height;
        }
        if (Element_Type == "Title_Secondary"){
            AB_Editor_Data.Contents[a].Content = document.getElementById(`Element_${a}`).value;
            // AB_Editor_Data.Contents[a].Height = document.getElementById(`Element_${a}`).style.height;
        }
        if (Element_Type == "Paragraph"){
            AB_Editor_Data.Contents[a].Content = document.getElementById(`Element_${a}`).value;
            // AB_Editor_Data.Contents[a].Height = document.getElementById(`Element_${a}`).style.height;
        }
        if (Element_Type == "Image"){
            AB_Editor_Data.Contents[a].Source = document.getElementById(`Element_${a}`).querySelector(".Image_Source").value;
            AB_Editor_Data.Contents[a].Description = document.getElementById(`Element_${a}`).querySelector(".Image_Description").value;
            AB_Editor_Data.Contents[a].Credits = document.getElementById(`Element_${a}`).querySelector(".Image_Credits").value;
        }
        if (Element_Type == "Numbered_List"){
            AB_Editor_Data.Contents[a].Header = document.getElementById(`Element_${a}`).querySelector(".List_Header").value;
            AB_Editor_Data.Contents[a].Content = document.getElementById(`Element_${a}`).querySelector(".List_Contents").value;
        }
        if (Element_Type == "Bulleted_List"){
            AB_Editor_Data.Contents[a].Header = document.getElementById(`Element_${a}`).querySelector(".List_Header").value;
            AB_Editor_Data.Contents[a].Content = document.getElementById(`Element_${a}`).querySelector(".List_Contents").value;
        }
        if (Element_Type == "Quote"){
            AB_Editor_Data.Contents[a].Content = document.getElementById(`Element_${a}`).querySelector(".Quote_Content").value;
            AB_Editor_Data.Contents[a].Source = document.getElementById(`Element_${a}`).querySelector(".Quote_Source").value;
        }
        if (Element_Type == "Video"){
            AB_Editor_Data.Contents[a].Source = document.getElementById(`Element_${a}`).querySelector(".Video_Source").value;
        }
    }
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
        // WLB_WatchList_Data = WLB_WatchList_Raw_Data.WLB_WatchList_Data;
        Editor_Article_Render();
        Toasts_CreateToast("Assets/Icons/iconNew_download.png", "Article imported", `Article data successfully loaded.`);
    }

    Reader.readAsText(File_Element_File);
    Subwindows_Close("AB_Editor_Article_Import");
}

let AB_Generation_Definitions = {
    
}