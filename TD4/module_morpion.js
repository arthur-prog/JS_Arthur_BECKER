export class Morpion{
    #morpion;
    #nbCoups;
    #joueur;
    #symbole;

    #taille;

    constructor (taille) {
        this.#morpion = new Array(taille);
        this.#nbCoups = 0;
        this.#joueur = 1;
        this.#symbole = 'x';
        this.#taille = taille;
        this.createTable();
    }

    createTable(){
        for (let i = 0; i < this.#taille; i++) {
            let col = new Array(this.#taille);
            for (let j = 0; j < this.#taille; j++) {
                col[j] = ' ';
            }
            this.setCol(i, col);
        }
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
}

