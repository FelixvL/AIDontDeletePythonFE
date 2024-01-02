function geefToelichting(){
    document.getElementById("onderwerptoelichting").innerHTML = `
        ${linkerkolom()}
        <div class="col-lg-8 paginaBody">
            <div>Java gaat over allerlei dingen</div>
            <div><textarea></textarea></div>
        </div>
        ${rechterkolom()}
    `;
}