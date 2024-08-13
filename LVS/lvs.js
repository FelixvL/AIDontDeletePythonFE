//const url = "http://127.0.0.1:5000/lvs/";
const url = "https://aidontdeletepython.azurewebsites.net/lvs/";
function voer_fetch_uit(endpoint, callback){
    fetch(url + endpoint)
    .then(r => r.json())
    .then(d => callback(d))
}
function voer_post_fetch_uit(endpoint, de_json){
    fetch(url + endpoint, {
        method: 'POST', // Specify the HTTP method as POST
        headers: {
          'Content-Type': 'application/json' // Specify the content type as JSON
        },
        body: de_json // Convert the data object to a JSON string
      })
      .then(r => console.log(r))

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
            <tr><td><a href="docent_invoeren_lesstofitems.html?tid=${data[x].id}">${data[x].naam}</a></td></tr>
        `
    }
    eindString += `</table>`;
    document.getElementById("uitkomst").innerHTML = eindString;   
}
let tid_g;
let sid_g;
function docent_alle_lesstofitems_per_traject(){
    tid_g = new URLSearchParams(window.location.search).get("tid");
    voer_fetch_uit("docent_alle_lesstofitems_per_traject/"+tid_g,toon_docent_alle_lesstofitems_per_traject);
}
function toon_docent_alle_lesstofitems_per_traject(data){
    eindString = `<table>`;
    for(let x = 0; x < data.length; x++){
        const checkofdisabled = data[x].statustraject == 'checked' ? 'disabled' : ''
        eindString += `
            <tr>
            <td><input type=checkbox ${data[x].statustraject} ${checkofdisabled} onclick="ken_lesstofitem_toe_aan_traject(${tid_g}, ${data[x].lesstofitemid})"></td>
            <td>${data[x].lesstofitemnaam}</td>
            </tr>
        `
    }
    eindString += `</table>`;
    document.getElementById("uitkomst").innerHTML = eindString;   
}
function student_alle_trajecten(sid){
    sid_g = sid;
    voer_fetch_uit("student_alle_lesstofitems_per_traject/"+sid, toon_student_alle_lesstofitems_per_traject);
}
function toon_student_alle_lesstofitems_per_traject(data){
    console.log(data)
    eindString = `<table>`;
    for(let x = 0; x < data.length; x++){
        const checkofdisabled = data[x].statusstudent == 'checked' ? 'disabled' : ''
        eindString += `
            <tr>
            <td><input type=checkbox ${data[x].statusstudent} ${checkofdisabled} onclick="student_ken_lesstofitem_toe_aan_student(${sid_g}, ${data[x].lesstofitemid})"></td>
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
    console.log("toon_docent_ken_lesstofitem_toe_aan_traject",data);
}
function student_ken_lesstofitem_toe_aan_student(sid_g, lsid){
    voer_fetch_uit("student_ken_lesstofitem_toe_aan_student/"+sid_g+"/"+lsid, toon_student_ken_lesstofitem_toe_aan_student);

}
function toon_student_ken_lesstofitem_toe_aan_student(data){
    console.log("toon_student_ken_lesstofitem_toe_aan_student", data)
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