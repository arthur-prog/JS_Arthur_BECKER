import {getSum41, getNumberOfEven42, getMaxEven45} from "./array_utils.js";

let string = prompt("Veuillez saisir votre tableau (séparer les valeurs par des virgules)");

let arrayUser = string.split(",");

let arrayInt = [];

arrayUser.forEach((value) => arrayInt.push(Number.parseInt(value)))

results(arrayInt);

function results(array){
    console.log("Somme des éléments: " + getSum41(array) + ".");
    console.log("Nombre d'entiers pairs: " + getNumberOfEven42(array) + ".");
    console.log("Plus grand pair: " + getMaxEven45(...array) + ".");
}
