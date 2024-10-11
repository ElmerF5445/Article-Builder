function AB_Renderer_Article_Render(Data){
    let Article_Data = Data;
    // Header
    document.getElementById("AB_Renderer_Banner_Image").style.display = "block";
    document.getElementById("AB_Renderer_Banner_Image").src = Article_Data.Metadata.Article_Banner;
    document.getElementById("AB_Renderer_Header_Title").innerHTML = Article_Data.Metadata.Article_Title;
    document.getElementById("AB_Renderer_Header_Details_Author").innerHTML = Article_Data.Metadata.Article_Author;
    document.getElementById("AB_Renderer_Header_Details_Category").innerHTML = Article_Data.Metadata.Article_Category;
    document.getElementById("AB_Renderer_Header_Details_PublishingDate").innerHTML = Article_Data.Metadata.Article_PublishingDate;
    // Contents

    document.getElementById("AB_Renderer_Contents").innerHTML = "";

    var Content = Article_Data.Contents;
    for (a = 0; a < Content.length; a++){
        var Content_Data = Content[a];
        var Element_InnerHTML = ``;
        if (Content_Data.Type == "Primary_Title"){
            Element_InnerHTML = `
                <h1 class="AB_Renderer_Title_Primary">
                    ${Content_Data.Content}
                </h1>
            `;
            var Element = document.createElement('span');
            Element.innerHTML = Element_InnerHTML;
            document.getElementById("AB_Renderer_Contents").appendChild(Element);
        }
        if (Content_Data.Type == "Secondary_Title"){
            Element_InnerHTML = `
                <h1 class="AB_Renderer_Title_Secondary">
                    ${Content_Data.Content}
                </h1>
            `;
            var Element = document.createElement('span');
            Element.innerHTML = Element_InnerHTML;
            document.getElementById("AB_Renderer_Contents").appendChild(Element);
        }
        if (Content_Data.Type == "Tertiary_Title"){
            Element_InnerHTML = `
                <h1 class="AB_Renderer_Title_Tertiary">
                    ${Content_Data.Content}
                </h1>
            `;
            var Element = document.createElement('span');
            Element.innerHTML = Element_InnerHTML;
            document.getElementById("AB_Renderer_Contents").appendChild(Element);
        }
        if (Content_Data.Type == "Paragraph"){
            Element_InnerHTML = `
                <p class="AB_Renderer_Paragraph">
                    ${Content_Data.Content}
                </p>
            `;
            var Element = document.createElement('span');
            Element.innerHTML = Element_InnerHTML;
            document.getElementById("AB_Renderer_Contents").appendChild(Element);
        }
        if (Content_Data.Type == "Numbered_List"){
            Element_InnerHTML = `
                <div class="AB_Renderer_List">
                    <p class="AB_Renderer_List_Header">
                        ${Content_Data.Header}
                    </p>
                    <ol id="Numbered_List_Item_${a}">
                        
                    </ol>
                </div>
            `;

            var Element = document.createElement('span');
            Element.innerHTML = Element_InnerHTML;
            document.getElementById("AB_Renderer_Contents").appendChild(Element);

            var Element_Subdata = Content_Data.Content.split(/\r?\n|\r|\n/g);
            for (b = 0; b < Element_Subdata.length; b++){
                var Element_Subdata_Element = document.createElement("li");
                Element_Subdata_Element.setAttribute('class', 'AB_Renderer_List_Content');
                Element_Subdata_Element.innerHTML = Element_Subdata[b];
                document.getElementById("Numbered_List_Item_" + a).appendChild(Element_Subdata_Element);
            }
        }
        if (Content_Data.Type == "Bulleted_List"){
            Element_InnerHTML = `
                <div class="AB_Renderer_List">
                    <p class="AB_Renderer_List_Header">
                        ${Content_Data.Header}
                    </p>
                    <ul id="Bulleted_List_Item_${a}">
                        
                    </ul>
                </div>
            `;

            var Element = document.createElement('span');
            Element.innerHTML = Element_InnerHTML;
            document.getElementById("AB_Renderer_Contents").appendChild(Element);

            var Element_Subdata = Content_Data.Content.split(/\r?\n|\r|\n/g);
            for (b = 0; b < Element_Subdata.length; b++){
                var Element_Subdata_Element = document.createElement("li");
                Element_Subdata_Element.setAttribute('class', 'AB_Renderer_List_Content');
                Element_Subdata_Element.innerHTML = Element_Subdata[b];
                document.getElementById("Bulleted_List_Item_" + a).appendChild(Element_Subdata_Element);
            }
        }
        if (Content_Data.Type == "Quote"){
            Element_InnerHTML = `
                <div class="AB_Renderer_Quote">
                    <h1 class="AB_Renderer_Quote_Apostrophe Apostrophe_1">
                        "
                    </h1>
                    <h3 class="AB_Renderer_Quote_Content">
                        ${Content_Data.Content}
                    </h3>
                    <h1 class="AB_Renderer_Quote_Apostrophe Apostrophe_2">
                        "
                    </h1>
                    <h4 class="AB_Renderer_Quote_Source">
                        ${Content_Data.Source}
                    </h4>
                </div>
            `;
            var Element = document.createElement('span');
            Element.innerHTML = Element_InnerHTML;
            document.getElementById("AB_Renderer_Contents").appendChild(Element);
        }
        if (Content_Data.Type == "Image"){
            Element_InnerHTML = `
                <div class="AB_Renderer_Image">
                    <div class="AB_Renderer_Image_Container">
                        <img class='AB_Renderer_Image_Image' src='${Content_Data.Source}' draggable='false' loading='lazy'/>
                    </div>
                    <p class="AB_Renderer_Image_Description">
                        ${Content_Data.Description}
                    </p>
                    <p class="AB_Renderer_Image_Credits">
                        ${Content_Data.Credits}
                    </p>
                </div>
            `;
            var Element = document.createElement('span');
            Element.innerHTML = Element_InnerHTML;
            document.getElementById("AB_Renderer_Contents").appendChild(Element);
        }
        if (Content_Data.Type == "Video"){
            Element_InnerHTML = `
                <div class="AB_Renderer_Video">
                    <iframe class="AB_Renderer_Video_Video" src="${Content_Data.Source}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>
                </div>
            `;
            var Element = document.createElement('span');
            Element.innerHTML = Element_InnerHTML;
            document.getElementById("AB_Renderer_Contents").appendChild(Element);
        }
    }
}

