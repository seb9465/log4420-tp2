function loadDescription() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(document.getElementsByClassName("jumbotron"));
            const text = JSON.parse(this.responseText)["description"];
            document.getElementsByClassName("jumbotron")[0].innerHTML = "<p>" + text.split(";").join("</p><p>") + "</p>";
        }
    };
    xhttp.open("GET", "api/description", true);
    xhttp.send();
}
loadDescription();