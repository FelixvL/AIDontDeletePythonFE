const url = "http://127.0.0.1:5000/lvs/";
// const url = "https://aidontdeletepython.azurewebsites.net/lvs/";
function voer_fetch_uit(endpoint, callback){
    fetch(url + endpoint)
    .then(r => r.json())
    .then(d => callback(d))
}
function voer_post_fetch_uit(endpoint, de_json, callback){
    fetch(url + endpoint, {
        method: 'POST', // Specify the HTTP method as POST
        headers: {
          'Content-Type': 'application/json' // Specify the content type as JSON
        },
        body: de_json // Convert the data object to a JSON string
      })
      .then(r => callback())

}
function alle_lesstof_items(){
    voer_fetch_uit("allelesstofitems", toon_alle_lesstof_items)
}
function toon_alle_lesstof_items(data){
    eindString = `<table>`;
    for(let x = 0; x < data.length; x++){
        eindString += `
            <tr><td>${data[x].naam}</td></tr>
        `
    }
    eindString += `</table>`;
    document.getElementById("uitkomst").innerHTML = eindString;
}
function docent_alle_trajecten(){
    voer_fetch_uit("docent_alle_trajecten",toon_docent_alle_trajecten);
}
function toon_docent_alle_trajecten(data){
    eindString = `<table>`;
    for(let x = 0; x < data.length; x++){
        eindString += `
            <tr><td><div class="traject"><a href="docent_invoeren_lesstofitems.html?tid=${data[x].id}">${data[x].naam}</a><div></td></tr>
        `
    }
    eindString += `</table>`;
    document.getElementById("uitkomst").innerHTML = eindString;   
}
let tid_g;
let sid_g;
function docent_alle_lesstofitems_per_traject(){
    tid_g = new URLSearchParams(window.location.search).get("tid");
    let zoekterm = dg("zoekterm").value;
    if(zoekterm == ''){
        zoekterm = 'xxxxx';
    }
    voer_fetch_uit("docent_alle_lesstofitems_per_traject/"+tid_g+"/"+zoekterm,toon_docent_alle_lesstofitems_per_traject);
}
function docent_alle_definities(){
    let zoekterm = dg("zoekterm").value;
    if(zoekterm == ''){
        zoekterm = 'xxxxx';
    }
    voer_fetch_uit("docent_alle_definities/"+zoekterm,toon_docent_alle_definities);
}
function toon_docent_alle_lesstofitems_per_traject(data){
    eindString = `<table>`;
    for(let x = 0; x < data.length; x++){
        const checkofdisabled = data[x].statustraject == 'checked' ? 'disabled' : `onclick="ken_lesstofitem_toe_aan_traject(${tid_g}, ${data[x].lesstofitemid})"`
        eindString += `
            <tr>
            <td><input type=checkbox ${data[x].statustraject} ${checkofdisabled} ></td>
            <td onclick="inhoud_lesstofitem(${data[x].lesstofitemid})">${data[x].lesstofitemnaam}</td>
            <td><div id="lesstofitem_div${data[x].lesstofitemid}"></div></td>
            </tr>
        `
    }
    eindString += `</table>`;
    document.getElementById("uitkomst").innerHTML = eindString;   
}
function toon_docent_alle_definities(data){
    eindString = `<table>`;
    for(let x = 0; x < data.length; x++){
        eindString += `
            <tr>
            <td>${data[x].term}</td><td>${data[x].definitie}</td>
            </tr>
        `
    }
    eindString += `</table>`;
    document.getElementById("uitkomst_definities").innerHTML = eindString; 
}
function student_alle_trajecten(sid){
    sid_g = sid;
    voer_fetch_uit("student_alle_lesstofitems_per_traject/"+sid, toon_student_alle_lesstofitems_per_traject);
}
function toon_student_alle_lesstofitems_per_traject(data){
    eindString = `<table>`;
    for(let x = 0; x < data.length; x++){
        const checkofdisabled = data[x].statusstudent == 'checked' ? 'disabled' : `onclick="student_ken_lesstofitem_toe_aan_student(${sid_g}, ${data[x].lesstofitemid})"`
        eindString += `
            <tr>
            <td><input type=checkbox ${data[x].statusstudent} ${checkofdisabled} ></td>
            <td>${data[x].lesstofitemnaam}</td>
            </tr>
        `
    }
    eindString += `</table>`;
    document.getElementById("uitkomst").innerHTML = eindString; 
}
function ken_lesstofitem_toe_aan_traject(tid, lsid){
    voer_fetch_uit("docent_ken_lesstofitem_toe_aan_traject/"+tid+"/"+lsid, toon_docent_ken_lesstofitem_toe_aan_traject);
}
function toon_docent_ken_lesstofitem_toe_aan_traject(data){
    window.location = window.location;
}
function student_ken_lesstofitem_toe_aan_student(sid_g, lsid){
    voer_fetch_uit("student_ken_lesstofitem_toe_aan_student/"+sid_g+"/"+lsid, toon_student_ken_lesstofitem_toe_aan_student);

}
function toon_student_ken_lesstofitem_toe_aan_student(data){
    window.location = window.location;
}
function dg(naam){
    return document.getElementById(naam);
}
function alle_studenten(){
    voer_fetch_uit("alle_studenten", toon_alle_studenten);
}
function toon_alle_studenten(data){
    eindString = `<table>`;
    for(let x = 0; x < data.length; x++){
        eindString += `
            <tr><td> <a href="student_invoeren.html?sid=${data[x].id}">${data[x].naam}</a></td></tr>
        `
    }
    eindString += `</table>`;
    document.getElementById("lijst_studenten").innerHTML = eindString;   

}
function inloggen(){
    let wachtwoord = dg("inlognaam").value;
    voer_fetch_uit("inloggen/"+wachtwoord, toon_inloggen);
}
function toon_inloggen(data){
    window.location = data.docenturl;
}
function inhoud_lesstofitem(lsid){
    voer_fetch_uit("inhoud_lesstofitem/"+lsid, toon_inhoud_lesstofitem)
}
function toon_inhoud_lesstofitem(data){
    dg("lesstofitem_div"+data[0].id).innerHTML = data[0].inhoud
}