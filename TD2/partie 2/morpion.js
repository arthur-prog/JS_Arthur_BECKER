let scorej1 = 0;
let scorej2 = 0;
let j1 = prompt("Entrez le nom du joueur 1");
let j2 = prompt("Entrez le nom du joueur 2");
morpion();

function morpion(){
    let nbCoup = 0;
    let pjoueur = document.getElementById("joueur");
    pjoueur.style.display = "block";
    pjoueur.innerText = "";

    //taille du morpion
    let size=0;
    while(!(3<=size && size<=8)){
        size = Number.parseInt(prompt("Entrez la taille du morpion (entre 3 et 8)"));
    }

    //mode complet
    let mode;
    let mode_complet;
    while(typeof mode_complet == "undefined"){
        mode = prompt("Mode complet (oui / non)");
        if(mode === "oui"){
            mode_complet = true;
        }
        else if(mode === "non"){
            mode_complet = false;
        }
    }

    afficherJoueur()
    afficherScore();

    //--------------------------------------------------AFFICHAGE------------------------------------------------------------
    let table = document.getElementById("morpion");
    for (let i = 0; i < size; i++){
        let ligne = table.insertRow();
        for (let j = 0; j < size; j++){
            let cell = ligne.insertCell();
            let img = document.createElement('img');
            img.id = "row" + i + "cell" + j;
            img.height = 100;
            img.width = 100;
            img.addEventListener('click', (event) => {
                if (nbCoup%2 === 0){
                    if (event.target.src === ""){
                        event.target.src = "img/rond.png";
                        verifAll(event.target.id);
                        nbCoup++;
                        afficherJoueur();
                    }
                }
                else{
                    if (event.target.src === ""){
                        event.target.src = "img/croix.png";
                        verifAll(event.target.id);
                        nbCoup++;
                        afficherJoueur();
                    }
                }
            });
            cell.appendChild(img);
        }
    }

    function afficherJoueur(){
        let joueur = document.getElementById("joueur");
        if(nbCoup%2 === 0){
            joueur.innerText = "C'est a " + j1 + " de jouer!"
        }
        else{
            joueur.innerText = "C'est a " + j2 + " de jouer!"
        }
    }

    function afficherScore(){
        let footer = document.getElementById("score");
        footer.innerHTML = "<p> " + j1 + ": " + scorej1 + "  -  "+ j2 + ": " + scorej2 + " </p>";
    }

    function afficherBtnRestart(){
        let gagnant = document.getElementById("gagnant");let btnRestart = document.createElement("button");
        btnRestart.innerText = "Recommencer";
        btnRestart.classList.add("btn");
        btnRestart.classList.add("btn-primary");
        btnRestart.addEventListener('click', (event) => {
            gagnant.innerHTML = "";
            morpion();
        });
        gagnant.appendChild(btnRestart);

    }

    function afficherGagnant(joueur){
        let table = document.getElementById("morpion");
        table.innerHTML = "";
        let pjoueur = document.getElementById("joueur");
        pjoueur.style.display = "none";
        let gagnant = document.getElementById("gagnant");
        gagnant.innerHTML = "<p> " + joueur + " gagnant! </p>";
        afficherBtnRestart();

    }

    function afficherEgalite(){
        let table = document.getElementById("morpion");
        table.innerHTML = "";
        let pjoueur = document.getElementById("joueur");
        pjoueur.style.display = "none";
        let gagnant = document.getElementById("gagnant");
        gagnant.innerHTML = "<p>  Egalite! </p>";
        afficherBtnRestart();
    }


    //--------------------------------------------------JEU------------------------------------------------------------
    function taille(){
        let coupPourGagner;
        if(mode_complet === false){
            coupPourGagner = 3;
        }
        else{
            coupPourGagner = size;
        }
        return coupPourGagner;
    }

    function getSrcName(id){
        let img = document.getElementById(id);
        if (img !== null){
            let arraySrcName = img.src.toString().split('/');
            return arraySrcName[arraySrcName.length - 1];
        }
        else{
            return "";
        }
    }

    function getSrcImg(){
        let srcImg;
        if (nbCoup%2 === 0){
            srcImg = "rond.png";
        }
        else{
            srcImg = "croix.png";
        }
        return srcImg;
    }

    function verifGagnant(count){
        if(count === taille()){
            if(nbCoup%2 === 0){
                afficherGagnant(j1);
                scorej1++;
                afficherScore();
            }
            else{
                afficherGagnant(j2);
                scorej2++;
                afficherScore();
            }
        }
    }

    function verifEgalite(){
        if (nbCoup+1 === size*size){
            afficherEgalite();
        }
    }

    function firstCall(count){
        if (count !== 0){
            return false;
        }
        else{
            return true;
        }
    }

    function verifLigne(id){
        let srcImg = getSrcImg();
        let arrayNbLigne = id.toString().split('');
        let ligne = Number.parseInt(arrayNbLigne[3]);
        let col = Number.parseInt(arrayNbLigne[8]);
        leftToRight();
        rightToLeft(0);

        function leftToRight(){
            let count = 0;
            for(let i = col; i<size; i++){
                let idImg = "row" + ligne + "cell" + i;
                let srcName = getSrcName(idImg);
                if(srcName === srcImg){
                    count++;
                }
                else{
                    rightToLeft(count);
                    break;
                }
                verifGagnant(count);
                rightToLeft(count);
            }
        }

        function rightToLeft(count){
            let bool_first_call = firstCall(count);
            for(let i = col; i>=0; i--){
                let idImg = "row" + ligne + "cell" + i;
                let srcName = getSrcName(idImg);
                if(srcName === srcImg){
                    if (bool_first_call === false && i===col){

                    }
                    else{
                        count++;
                    }
                }
                else{
                    break;
                }
                verifGagnant(count);
            }
        }
    }

    function verifCol(id){
        let srcImg = getSrcImg();
        let arrayNbLigne = id.toString().split('');
        let ligne = Number.parseInt(arrayNbLigne[3]);
        let col = Number.parseInt(arrayNbLigne[8]);
        topToBottom();
        bottomToTop(0);

        function topToBottom(){
            let count = 0;
            for(let i = ligne; i<size; i++){
                let idImg = "row" + i + "cell" + col;
                let srcName = getSrcName(idImg);
                if(srcName === srcImg){
                    count++;
                }
                else{
                    bottomToTop(count);
                    break;
                }
                verifGagnant(count);
                bottomToTop(count);
            }
        }

        function bottomToTop(count){
            let bool_first_call = firstCall(count);
            for(let i = ligne; i>=0; i--){
                let idImg = "row" + i + "cell" + col;
                let srcName = getSrcName(idImg);
                if(srcName === srcImg){
                    if (bool_first_call === false && i===ligne){
                    }
                    else{
                        count++;
                    }
                }
                else{
                    break;
                }
                verifGagnant(count);
            }
        }
    }

    function verifDiag(id){
        let srcImg = getSrcImg();
        let arrayNbLigne = id.toString().split('');
        let ligne = Number.parseInt(arrayNbLigne[3]);
        let col = Number.parseInt(arrayNbLigne[8]);
        topLeftToBottomRight();
        bottomRightToTopLeft(0);
        bottomLeftToTopRight();
        topRightToBottomLeft(0);


        function topLeftToBottomRight(){
            let count = 0;
            let ligne2 = ligne;
            for(let i = col; i<size; i++){
                if(ligne2 < size){
                    let idImg = "row" + ligne2 + "cell" + i;
                    let srcName = getSrcName(idImg);
                    if(srcName === srcImg){
                        count++;
                    }
                    else{
                        bottomRightToTopLeft(count)
                        break;
                    }
                    verifGagnant(count);
                    ligne2++;
                    bottomRightToTopLeft(count);
                }
            }
        }

        function bottomRightToTopLeft(count){
            let bool_first_call = firstCall(count);
            let col2 = col;
            for(let i = ligne; i>=0; i--){
                if(col2 < size) {
                    let idImg = "row" + i + "cell" + col2;
                    let srcName = getSrcName(idImg);
                    if (srcName === srcImg) {
                        if (bool_first_call === false && i===ligne && col2===col){
                        }
                        else{
                            count++;
                        }
                    } else {
                        break;
                    }
                    verifGagnant(count);
                    col2--;
                }
            }
        }


        function bottomLeftToTopRight(){
            let count = 0;
            let ligne2 = ligne;
            for(let i = col; i<size; i++){
                if(ligne2 >= 0) {
                    let idImg = "row" + ligne2 + "cell" + i;
                    let srcName = getSrcName(idImg);
                    if (srcName === srcImg) {
                        count++;
                    } else {
                        topRightToBottomLeft(count)
                        break;
                    }
                    verifGagnant(count);
                    ligne2--;
                    topRightToBottomLeft(count)
                }
            }
        }


        function topRightToBottomLeft(count){
            let bool_first_call = firstCall(count);
            let col2 = col;
            for(let i = ligne; i<size; i++){
                if(col2 >= 0) {
                    let idImg = "row" + i + "cell" + col2;
                    let srcName = getSrcName(idImg);
                    if (srcName === srcImg) {
                        if (bool_first_call === false && i===ligne && col2===col){
                        }
                        else{
                            count++;
                        }
                    } else {
                        break;
                    }
                    verifGagnant(count);
                    col2--;
                }
            }
        }
    }

    function verifAll(id){
        verifLigne(id);
        verifCol(id);
        verifDiag(id);
        verifEgalite();
    }
}