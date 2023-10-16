class Joueur {
    constructor(id,name, pos, frog){
        this.id = id;
        this.name = name;
        this._pos = pos;
        this._frog = frog;
    }

    mouvPlayer(deplacement){
        this._pos += deplacement;
    }

    addfrog(frog){
        this._frog.push(frog);
    }

    get frog(){
        return this._frog;
    }

    set frog(fromage){
        this._frog = fromage;
    }

    get pos(){
        return this._pos;
    }

    set pos(position){
        this._pos = position;
    }
}

startGame();
//TODO:  
//On suppose qu'il y a uniquement 1 joueur
async function startGame(){
    let player = new Joueur(0, "Dimitri", 0, []);
    let isWin = false;
    //créer le plateau
    let plateau = [0,1,2,3,4,5,6,7]
    console.log("BIENVENUE sur Serious");
    while(!isWin){
        console.log("C'est le tour de ");

        let casePlayer = plateau[player.pos];
        console.log("Le joueur est sur la case")
        let epreuve = await caseEvent(casePlayer); //récupére le résultat d'une épreuve (ARRAY)
        if(epreuve != null && epreuve[1] > 0){
            player.addfrog(epreuve[0])
            player.mouvPlayer(epreuve[1]);
            if(player.pos > 7){
                player.pos = 7;
            }
        }
        if(epreuve == null) {player.pos = 0;}

        if(player.frog.length == 6){
            isWin = true;
            console.log("Félicitation à "+ player.name);
        }
    }
    
    

}

//Fonction pour définir l'épreuve choist selon l'événement de la case
    async function caseEvent(casePlayer){
        switch(casePlayer){
            case 0:
                console.log("multi-choix");
                return await multiChoose();
            case 1:
                console.log("EPREUVE1")
                return await questionEpreuve(1);
            case 2:
                console.log("EPREUVE2")
                return await questionEpreuve(2);
            case 3:
                console.log("EPREUVE3")
                return await questionEpreuve(3);
            case 4:
                console.log("EPREUVE4")
                return await questionEpreuve(4);
            case 5:
                console.log("EPREUVE5")
                return await questionEpreuve(5);
            case 6:
                console.log("EPREUVE6")
                return await questionEpreuve(6);
            case 7:
                console.log("EPREUVE7")
                return null;
        }
    }
//fonction qui trouve la case 0 de multi-choix
    async function multiChoose(){
        console.log("Vous êtes sur un choix multiple");

        let val = [1,2,3];

        return await CreateChoose(val);

    }

async function CreateChoose(val){

    let mainDiv = document.createElement("div");
    mainDiv.id="bottom";

    let boutonClique = [];
    for(i = 0; i < 3; i++){
        let index = i;
        let bouton = document.createElement("button");
        bouton.innerText = val[i];

        boutonClique[i] = new Promise((resolve) => {
            bouton.addEventListener("click", () => {
                mainDiv.remove();
                resolve(val[index]);
            });
        });

        mainDiv.appendChild(bouton);
    }
    
    
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(mainDiv);
    
    let result = await ClickButton(boutonClique);
    return await questionEpreuve(result);

}


//fonction qui va demander la difficulté choisit + afficher la question
    //Retourne l'épreuve + la réussite OU complete le joueur
    async function questionEpreuve(epreuve){
        console.log(epreuve);
        //choix difficulté
        //console.log("Quel est votre difficulté")

        //print question
        let mainDiv = document.createElement("div");
        mainDiv.id = "bottom";

        let reponseDiv = document.createElement("div");
        reponseDiv.id = "bottom-response-panel"
        //deffinition des boutons + de leurs champs de réponse
        let val = ["Paris", "Moscou", "Tokyo"];
        let reponse = val[0];
        let boutonClique = [];
        for(i = 0; i < 3; i++){
            let index = i;
            let bouton = document.createElement("button");
            bouton.innerText = val[i];
    
            boutonClique[i] = new Promise((resolve) => {
                bouton.addEventListener("click", () => {
                    mainDiv.remove();
                    resolve(val[index]);
                });
            });
    
            reponseDiv.appendChild(bouton);
        }
        //definition de la QUESTION
        let questionDiv = document.createElement("div");
        questionDiv.id = "bottom-question-panel";
        
        let par = document.createElement("p");
        par.id = "question-zone";
        par.innerText = "Quel est la capitale de France"
        questionDiv.appendChild(par);

        mainDiv.appendChild(reponseDiv);
        mainDiv.appendChild(questionDiv);

        let body = document.getElementsByTagName("body")[0];
        body.appendChild(mainDiv);

        let result = await ClickButton(boutonClique);
        let res = [];
        if(result == reponse){
            res = [epreuve, 2];
        }else{
            res = [epreuve, 0];
        }
        return res;
    }

    async function ClickButton(boutonClique){
        console.log("JATTENDS")
        try {
            const resultat = await Promise.race(boutonClique);
            console.log(resultat);
            return resultat;
        } catch (error) {
            console.error("RIP");
            return null;
        }
    }