function toonAntwoord(){
    document.getElementById("quizantwoorddiv").innerHTML = `
        ${linkerkolom()}
        <div class="col-lg-8 paginaBody">
            <div>yes</div>
            <div>
                <button class="btn btnown" >Toelichting A</button>
                <button class="btn btnown" >Toelichting B</button>
                <button class="btn btnown" >Toelichting C</button>
                <button class="btn btnown" >Toelichting D</button>
            </div>
        </div>
        ${rechterkolom()}
    `
}