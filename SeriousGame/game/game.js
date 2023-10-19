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

let ListPlayer = document.currentScript.getAttribute("param1");
ListPlayer = ListPlayer.split(",");  
startGame(ListPlayer);
//TODO: BETTER INIT

//On suppose qu'il y a uniquement 1 joueur
async function startGame(LP){
    //init player
    let players = [];
    for(i = 0; i < LP.length; i++){
        players[i] = new Joueur(0,LP[i],0 ,[]);
    }
    let player = new Joueur(0, "Dimitri", 0, []);
    let isWin = false; let isFinal = false;
    //créer le plateau
    let plateau = 
    [0,1,2,3,4,5,6,
     0,1,2,3,4,5,6,
     0,1,2,3,4,5,6,
     0,1,2,3,4,5,6,
     0,7];
    console.log("BIENVENUE sur Serious");
    let ine = -1;
    while(!isWin){
        ine += 1; 
        let playerTurn = ine % players.length; 
        alert("C'est le tour de "+players[playerTurn].name);
        if(!isFinal){
            let casePlayer = plateau[players[playerTurn].pos];
            console.log("Le joueur est sur la case" + players[playerTurn].pos);
            let resEpreuve = await caseEvent(casePlayer); //récupére le résultat d'une épreuve (ARRAY)
            if(resEpreuve != null && resEpreuve[1] > 0){
                players[playerTurn].addfrog(resEpreuve[0]);
                players[playerTurn].mouvPlayer(resEpreuve[1]);
                if(players[playerTurn].pos > plateau.length - 1){
                    players[playerTurn].pos = plateau.length - 1;
                }
            }
            if(resEpreuve == null) {players[playerTurn].pos = 0;}
        }else{
            let resEpreuve = await FinalPhase(players[playerTurn].frog);
            if(resEpreuve != null && resEpreuve[1] > 0){
                players[playerTurn].addfrog(resEpreuve[0]);
            }   
        }
        if(players[playerTurn].frog.length == 6){
            if(isFinal){
                isWin = true;
                alert("Félicitation à "+ players[playerTurn].name);
            }else{
                isFinal = true;
                players[playerTurn].frog = [];
            }
        }
    }
}

    async function FinalPhase(frogArray){
        let val = [1,2,3,4,5,6]
        val = val.filter(function(item) {
            return frogArray.indexOf(item) === -1;
        });

        return await CreateChoose(val);
    }

//Fonction pour définir l'épreuve choist selon l'événement de la case
    async function caseEvent(casePlayer){
        switch(casePlayer){
            case 0:
                console.log("multi-choix");
                return await multiChoose(3);
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
//fonction qui définie la case 0 :  multi-choix
//
    async function multiChoose(numRan){
        console.log("Vous êtes sur un choix multiple");
        
        let val = [];
        let pos = [1,2,3,4,5,6];
        for(i = 0; i < numRan; i++){
            let randNumber = Math.floor(Math.random() * pos.length - 1) + 1;
            val[i] = pos[randNumber];
            pos = pos.filter(function(item) {
                return [pos[randNumber]].indexOf(item) === -1;
            });
        }
        return await CreateChoose(val);
    }

    async function CreateChoose(val){
        //init element
        boutonClique = initBottom(val,"Choisissez un thème parmis les TROIS");
        
        let result = await ClickButton(boutonClique);
        return await questionEpreuve(result);

    }


//fonction qui va demander la difficulté choisit + afficher la question
    //Retourne l'épreuve + la réussite OU complete le joueur
    //TODO : SQL
    async function questionEpreuve(epreuve){
        console.log(epreuve);
        
        //init
        boutonClique = initBottom(["Paris", "Moscou", "Tokyo"], "Quel est la capitale de France ?");
        reponse = "Paris";
        let result = await ClickButton(boutonClique);
        let res = [];

        if(result == reponse) res = [epreuve, 2];
        else res = [epreuve, 0];
        return res;
    }

    function initBottom(val, phrase){
        //init
        let mainDiv = document.createElement("div");
        mainDiv.id="bottom";
        let ChooseDiv = document.createElement("div");
        ChooseDiv.id = "bottom-response-panel"
        let SentenceDiv = document.createElement("div");
        SentenceDiv.id = "bottom-question-panel";

        //init bouton
        let boutonClique = [];
        for(i = 0; i < val.length; i++){
            let index = i;
            let bouton = document.createElement("button");
            bouton.innerText = val[i];

            //Promise
            boutonClique[i] = new Promise((resolve) => {
                bouton.addEventListener("click", () => {
                    mainDiv.remove();
                    resolve(val[index]);
                });
            });

            ChooseDiv.appendChild(bouton);
        }

        let par = document.createElement("p");
        par.id = "question-zone";
        par.innerText = phrase;
        SentenceDiv.appendChild(par);

        mainDiv.appendChild(ChooseDiv);
        mainDiv.appendChild(SentenceDiv);

        let body = document.getElementsByTagName("body")[0];
        body.appendChild(mainDiv);

        return boutonClique;
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