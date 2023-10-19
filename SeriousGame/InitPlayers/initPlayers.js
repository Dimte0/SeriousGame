let PlayerData = [];

startBuild();

function startBuild(){
    //InitDATAS
    let PlayersListDiv = newData(0);

    let Bottom = document.getElementById("bottom");
    Bottom.appendChild(PlayersListDiv);
    //SEND
    let ButtonSend = document.getElementById("ButtonSend");
    ButtonSend.addEventListener("click", change);
}

function newData(index){
    //init
    let PlayersListDiv = document.createElement("div");
    PlayersListDiv.id = "PlayersList";
    let PlayerZone = document.createElement("div");
    PlayerZone.id = "Player";


    let par = document.createElement("textarea");
    par.className = "Player_text"; // Utilisez "className" pour attribuer des classes
    par.value = "PLAYER_" + (index + 1);
    PlayerData[index] = par.value;

    par.addEventListener("change", () => {
        PlayerData[index] = par.value;
    });
    PlayerZone.appendChild(par);

    // Init BoutonMoins
    
    let boutonMoins = document.createElement("button");
    boutonMoins.innerHTML = "-";
    boutonMoins.className = "BM B" + index; // Utilisez "className" pour attribuer des classes

    boutonMoins.addEventListener("click", () => {
        boutonMoins.remove();
        boutonPlus.remove();
        PlayerZone.remove();
        PlayerData.splice(index, 1);

        // Afficher les boutons "+" du joueur précédent (s'il existe)
        if (index > 0) {
            let previousBM = document.getElementsByClassName("BM B" + (index - 1));
            let previousBP = document.getElementsByClassName("BP P" + (index - 1));
            
            if(previousBP.length == 1) previousBP[0].style.display = "block";
            if(previousBM.length == 1) previousBM[0].style.display = "block";
        }
    });
        

    // Init BoutonPlus
    
    let boutonPlus = document.createElement("button");
    boutonPlus.innerHTML = "+";
    boutonPlus.className = "BP P" + index; // Utilisez "className" pour attribuer des classes

    boutonPlus.addEventListener("click", () => {
        boutonPlus.style.display = "none";
        boutonMoins.style.display = "none";
        let p = newData(PlayerData.length);
        let Bottom = document.getElementById("bottom");
        
        if (index === PlayerData.length - 1) {
            Bottom.appendChild(p);
        } else {
            Bottom.insertBefore(p, boutonPlus.parentElement.nextSibling);
        }
    });

    // Attribution
    PlayersListDiv.appendChild(PlayerZone);
    
    if(PlayerData.length < 8) PlayersListDiv.appendChild(boutonPlus);
    if(PlayerData.length > 1) PlayersListDiv.appendChild(boutonMoins);
    PlayerData.forEach(element => {
        console.log(element);
    });
    return PlayersListDiv;
}

function change(){
        
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "game/game.html", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log("dedee");
            document.getElementById("frame").innerHTML = xhr.responseText;
        }
        // Définissez l'URL du fichier CSS alternatif
        let newStylesheet = document.getElementById("frame-style");
        newStylesheet.setAttribute("href", "game/game.css");

        var script = document.createElement('script');
        script.src = "game/game.js";
        script.setAttribute("param1", PlayerData);

        // Assurez-vous que le script précédent est supprimé (s'il existe)
        var scripts = document.getElementsByTagName('script');
        var scriptPrecedent = scripts[scripts.length - 1];
        if (scriptPrecedent) {
            scriptPrecedent.parentNode.removeChild(scriptPrecedent);
        }

        // Ajoutez le nouveau script au document
        document.head.appendChild(script);
    
    };
    xhr.send();
}