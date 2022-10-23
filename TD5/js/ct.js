let ville;
let dpt;
let pagination = 1;
let nbPages;

let h1_titre = document.getElementById("titre");
let h2_nb_result = document.getElementById("nb_result");
let div_affichage = document.getElementById("affichage");
let btn_avant = document.getElementById("avant");
let btn_apres = document.getElementById("apres");

btn_avant.value = "<-";
btn_apres.value = "->";

btn_avant.addEventListener('click', () => {
    if(pagination>1){
        pagination--;
        getData(pagination);
    }
});
btn_apres.addEventListener('click', () => {
    if(pagination<=nbPages){
        pagination++;
        getData(pagination);
    }
});

if(sessionStorage.getItem("ville") !== null){
    ville = sessionStorage.getItem("ville");
    h1_titre.innerText = "Centres de contrôle technique à " + ville;

}
else{
    dpt = sessionStorage.getItem("dpt");
    h1_titre.innerText = "Centres de contrôle technique dans le département: " + dpt;
}


getData(pagination);

async function getData(pagination) {
    let url = "";
    let nbRows = "10";
    let start = pagination * 10;
    if(ville === undefined){
        url = "https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-controles-techniques-copie&q=&sort=cct_denomination&rows=" + nbRows + "&start=" + (start-1) + "&facet=cct_denomination&facet=prix_visite&facet=prix_contre_visite_min&facet=prix_contre_visite_max&refine.cct_code_dept=" + dpt;
    }
    else{
        url = "https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-controles-techniques-copie&q=&sort=cct_denomination&rows=" + nbRows + "&start=" + (start-1) + "&facet=cct_denomination&facet=prix_visite&facet=prix_contre_visite_min&facet=prix_contre_visite_max&refine.cct_code_commune=" + ville;
    }
    const response = await fetch(
        url , {
            method: 'GET',
        }).catch(function (err) {
        console.log("erreur:" + err);
    });
    const json = await response.json();

    if(nbPages === undefined){
        nbPages = Math.ceil(json.nhits/nbRows);
    }

    h2_nb_result.innerText = json.nhits + " résultats";

    if(json.nhits !== 0){
        div_affichage.innerText = "";
        let page = document.getElementById("page");
        if(page !== null){
            page.remove();
        }


        let table = document.createElement("table");
        table.appendChild(initializeTable());
        json.records.forEach(centre =>{
            let tr = document.createElement("tr");
            let nom = document.createElement("td");
            nom.innerText = centre.fields.cct_denomination;
            let adresse = document.createElement('td');
            adresse.innerText = centre.fields.cct_adresse;
            let categorie_vehicule = document.createElement('td');
            categorie_vehicule.innerText = centre.fields.cat_vehicule_libelle;
            let categorie_energie = document.createElement('td');
            categorie_energie.innerText = centre.fields.cat_energie_libelle;
            let prix_visite = document.createElement('td');
            prix_visite.innerText = centre.fields.prix_visite;
            let prix_contre_visite_max = document.createElement('td');
            prix_contre_visite_max.innerText = centre.fields.prix_contre_visite_max;
            let prix_contre_visite_min = document.createElement('td');
            prix_contre_visite_min.innerText = centre.fields.prix_contre_visite_min;


            tr.append(nom, adresse, categorie_vehicule, categorie_energie, prix_visite, prix_contre_visite_max, prix_contre_visite_min);
            table.appendChild(tr);
        });
        div_affichage.appendChild(table);

        let p = document.createElement('p');
        p.innerText = pagination + "/" + nbPages;
        let li = document.createElement("li");
        li.id = "page";
        li.appendChild(p);
        btn_avant.parentElement.after(li);
    }
    else{
        let div_pagination = document.getElementById("pagination");
        div_pagination.innerHTML = "";
    }




}

function initializeTable(){
    let tr = document.createElement("tr");
    let nom = document.createElement("th");
    nom.innerText = "Nom";
    let adresse = document.createElement('th');
    adresse.innerText = "Adresse";
    let categorie = document.createElement('th');
    categorie.innerText = "Catégorie de véhicule";
    let categorie_energie = document.createElement('th');
    categorie_energie.innerText = "Energie";
    let prix_visite = document.createElement('th');
    prix_visite.innerText = "Prix visite";
    let prix_contre_visite_max = document.createElement('th');
    prix_contre_visite_max.innerText = "Prix max contre visite";
    let prix_contre_visite_min = document.createElement('th');
    prix_contre_visite_min.innerText = "Prix min contre visite";
    tr.append(nom, adresse, categorie, categorie_energie, prix_visite, prix_contre_visite_max, prix_contre_visite_min);
    return tr;
}

