import {getSum41, getNumberOfEven42, getMaxEven45, binarySearch44} from "../partie1/array_utils.js";

let nb_elt = 1;

//bouton add element
let btnAdd = document.getElementById("add");
btnAdd.addEventListener('click', (event) => {
    nb_elt++;
    let divElt = document.getElementById("elt");
    let br = document.createElement("br");
    divElt.insertBefore(br, btnAdd);
    let lbl = document.createElement("label");
    lbl.innerText = "Elément " + nb_elt + " ";
    lbl.for = "elt"+nb_elt;
    divElt.insertBefore(lbl, btnAdd);
    let input = document.createElement("input");
    input.type = "text";
    input.id = "elt"+nb_elt;
    divElt.insertBefore(input, btnAdd);
});

//bouton results
let btnResults = document.getElementById("submit");
btnResults.addEventListener('click', (event) => {
    let array = [];
    let search_elt;
    let check = true;
    let input_search = document.getElementById("search_elt");
    if(isNaN(Number.parseInt(input_search.value))){
        afficherErreur();
        check = false;
    }
    else{
        search_elt = Number.parseInt(input_search.value);
    }
    for(let i = 0; i<nb_elt;i++){
        let input = document.getElementById("elt" + (i+1).toString());
        if(isNaN(Number.parseInt(input.value))){
            afficherErreur();
            check = false;
        }
        else{
            array.push(Number.parseInt(input.value));
        }
    }
    if(check === true){
        afficherResultats(array, search_elt);
    }
});


function afficherResultats(array, search_elt){
    let p_erreur = document.getElementById("erreur");
    p_erreur.innerText = "";
    let p_somme = document.getElementById("somme");
    let p_nb_pairs = document.getElementById("nb_pairs");
    let p_plus_grand_pair = document.getElementById("plus_grand_pair");
    let p_dicho = document.getElementById("dicho");
    p_somme.innerText = "";
    p_somme.innerText = "Somme des éléments: " + getSum41(array);


    p_nb_pairs.innerText = "";
    p_nb_pairs.innerText = "Nombre de pairs: " + getNumberOfEven42(array);
    p_plus_grand_pair.innerText = "";
    let plus_grand_pair = getMaxEven45(...array);
    if(!(array.includes(plus_grand_pair))){
        plus_grand_pair = "pas de pair dans la table";
    }
    p_plus_grand_pair.innerText = "Plus grand élément pair: " + plus_grand_pair;

    
    p_dicho.innerText = "";
    p_dicho.innerText = "Position de l'élément dans la table: " + binarySearch44(array, search_elt);

    let stringArray = array.toString();
    if(stringArray !== array.sort().toString()){
        let p = document.getElementById("erreur");
        p.innerText = "Vos éléments ne sont pas triés";
    }

}

function afficherErreur(){
    let p = document.getElementById("erreur");
    p.innerText = "Il faut saisir des entiers!";
}