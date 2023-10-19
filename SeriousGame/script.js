function runprog(){
    function change(){
        
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "InitPlayers/initPlayers.html", true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log("dedee");
                document.getElementById("frame").innerHTML = xhr.responseText;
            }
            // Définissez l'URL du fichier CSS alternatif
            let newStylesheet = document.getElementById("frame-style");
            newStylesheet.setAttribute("href", "InitPlayers/initPlayers.css");

            var script = document.createElement('script');
            script.src = "InitPlayers/initPlayers.js";

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

    const btn = document.getElementById("bouton_JOUER")
    btn.addEventListener("click", change);
}


    
