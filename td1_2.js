function types (){

    function getType(variable){
        console.log(typeof variable)
    }

    let tab = [ , 'blabla', "blabla", `blabla ${x}`, 9, 2.5, true, undefined, null, [1,2,3], new Array(), {}, {"promo":"lpwmce", "nb":25}, new Date(), function (){alert('toto')}, 42n]

    for (let i=0; i < tab.length; i++){
        x = tab[i]
        getType(x)
    }

    var x
}

function convTypes (){
    let int = 5
    let string = "10"
    let string2 = "5.5"

    console.log(int, string, string2)

    let stringFromInt = int.toString()
    let intFromString = Number.parseInt(string)
    let floatFromString = Number.parseFloat(string2)

    console.log(stringFromInt, intFromString, floatFromString)

    let intFromFloat = Math.round(floatFromString)
    let intFromFloat2 = Math.ceil(floatFromString)
    let intFromFloat3 = Math.floor(floatFromString)

    console.log(intFromFloat, intFromFloat2, intFromFloat3)

    let intFromString2 = Math.round(string2)

    console.log(intFromString2)
}

function equal (){
    let b=false;
    let n=0;
    let s='0';
    let tab = [];
    let o = {};

    let tab2 = [b, n, s, tab, o]
    let tab0 = ["b", "n", "s", "tab", "o"]

    for (let i=0; i < tab2.length; i++){
        for (let j=0; j < tab2.length; j++){
            if (tab2[i] == tab2[j]){
                console.log(tab0[i]+' == '+tab0[j])
            }
            if (tab2[i] === tab2[j]){
                console.log(tab0[i]+' === '+tab0[j])
            }
        }
    }
}

function upperCase(){
    let string = prompt("Entrez une chaine de caracteres en majuscules");
    while (string.toUpperCase() !== string){
        string = prompt("Entrez une chaine de caracteres en majuscules");
    }
    console.log(string);
}

function randomStringUpperCase(){
    let string = "a";
    let maj = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let x = 0;
    let check = false;
    while (check === false){
        string = "";
        for ( let i = 0; i < 5; i++ ) {
            string += String.fromCharCode(65 + Math.random()*(123-65));
        }
        console.log(string);
        x++;
        if (string.toUpperCase() === string){
            let y = 0;
            let stringSplitted = string.split('');
            for ( let i = 0; i < string.length; i++ ) {
                if(maj.includes(stringSplitted[i])){
                    y++;
                }
                if(y===5){
                    check = true
                }
            }
        }
    }
    console.log("Il a fallu " + x + " iterations")
}

function chaineDeVoyelles(){
    let voyelles = ["a", "e", "i", "o", "u", "y"];
    let string = "";
    let max = 100;
    for (let i = 0; i < (Math.round(Math.random()*max)+1); i++){
        string += voyelles[Math.round(Math.random()*5)];
    }
    console.log(string);
}

function nomPrenom(){
    let nom = prompt("Entrez votre nom");
    let prenom = prompt("Entre votre prenom (avec un - pour les prenoms composes)");
    let arrayPrenom = prenom.split('-');
    let nomPrenom = nom.toUpperCase() + " ";
    for (let i=0; i < arrayPrenom.length; i++){
        if (i>0){
            nomPrenom += "-";
        }
        nomPrenom += arrayPrenom[i].charAt(0).toUpperCase() + arrayPrenom[i].slice(1);
    }
    console.log(nomPrenom);
}

function chaineCryptee(){
    let chaine = prompt("Entrez la chaine a crypter");
    let arrayChaine = chaine.split('');
    for (let i=0; i < arrayChaine.length; i++){
        switch (arrayChaine[i].toUpperCase()){
            case 'A':
                arrayChaine[i] = 4
                break;
            case 'E':
                arrayChaine[i] = 3
                break;
            case 'G':
                arrayChaine[i] = 6
                break;
            case 'I':
                arrayChaine[i] = 1
                break;
            case 'O':
                arrayChaine[i] = 0
                break;
            case 'S':
                arrayChaine[i] = 5
                break;
            case 'Z':
                arrayChaine[i] = 2
                break;
            default:
                break;
        }
    }
    let chaine2 = "";
    for (let i=0; i < arrayChaine.length; i++){
        chaine2 += arrayChaine[i]
    }
    console.log(chaine2)
}

function jazzBundle(){
    let n = 20;
    for(let i=1; i<=n; i++){
        if(i%5===0 && i%3===0){
            console.log("Jazz Bundle")
        }
        else if(i%5===0){
            console.log("Bundle")
        }
        else if(i%3===0){
            console.log("Jazz")
        }
        else{
            console.log(i)
        }
    }
}

function jazzBundle2(){
    let n = 20;
    let jazzB;
    for(let i=1; i<=n; i++){
        if(i%5===0 && i%3===0){
            jazzB = "Jazz Bundle"
        }
        else if(i%5===0){
            jazzB = "Bundle"
        }
        else if(i%3===0){
            jazzB = "Jazz"
        }
        else{
            jazzB = i.toString()
        }
        console.log(jazzB)
    }
}

//programmation fonctionelle à faire à partir d'ici <----------------------------------------------------------------------------
function additionEntiers(){
    let tab = [5, 6, 7, 3, 1];
    let x = 0;
    for (let i=0; i < tab.length; i++){
        x += tab[i];
    }
    console.log(x);
}

function entiersPair(){
    let tab = [5, 6, 7, 3, 1, 4, 8];
    let x = 0;
    for (let i=0; i < tab.length; i++){
        if (tab[i]%2===0){
            x++;
        }
    }
    console.log(x);
}

function fusionTab(){
    function merge(left, right){
        let tab = [];
        let l = 0;
        let r = 0;
        while (l < left.length && r < right.length){
            if (left[l] < right[r]){
                tab.push(left[l++]);
            } else {
                tab.push(right[r++]);
            }
        }
        return tab.concat(left.slice(l)).concat(right.slice(r));
    }

    function sortTab(tab){
        if (tab.length < 2) {
            return tab;
        }
        let mid = Math.floor(tab.length / 2);
        let right = tab.slice(mid);
        let left = tab.slice(0, mid);
        let all = merge(sortTab(left), sortTab(right));
        all.unshift(0, tab.length);
        tab.splice.apply(tab, all);
        return tab;
    }

    let tab1 = [5, 12, 7, 65];
    let tab2 = [-3, 50, 16, 60];
    let sortedTab1 = sortTab(tab1);
    let sortedTab2 = sortTab(tab2);
    let tab3 = [...sortedTab1, ...sortedTab2];
    let sortedTab3 = sortTab(tab3);

    console.log(sortedTab3);
}

function rechercheDicho(){
    function merge(left, right){
        let tab = [];
        let l = 0;
        let r = 0;
        while (l < left.length && r < right.length){
            if (left[l] < right[r]){
                tab.push(left[l++]);
            } else {
                tab.push(right[r++]);
            }
        }
        return tab.concat(left.slice(l)).concat(right.slice(r));
    }

    function sortTab(tab){
        if (tab.length < 2) {
            return tab;
        }
        let mid = Math.floor(tab.length / 2);
        let right = tab.slice(mid);
        let left = tab.slice(0, mid);
        let all = merge(sortTab(left), sortTab(right));
        all.unshift(0, tab.length);
        tab.splice.apply(tab, all);
        return tab;
    }

    function dichotomie(tab, val){
        let a = 0;
        let b = tab.length - 1;
        while(a<=b){
            let mid = Math.floor((a+b)/2);
            if (tab[mid] === val){
                return mid;
            }
            else if (tab[mid] < val){
                a = mid + 1;
            }
            else{
                b = mid -1;
            }
        }
        return -1;
    }

    let tab1 = [5, 12, 7, 65];
    let sortedTab1 = sortTab(tab1);
    console.log(sortedTab1);
    console.log(dichotomie(sortedTab1, 12));

}

function plusGrandPair(...valeurs){
    let tabPair = [];
    let x = -1;
    for (let i=0; i < valeurs.length; i++){
        if (valeurs[i]%2 === 0){
            tabPair.push(valeurs[i]);
        }
    }
    for (let i=0; i < tabPair.length; i++){
        if (tabPair[i] > x){
            x = tabPair[i];
        }
    }
    return x;
}
// console.log(plusGrandPair(8, 23, 94, -2, 35, 72))

function occurences(){

}
