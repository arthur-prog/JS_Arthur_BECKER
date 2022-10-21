let dpt_select = document.getElementById("dpt");
let com_select = document.getElementById("commune");
let com_div = document.getElementById("divcom");
let pop_p = document.getElementById("pop");

let btn_meteo = document.getElementById("btn-meteo");
btn_meteo.addEventListener("click", function() {
    getMeteo();
});

let btn_ct = document.getElementById("btn-ct");
btn_ct.addEventListener("click", function() {
    getCt();
});

sessionStorage.clear();

dpt_select.addEventListener('change', (event) => {
    pop_p.innerText = "";
    com_select.innerHTML = "<option>--Please choose an option--</option>";
    com_div.style.display = "block";
    fetch("https://geo.api.gouv.fr/departements/" + dpt_select.value + "/communes", {
        method: 'GET',
    }).then(function (response){
        response.json().then(function (response) {
            response.forEach(function (element) {
                let opt = document.createElement('option');
                opt.value = element['code'];
                opt.innerHTML = element['nom'];
                com_select.appendChild(opt);
                btn_ct.style.display = "block";
            });
        });
    }).catch(function(err){
        console.log("erreur:" + err);
    });
});


com_select.addEventListener('change', (event) => {
    fetch("https://geo.api.gouv.fr/communes/" + com_select.value, {
        method: 'GET',
    }).then(function (response){
        response.json().then(function (response) {
            pop_p.innerText = "Population: " + response['population'];
            btn_meteo.style.display = "block";
        });
    }).catch(function(err){
        console.log("erreur:" + err);
    });
});



fetch('https://geo.api.gouv.fr/departements', {
    method: 'GET',
}).then(function (response){
 response.json().then(function (response) {
     response.forEach(function (element) {
         let opt = document.createElement('option');
         opt.value = element['code'];
         $dpt = element['code'] + " - " + element['nom'];
         opt.innerHTML = $dpt;
         dpt_select.appendChild(opt);
     });
 });
}).catch(function(err){
    console.log("erreur:" + err);
});


function getMeteo(){
    sessionStorage.setItem("ville", com_select.options[com_select.selectedIndex].text);
    window.location.href = "meteo.html";
}

function getCt(){
    if (com_select.value !== "--Please choose an option--"){
        sessionStorage.setItem("ville", com_select.options[com_select.selectedIndex].text);
    }

    let array_dpt = dpt_select.options[dpt_select.selectedIndex].text.split(" ");
    let dpt = "";
    let check = 0;
    array_dpt.forEach(element => {
        if(check === 1){
            if(dpt !== ""){
                dpt += " " + element;
            }
            else{
                dpt += element;
            }
        }
        if(element === "-"){
            check = 1;
        }
    });

    sessionStorage.setItem("dpt", dpt);
    window.location.href = "ct.html";
}