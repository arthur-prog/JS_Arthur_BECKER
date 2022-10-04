//1.1
let body = document.querySelector("body");
let titre_article0 = document.createElement("h2");
titre_article0.innerHTML = "Article 0 - Interdiction";
let article0 = document.createElement("p");
article0.innerHTML = "Il est interdit de doubler, sous peine de disqualification.";
body.insertBefore(article0, body.firstChild);
body.insertBefore(titre_article0, body.firstChild);

//1.2, 1.3, 1.4
let h2 = document.getElementsByTagName("h2");
for (let i = 0; i<h2.length;i++){
    if(i%2 === 1){
        h2[i].style.backgroundColor = 'lightgrey';
        h2[i].nextElementSibling.style.backgroundColor = 'lightgrey';
        let nextEl = h2[i].nextElementSibling;
        while(nextEl.nextElementSibling.tagName !== "H2"){
            nextEl.nextElementSibling.style.backgroundColor = 'lightgrey';
            nextEl = nextEl.nextElementSibling;
        }
    }
    let h2_splited = h2[i].innerText.split(' ');
    let new_number = Number.parseInt(h2_splited[1]) + 1;
    let new_title1 = h2_splited[0] + " " + new_number + " ";
    let new_title2 = "";
    for (let i = 2; i<h2_splited.length; i++){
        new_title2 += " " + h2_splited[i].toString();
    }
    h2[i].innerText = (new_title1+new_title2).toUpperCase();
}

//1.5
let ul = document.getElementsByTagName("ul");
let periodes = [];
for (let i = 0; i<ul.length;i++){
    let first_element = ul[i].firstElementChild;
    if (first_element.tagName === "LI" && first_element.nextElementSibling === null){
        periodes.push(ul[i]);
    }
}
let ancienne_periode2 = periodes[1].innerHTML;
periodes[1].innerHTML = periodes[2].innerHTML;
periodes[2].innerHTML = ancienne_periode2;
