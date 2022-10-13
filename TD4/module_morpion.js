export class Morpion{
    #morpion;
    #nbCoups;
    #joueur;
    #symbole;

    #taille;
    #modeJeu;

    // static MAX_GRILLE = 8;
    // static MIN_GRILLE = 3;

    // zoneMessage.innerHTML = 'Joueur 1, à toi !';
    // document.getElementById('btn_reset').disabled = true;

    constructor (taille, mode_jeu) {
        this.#morpion = new Array(taille);
        this.#nbCoups = 0;
        this.#joueur = 1;
        this.#symbole = 'x';
        this.#taille = taille;
        this.#modeJeu = mode_jeu;
    }

    get symbole(){
        return this.#symbole;
    }

    setSymbole(symbole){
        this.#symbole = symbole;
    }

    get joueur(){
        return this.#joueur;
    }

    setJoueur(joueur){
        this.#joueur = joueur;
    }

    get taille() {
        return this.#taille;
    }

    get nbCoups() {
        return this.#nbCoups;
    }

    setCol(x, value){
        this.#morpion[x] = value;
    }

    getCol(x){
        return this.#morpion[x];
    }

    getLigne(y){
        let ligne = new Array(this.#taille);
        for (let i = 0; i < this.#taille; i++) {
            for (let j = 0; j < this.#taille; j++) {
                if(j===y){
                    ligne.push(this.#morpion[i][j]);
                }
            }
        }
        return ligne;
    }

    setMorpionCase(x, y, value){
        this.#morpion[x][y] = value;
    }

    getMorpionCase(x, y){
       return this.#morpion[x][y];
    }

    addCoup(){
        this.#nbCoups++;
    }

    get morpion(){
        return this.#morpion;
    }

    aGagne (x, y) {
        if (this.#modeJeu === 'simple') {
            return this.aGagne3ParmiN(x, y);
        }

        let nbSymboles;

        // gagné en ligne ?
        const ligne = y;
        nbSymboles = 0;
        for (let col = 0; col < this.#taille; col++) {
            if (this.getMorpionCase(col, ligne) === this.#symbole) {
                nbSymboles++;
            }
        }
        if (nbSymboles === this.#taille) {
            return true;
        }

        // gagné en colonne ?
        const col = x;
        nbSymboles = 0;
        for (let ligne = 0; ligne < this.#taille; ligne++) {
            if (this.getMorpionCase(col, ligne) === this.#symbole) {
                nbSymboles++;
            }
        }
        if (nbSymboles === this.#taille) {
            return true;
        }

        // gagné diagonale
        if (x === y) {
            nbSymboles = 0;
            for (let lc = 0; lc < this.#taille; lc++) {
                if (this.getMorpionCase(lc, lc) === this.#symbole) {
                    nbSymboles++;
                }
            }
            if (nbSymboles === this.#taille) {
                return true;
            }
        }

        // gagné diag inverse
        if (x === this.#taille - (y + 1)) {
            nbSymboles = 0;
            for (let ligne = 0; ligne < this.#taille; ligne++) {
                if (this.getMorpionCase(ligne, this.#taille - (ligne + 1)) === this.#symbole) {
                    nbSymboles++;
                }
            }
            if (nbSymboles === this.#taille) {
                return true;
            }
        }

        return false;
    }

    aGagne3ParmiN (x, y) {
        const aTrouver = this.#symbole.repeat(3);

        // gagné en ligne ? : concaténation de la ligne, et recherche de la sous-chaîne gagnante
        let ligne = '';
        this.getLigne(y).forEach(element => (ligne += element));
        if (ligne.indexOf(aTrouver) >= 0) {
            return true;
        }

        // gagné en colonne ? : concaténation de la colonne et recherche de la sous-chaîne gagnante
        let col = '';
        this.#morpion[x].forEach(element => (col += element[x]));
        if (col.indexOf(aTrouver) >= 0) {
            return true;
        }

        // gagné diagonale
        if (x === y) {
            let diagonale = '';
            for (let lc = 0; lc < this.#taille; lc++) {
                diagonale += this.#morpion[lc][lc];
            }
            if (diagonale.indexOf(aTrouver) >= 0) {
                return true;
            }
        }

        // gagné diag inverse
        if (x === this.#taille - (y + 1)) {
            let inverse = '';
            for (let lc = 0; lc < this.#taille; lc++) {
                inverse += this.#morpion[lc][this.#taille - (lc + 1)];
            }
            if (inverse.indexOf(aTrouver) >= 0) {
                return true;
            }
        }

        return false;
    }
}

