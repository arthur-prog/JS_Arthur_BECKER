import {Morpion} from "./module_morpion.js";

const MAX_GRILLE = 8;
const MIN_GRILLE = 3;

let zoneMessage;
let taille;
let modeJeu;
let morpion;
let scores = [0, 0];

const btnReset = document.getElementById('btn_reset');
btnReset.addEventListener('click', recommence);

document.getElementById('score').innerHTML = 'X : ' + scores[0] + ' - O  : ' + scores[1];

recommence();

function recommence(){
    document.getElementById('table_morpion').style.pointerEvents = "auto";
    zoneMessage = document.getElementById('messages');
    taille = Number.parseInt(document.getElementById('taille').value);
    modeJeu = document.getElementById('simple').checked ? 'simple' : 'complet';

    //vérif taille correcte
    if (Number.isNaN(taille) || taille < MIN_GRILLE || taille > MAX_GRILLE) {
        zoneMessage.innerHTML = 'Taille invalide !';
    } else {
        morpion = new Morpion(taille, modeJeu);

        //suppression ancien tableau
        const table = document.getElementById('table_morpion');
        for (let l = table.rows.length - 1; l >= 0; l--) {
            table.deleteRow(l);
        }

        //affichage du tableau
        setTimeout(function(){
            for (let i = 0; i < morpion.taille; i++) {
                const ligne = table.insertRow(i);
                let col = new Array(morpion.taille);
                for (let j = 0; j < morpion.taille; j++) {
                    col[j] = ' ';

                    const id = '' + ((i + 1) * 10 + (j + 1));
                    const cell = ligne.insertCell(j);
                    cell.innerHTML = "<input type='button' class='case' id='" + id + "'/>";
                    cell.addEventListener('click', function() { clicBouton(this, i, j) });
                    document.getElementById(id).value = '';
                }
                morpion.setCol(i, col);
            }
            zoneMessage.innerHTML = 'Joueur 1, à toi !';
            document.getElementById('btn_reset').disabled = true;
        }, 100);

    }
}

function clicBouton (uneCase, y, x) {
    if (morpion.getMorpionCase(x, y) === ' ') {
        morpion.setMorpionCase(x, y, morpion.symbole);
        uneCase.firstChild.value = morpion.symbole;//ajout de firstChild
        uneCase.firstChild.classList.add('joueur' + morpion.joueur);
        morpion.addCoup();

        const victoire = morpion.aGagne(x, y);
        if (victoire) {
            zoneMessage.innerHTML = 'Le joueur ' + morpion.joueur + ' a gagné !';
            desactiveEcouteurs();
            morpion.symbole === 'x' ? scores[0]++ : scores[1]++;
            document.getElementById('score').innerHTML = 'X : ' + scores[0] + ' - O  : ' + scores[1];
        } else if (morpion.nbCoups === morpion.taille * morpion.taille) {
            zoneMessage.innerHTML = 'Match nul !';
            desactiveEcouteurs();
        } else {
            if (morpion.symbole === 'x') {
                morpion.setSymbole('o');
                morpion.setJoueur(2);
            } else {
                morpion.setSymbole('x');
                morpion.setJoueur(1);
            }
            zoneMessage.innerHTML = 'Joueur ' + morpion.joueur + ', à toi de jouer !';
        }

    } else {
        zoneMessage.innerHTML = 'Case déjà occupée !!! ';
    }
}

function desactiveEcouteurs () {
    document.getElementById('table_morpion').style.pointerEvents = "none";
    document.getElementById('btn_reset').disabled = false;
}