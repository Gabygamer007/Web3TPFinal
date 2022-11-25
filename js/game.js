let bouton_surrender = document.querySelector("#surrender");
let bouton_hero_power = document.querySelector("#hero_power");
let bouton_end_turn = document.querySelector("#end_turn");



bouton_surrender.onclick = () => {
    actions("SURRENDER", null, null);
    location.href = "lobby.php";
}

bouton_hero_power.onclick = () => {
    actions("HERO_POWER", null, null);
}

bouton_end_turn.onclick = () => {
    actions("END_TURN", null, null);
}


const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method: "POST"        // l’API (games/state)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // contient les cartes/état du jeu.

            if (data != "WAITING") {
                document.querySelector(".my-health").innerHTML = data["hp"];
                document.querySelector(".my-mp-value").innerHTML = data["mp"];
                document.querySelector(".my-cards-left-value").innerHTML = data["remainingCardsCount"];


                document.querySelector(".opponent-health").innerHTML = data["opponent"]["hp"];
                document.querySelector(".opponent-mp").innerHTML = data["opponent"]["mp"];
                document.querySelector(".opponent-card-left-value").innerHTML = data["opponent"]["remainingCardsCount"];

                if (data["yourTurn"]){
                    document.querySelector(".time-remaining").innerHTML = data["remainingTurnTime"]
                    document.querySelector(".time-remaining").style.color = "greenyellow"
                }
                else {
                    document.querySelector(".time-remaining").innerHTML = data["remainingTurnTime"]
                    document.querySelector(".time-remaining").style.color = "red"
                }
            }





            setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
        })
}


window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});


function actions(type, uid, targetuid) {
    let formData = new FormData();
    formData.append("type", type);
    formData.append("uid", uid);
    formData.append("targetuid", targetuid);

    fetch("ajax-actions.php", {
        method: "POST",
        body:formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}

