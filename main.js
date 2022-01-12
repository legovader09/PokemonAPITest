const url = new URL(window.location.href);
const errMsg = document.getElementById("errorMsg");
const searchTxt = document.getElementById("txtSearch");

/// FUNCTIONS
checkParams = () => {
    const params = url.searchParams.get("q");
    if (params) 
    {
        searchTxt.value = params;
        doSearch(params);
    }
}

doSearch = input => {
    input = input.toLowerCase();
    if (!verifyText(input)) return displayErrorMessage();
    console.log("text verified");
    fetch('https://pokeapi.co/api/v2/pokemon/' + input).then(response => {
        if (!response.ok)
            throw new Error("response returned: " + response.status);
        else
            response.json().then(json => document.getElementById("content").appendChild(document.createTextNode(JSON.stringify(json, null, 4))));
    }).catch(err => {
        console.error(err)
        displayErrorMessage();
    });
}

displayErrorMessage = () => {
    errMsg.style.display = "block";
}

verifyText = txt => {
    if (!txt) return false; //if empty 
    return (/^[a-zA-Z]*$/.test(txt) || /^\d+$/.test(txt))
}

/// ON LOAD
document.getElementById("btnSearch").addEventListener('click', function(){
    errMsg.style.display = "none";
    doSearch(searchTxt.value);
    url.searchParams.set("q", searchTxt.value);
    window.history.replaceState(null, null, url);
})

checkParams();
