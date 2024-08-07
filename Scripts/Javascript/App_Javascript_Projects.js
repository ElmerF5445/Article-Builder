console.log("Projects are enabled");
var Projects_KeyPrefix = App_Info.Key_Prefix;
var Projects_AssociatedApp = App_Info.Title;
var Projects_Version = 1;

// window.addEventListener('DOMContentLoaded', () => {
//     if (App_Property.Features.Projects == true){
//         Projects_Check_Manifest();
//     }
// });

function Projects_Check_Manifest(){
    if (localStorage.getItem(Projects_KeyPrefix + "_Manifest") != null){
        console.log("Project manifest found");
        Projects_Load_Manifest();
        Projects_Generate_List();
    } else if (localStorage.getItem(Projects_KeyPrefix + "_Manifest") == null){
        console.log("No project manifest found. Creating a new one.");
        Projects_Create_EmptyManifest();
    }
}

function Projects_Create_EmptyManifest(){
    var Projects_Manifest_Format = {
        "Projects_BasicInformation": {
            "AssociatedApp": Projects_AssociatedApp,
            "FormatVersion": Projects_Version,
            "Key_Prefix": Projects_KeyPrefix
        },
        "Project": []
    };
    // Projects_Manifest_Format = {
    //     "Projects_BasicInformation": {
    //         "AssociatedApp": "ERUMAUI",
    //         "FormatVersion": 1,
    //         "Key_Prefix": "ERUMAUI"
    //     },
    //     "Project": [
    //         {
    //             "ID": 1,
    //             "Key": "TestProject",
    //             "Name": "Project name",
    //             "Date_Created": "22 March 2024",
    //             "Date_Modified": "22 March 2024",
    //             "Extra_Information": []
    //         }, 
    //         {
    //             "ID": 2,
    //             "Key": "TestProject",
    //             "Name": "Project name 2",
    //             "Date_Created": "22 March 2024",
    //             "Date_Modified": "22 March 2024",
    //             "Extra_Information": []
    //         }
    //         , 
    //         {
    //             "ID": 3,
    //             "Key": "TestProject",
    //             "Name": "Project name 3",
    //             "Date_Created": "22 March 2024",
    //             "Date_Modified": "22 March 2024",
    //             "Extra_Information": []
    //         }, 
    //         {
    //             "ID": 4,
    //             "Key": "TestProject",
    //             "Name": "Project name 4",
    //             "Date_Created": "22 March 2024",
    //             "Date_Modified": "22 March 2024",
    //             "Extra_Information": []
    //         }
    //     ]
    // };
    localStorage.setItem(Projects_KeyPrefix + "_Manifest", JSON.stringify(Projects_Manifest_Format));
    console.log("Empty manifest created.");
    Projects_Check_Manifest();
}

let Projects_Manifest;
let Projects_List = [];

function Projects_Load_Manifest(){
    Projects_Manifest = JSON.parse(localStorage.getItem(Projects_KeyPrefix + "_Manifest"));
    Projects_List = Projects_Manifest.Project;
}

function Projects_Open_ProjectList(){
    Projects_Generate_List();
    Subwindows_Open("Projects_List_Window");
}

function Projects_Generate_List(){
    document.getElementById("Projects_List").innerHTML = "";
    for (a = 0; a != Projects_List.length; a++){
        var Projects_List_Item_ID = Projects_List[a].ID;
        var Projects_List_Item_Key = Projects_List[a].Key;
        var Projects_List_Item_Name = Projects_List[a].Name;
        var Projects_List_Item_Date_Created = Projects_List[a].Date_Created;
        var Projects_List_Item_Date_Modified = Projects_List[a].Date_Modified;
        let Projects_List_Item_HTML = `
        <div class="Projects_List_Item">
            <div class="Projects_List_Item_Information" onclick="Projects_Load_Project(${a + 1}), Subwindows_Close('Projects_List_Window')">
                <h3 class="Projects_List_Item_Information_Title">
                    ${Projects_List_Item_Name}
                </h3>
                <div class="Projects_List_Item_Information_Details">
                    <p class="Projects_List_Item_Information_Details_Item">
                        Created: ${Projects_List_Item_Date_Created}
                    </p>
                    <p class="Projects_List_Item_Information_Details_Item">
                        Modified: ${Projects_List_Item_Date_Modified}
                    </p>
                </div>
            </div>
            <div class="Projects_List_Item_Controls">
                <div class="Projects_List_Item_Controls_Item" onclick="Projects_Download_Project(${a})">
                    <img class='Projects_List_Item_Controls_Item_Icon' src='Assets/Icons/icon_download.png' draggable='false' loading='lazy'/>
                </div>
                <div class="Projects_List_Item_Controls_Item" onclick="Projects_Delete_Project(${a})">
                    <img class='Projects_List_Item_Controls_Item_Icon' src='Assets/Icons/iconNew_delete.png' draggable='false' loading='lazy'/>
                </div>
            </div>
        </div>
        `;
        var Projects_List_Item = document.createElement('span');
        Projects_List_Item.innerHTML = Projects_List_Item_HTML;
        document.getElementById("Projects_List").appendChild(Projects_List_Item);
    }
}

function Projects_Check_Input(ID, Disabled_Consequence){
    if (document.getElementById(ID).value == ""){
        Element_Attribute_Set(Disabled_Consequence, "Clickability", "Disabled");
    } else if (document.getElementById(ID).value != ""){
        Element_Attribute_Remove(Disabled_Consequence, "Clickability");
    }
}

function Projects_Create_NewProject_Check_Existence(){
    var Projects_ProjectExists;
    for (a = 0; a != Projects_List.length; a++){
        if (Projects_List[a].Name == document.getElementById('Projects_Create_NewProject_Name').value){
            Projects_ProjectExists = true;
            break;
        }
    }
    if (Projects_ProjectExists == true){
        Subwindows_Open('Projects_Create_NewProject_Overwrite');
    } else {
        console.log("Project doesn't exist, creating project");
        Projects_Create_NewProject("New", "");
        document.getElementById("Projects_Create_NewProject_Name").value = "";
    }
}

function Projects_Create_NewProject_Overwrite_ExistingProject(){
    console.log("Overwriting project");
    Projects_Create_NewProject("Overwrite", "");
    Subwindows_Close('Projects_Create_NewProject_Overwrite');
    document.getElementById("Projects_Create_NewProject_Name").value = "";
}

function Projects_Create_NewProject(Mode, Data){
    if (Mode == "New"){
        console.log("Adding project to manifest");
        var Projects_NewProject_Name = document.getElementById("Projects_Create_NewProject_Name").value;
        var Projects_NewProject_Key = Projects_NewProject_Name.replaceAll(" ", "_");
        let Projects_NewProject_ManifestData = {
            "ID": `${Projects_List.length}`,
            "Key": `${Projects_NewProject_Key}`,
            "Name": `${Projects_NewProject_Name}`,
            "Date_Created": Projects_Get_Date(),
            "Date_Modified": Projects_Get_Date(),
            "Extra_Information": []
        };
        Projects_List.push(Projects_NewProject_ManifestData);
        console.log("Project added to manifest");
        console.log("Updating manifest key");
        var Projects_Manifest_Format = {
            "Projects_BasicInformation": {
                "AssociatedApp": Projects_AssociatedApp,
                "FormatVersion": Projects_Version,
                "Key_Prefix": Projects_KeyPrefix
            },
            "Project": Projects_List
        };
        localStorage.setItem(Projects_KeyPrefix + "_Manifest", JSON.stringify(Projects_Manifest_Format));
        console.log("Manifest key updated");
    } else if (Mode == "Overwrite") {
        console.log("Overwriting project in manifest");
        var Projects_NewProject_ExistingProjectIndex;
        for (a = 0; a != Projects_List.length; a++){
            if (Projects_List[a].Name == document.getElementById("Projects_Create_NewProject_Name").value){
                Projects_NewProject_ExistingProjectIndex = a;
                break;
            }
        }
        var Projects_NewProject_Name = document.getElementById("Projects_Create_NewProject_Name").value;
        var Projects_NewProject_Key = Projects_NewProject_Name.replaceAll(" ", "_");
        let Projects_NewProject_ManifestData = {
            "ID": `${Projects_List.length}`,
            "Key": `${Projects_NewProject_Key}`,
            "Name": `${Projects_NewProject_Name}`,
            "Date_Created": Projects_Get_Date(),
            "Date_Modified": Projects_Get_Date(),
            "Extra_Information": []
        };
        Projects_List[Projects_NewProject_ExistingProjectIndex] = Projects_NewProject_ManifestData;
        console.log("Manifest entry overwritten");
    } else if (Mode == "NewOrOverwrite") {
        var Projects_ProjectExists;
        for (a = 0; a != Projects_List.length; a++){
            if (Projects_List[a].Name == document.getElementById('Projects_Create_NewProject_Name').value){
                Projects_ProjectExists = true;
                break;
            }
        }
        if (Projects_ProjectExists == true){
            console.log("Overwriting project in manifest");
            var Projects_NewProject_ExistingProjectIndex;
            for (a = 0; a != Projects_List.length; a++){
                if (Projects_List[a].Name == document.getElementById("Projects_Create_NewProject_Name").value){
                    Projects_NewProject_ExistingProjectIndex = a;
                    break;
                }
            }
            var Projects_NewProject_Name = document.getElementById("Projects_Create_NewProject_Name").value;
            var Projects_NewProject_Key = Projects_NewProject_Name.replaceAll(" ", "_");
            let Projects_NewProject_ManifestData = {
                "ID": `${Projects_List.length}`,
                "Key": `${Projects_NewProject_Key}`,
                "Name": `${Projects_NewProject_Name}`,
                "Date_Created": Projects_Get_Date(),
                "Date_Modified": Projects_Get_Date(),
                "Extra_Information": []
            };
            Projects_List[Projects_NewProject_ExistingProjectIndex] = Projects_NewProject_ManifestData;
            console.log("Manifest entry overwritten");
        } else {
            console.log("Adding project to manifest");
            var Projects_NewProject_Name = document.getElementById("Projects_Create_NewProject_Name").value;
            var Projects_NewProject_Key = Projects_NewProject_Name.replaceAll(" ", "_");
            let Projects_NewProject_ManifestData = {
                "ID": `${Projects_List.length}`,
                "Key": `${Projects_NewProject_Key}`,
                "Name": `${Projects_NewProject_Name}`,
                "Date_Created": Projects_Get_Date(),
                "Date_Modified": Projects_Get_Date(),
                "Extra_Information": []
            };
            Projects_List.push(Projects_NewProject_ManifestData);
            console.log("Project added to manifest");
            console.log("Updating manifest key");
            var Projects_Manifest_Format = {
                "Projects_BasicInformation": {
                    "AssociatedApp": Projects_AssociatedApp,
                    "FormatVersion": Projects_Version,
                    "Key_Prefix": Projects_KeyPrefix
                },
                "Project": Projects_List
            };
            localStorage.setItem(Projects_KeyPrefix + "_Manifest", JSON.stringify(Projects_Manifest_Format));
            console.log("Manifest key updated");
        }
    }
    
    console.log("Creating project key");
    let Projects_NewProject_Data;
    if (Data == "" || Data == null){
        Projects_NewProject_Data = {
            "Project_BasicInformation": {
                "Name": document.getElementById("Projects_Create_NewProject_Name").value,
                "AssociatedApp": Projects_AssociatedApp,
                "FormatVersion": Projects_Version,
                "Key_Prefix": Projects_KeyPrefix
            },
            "Project_Data": {
                
            }
        }
    } else {
        Projects_NewProject_Data = Data;
    }
    
    localStorage.setItem(Projects_KeyPrefix + "_" + Projects_NewProject_Key, JSON.stringify(Projects_NewProject_Data));
    console.log("Project key saved");
    Projects_Generate_List();
    Projects_Load_Project(Projects_List.length);
    Subwindows_Close('Projects_Create_NewProject');
    Subwindows_Close('Projects_List_Window');
}

function Projects_Get_Date(){
    const CurrentDate = new Date();
    var Date_Month_Index = CurrentDate.getMonth();
    var Date_Month_Array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var Date_Month = Date_Month_Array[Date_Month_Index];
    var Date_Day = CurrentDate.getDate();
    var Date_Year = CurrentDate.getFullYear();
    return `${Date_Day} ${Date_Month} ${Date_Year}`;
}

var Projects_CurrentlyLoadedProject;
var Projects_CurrentlyLoadedProject_Name;
var Projects_CurrentlyLoadedProject_Key;
var Projects_CurrentlyLoadedProject_Content;
var Projects_CurrentlyLoadedProject_Data; // Program using the system must handle and get the data from here
var Projects_CurrentlyLoadedProject_Data_WorkingProgress;
var Projects_CurrentlyLoadedProject_SaveStatus = 0; // 0 - Progress has not been saved; 1 - Progress have been saved, but is not committed to local storage; 2 - Progress have been committed to local storage

function Projects_Load_Project(Index){
    Projects_CurrentlyLoadedProject = Projects_List[Index - 1];
    Projects_CurrentlyLoadedProject_Name = Projects_List[Index - 1].Name;
    Projects_CurrentlyLoadedProject_Key = Projects_List[Index - 1].Key;
    Projects_CurrentlyLoadedProject_Content = JSON.parse(localStorage.getItem(Projects_KeyPrefix + "_" + Projects_CurrentlyLoadedProject_Key));
    Projects_CurrentlyLoadedProject_Data = Projects_CurrentlyLoadedProject_Content.Project_Data;
    Projects_CurrentlyLoadedProject_Data_WorkingProgress = Projects_CurrentlyLoadedProject_Data;
    Toasts_CreateToast("Assets/Icons/iconNew_save.png", "Project loaded", `Project loaded named ${Projects_CurrentlyLoadedProject_Name}`);
    document.getElementById("Projects_CurrentlyLoaded_Information_Title").innerText = Projects_CurrentlyLoadedProject_Name;
    document.getElementById("Projects_CurrentlyLoaded_Controls").style.display = "flex";
}

// Saves to working progress but does not save to local storage
// ProgressData must be handled by the program using the system
function Projects_Save_Progress(ProgressData){
    Projects_CurrentlyLoadedProject_SaveStatus = 1;
    Projects_CurrentlyLoadedProject_Data_WorkingProgress = ProgressData;
    Toasts_CreateToast("Assets/Icons/iconNew_save.png", "Progress saved", `Make sure to save to project in order to save the data to local storage.`);
}

// Saves to local storage; must first trigger Projects_Save_Progress
function Projects_Save_Project(){
    Projects_CurrentlyLoadedProject_SaveStatus = 2;
    Projects_CurrentlyLoadedProject_Data = Projects_CurrentlyLoadedProject_Data_WorkingProgress;
    // Loops through all the keys in the manifest to find match with loaded key
    var Projects_CurrentlyLoadedProject_Index;
    for (a = 0; a != Projects_List.length; a++){
        if (Projects_List[a].Key == Projects_CurrentlyLoadedProject_Key){
            Projects_CurrentlyLoadedProject_Index = a;
            break;
        }
    }
    Projects_List[Projects_CurrentlyLoadedProject_Index].Date_Modified = Projects_Get_Date();
    Projects_Update_Manifest();
    console.log("Updated manifest information");
    Projects_CurrentlyLoadedProject_Content.Project_Data = Projects_CurrentlyLoadedProject_Data;
    localStorage.setItem(Projects_KeyPrefix + "_" + Projects_CurrentlyLoadedProject_Key, JSON.stringify(Projects_CurrentlyLoadedProject_Content));
    Toasts_CreateToast("Assets/Icons/iconNew_save.png", "Project saved", `Project named ${Projects_CurrentlyLoadedProject_Name} has been saved into local storage.`);
    console.log("Saved project");
    Projects_CurrentlyLoadedProject_SaveStatus = 0;
}

function Projects_Update_Manifest(){
    Projects_Manifest.Project = Projects_List;
    localStorage.setItem(Projects_KeyPrefix + "_Manifest", JSON.stringify(Projects_Manifest));
}

function Projects_Download_Project(Index){
    var Projects_DownloadProject_Content = JSON.parse(localStorage.getItem(Projects_KeyPrefix + "_" + Projects_List[Index].Key));
    var Projects_DownloadProject_Name = Projects_KeyPrefix + "_" + Projects_List[Index].Key;
    Projects_Download_Data(Projects_DownloadProject_Content, Projects_DownloadProject_Name);
    Toasts_CreateToast("Assets/Icons/iconNew_download.png", "Downloading project", `Now downloading project named ${Projects_DownloadProject_Name}. Please wait.`);
}

function Projects_Download_Data(Project_Data, Project_Name){
    var Data_JSON = JSON.stringify(Project_Data, null, 2);
    const Data_Blob = new Blob([Data_JSON], {type: 'application/json'});
    saveAs(Data_Blob, Project_Name + ".json");
}

function Projects_Upload_Project(){
    Toasts_CreateToast("Assets/Icons/icon_output.png", "Importing project", `Now copying data from file and saving it as a project in local storage. Please wait.`);
    var Projects_UploadProject_File_Element = document.getElementById("Projects_Open_Project_FromFile_Input");
    var Projects_UploadProject_File = Projects_UploadProject_File_Element.files[0];
    const Reader = new FileReader();
    Reader.onload = function(e){
        const Contents = e.target.result;
        const Data_JSON = JSON.parse(Contents);
        Projects_Upload_Data(Data_JSON);
    }

    Reader.readAsText(Projects_UploadProject_File);
    Subwindows_Close("Projects_Open_Project_FromFile");
}

function Projects_Upload_Data(Receiving_Data){
    Toasts_CreateToast("Assets/Icons/icon_output.png", "Creating project", `Creating project with imported data`);
    document.getElementById("Projects_Create_NewProject_Name").value = Receiving_Data.Project_BasicInformation.Name;
    Projects_Create_NewProject("NewOrOverwrite", Receiving_Data);
}