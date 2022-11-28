let bouton_surrender = document.querySelector("#surrender");
let bouton_hero_power = document.querySelector("#hero_power");
let bouton_end_turn = document.querySelector("#end_turn");
let attack_card_uid = "";
let hero_ennemi = document.querySelector(".opponent-user-image");

hero_ennemi.onclick = () => {
    if (attack_card_uid != "") {
        actions("ATTACK", attack_card_uid, 0);
        attack_card_uid = "";
    }
}

bouton_surrender.onclick = () => {
    actions("SURRENDER", null, null);
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

            if (data == "WAITING") {
                document.querySelector(".my-health").innerHTML = "waiting";
                document.querySelector(".my-mp-value").innerHTML = "waiting";
                document.querySelector(".my-cards-left-value").innerHTML = "waiting";


                document.querySelector(".opponent-health").innerHTML = "waiting";
                document.querySelector(".opponent-mp").innerHTML = "waiting";
                document.querySelector(".opponent-card-left-value").innerHTML = "waiting";
            }
            else if (data == "LAST_GAME_LOST") {
                document.querySelector('body').innerHTML = 'YOU LOST :(';
                document.querySelector('body').className = "game-lost";
                setTimeout(() => { location.href = "lobby.php"; }, 5000);
            }
            else if (data != "WAITING") {
                document.querySelector(".my-health").innerHTML = data["hp"];
                document.querySelector(".my-mp-value").innerHTML = data["mp"];
                document.querySelector(".my-cards-left-value").innerHTML = data["remainingCardsCount"];


                document.querySelector(".opponent-health").innerHTML = data["opponent"]["hp"];
                document.querySelector(".opponent-mp").innerHTML = data["opponent"]["mp"];
                document.querySelector(".opponent-card-left-value").innerHTML = data["opponent"]["remainingCardsCount"];
                document.querySelector(".opponent-user-image").innerHTML = data["opponent"]["username"];

                if (data["yourTurn"]) {
                    document.querySelector(".time-remaining").innerHTML = data["remainingTurnTime"];
                    document.querySelector(".time-remaining").style.color = "greenyellow";
                    if (data["mp"] >= 2 && data["heroPowerAlreadyUsed"] == false) {
                        bouton_hero_power.style.backgroundColor = "rgb(0, 100, 0)"
                    }
                    else {
                        bouton_hero_power.style.backgroundColor = "gray"
                    }
                }
                else {
                    document.querySelector(".time-remaining").innerHTML = data["remainingTurnTime"];
                    document.querySelector(".time-remaining").style.color = "red";
                }

                let cartes_cachees_opponent = document.querySelector(".opponent-hand-cards");
                cartes_cachees_opponent.innerHTML = "";
                for (i = 0; i < data["opponent"]["handSize"]; i++) {
                    let carte_cachee_div = document.createElement("div");
                    carte_cachee_div.className = "carte-cachee";
                    cartes_cachees_opponent.appendChild(carte_cachee_div);
                }

                let div_ma_main = document.querySelector(".my-hand-cards");
                div_ma_main.innerHTML = "";
                let div_son_board = document.querySelector(".opponent-cards");
                div_son_board.innerHTML = "";
                let div_mon_board = document.querySelector(".my-cards");
                div_mon_board.innerHTML = "";
                creerCartes(div_ma_main, data["hand"], data);
                if (data["opponent"] != null) {
                    creerCartes(div_son_board, data["opponent"]["board"], data);
                }
                creerCartes(div_mon_board, data["board"], data);
            }
            console.log(attack_card_uid);



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
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}

function creerCartes(div, cartes, data) {
    for (carte in cartes) {
        let div_carte = document.createElement("div");
        div_carte.className = "carte";
        let div_cost = document.createElement("div");
        div_cost.className = "carte-cost";
        let div_img = document.createElement("div");
        div_img.className = "carte-img";
        div_img.style.backgroundImage = "url(./img/image4-front-card.png)";
        div_img.style.backgroundRepeat = "round";
        div_img.style.backgroundSize = "cover";
        let div_name = document.createElement("div");
        div_name.className = "carte-name";
        div_name.innerHTML = "Shikamaru Nara";
        let div_desc = document.createElement("div");
        div_desc.className = "carte-desc";

        let div_stats = document.createElement("div");
        div_stats.className = "carte-stats";
        let div_health = document.createElement("div");
        div_health.className = "carte-health";
        let div_atk = document.createElement("div");
        div_atk.className = "carte-atk";

        div_cost.innerHTML = cartes[carte]["cost"];
        div_desc.innerHTML = cartes[carte]["mechanics"];
        div_health.innerHTML = cartes[carte]["hp"];
        div_atk.innerHTML = cartes[carte]["atk"];

        if (cartes[carte]["mechanics"].includes("Taunt")) {
            div_desc.style.backgroundImage = "url(./img/taunt.png)";
            div_desc.style.backgroundRepeat = "no-repeat";
            div_desc.style.backgroundSize = "40px";
            div_desc.style.backgroundPosition = "center";
        }
        else if (cartes[carte]["mechanics"].includes("Stealth")) {
            div_desc.style.backgroundImage = "url(./img/stealth.png)";
            div_desc.style.backgroundRepeat = "no-repeat";
            div_desc.style.backgroundSize = "40px";
            div_desc.style.backgroundPosition = "center";
        }



        div_stats.append(div_health);
        div_stats.append(div_atk);
        div_carte.append(div_cost);
        div_carte.append(div_img);
        div_carte.append(div_name);
        div_carte.append(div_desc);
        div_carte.append(div_stats);

        let uid = cartes[carte]["uid"];

        if (div == document.querySelector(".my-hand-cards")) {
            if (cartes[carte]["cost"] <= data["mp"]) {
                div_name.style.textShadow = 
                "2px 0 yellowgreen, -2px 0 yellowgreen, 0 2px yellowgreen, 0 -2px yellowgreen, 1px 1px yellowgreen, -1px -1px yellowgreen, 1px -1px yellowgreen, -1px 1px yellowgreen";
            }
            else {

            }
            div_carte.onclick = () => {
                actions("PLAY", uid, null);
            }
        }
        else if (div == document.querySelector(".my-cards")) {
            if (cartes[carte]["state"] == "IDLE") {
                div_name.style.textShadow = 
                "2px 0 yellowgreen, -2px 0 yellowgreen, 0 2px yellowgreen, 0 -2px yellowgreen, 1px 1px yellowgreen, -1px -1px yellowgreen, 1px -1px yellowgreen, -1px 1px yellowgreen";
            }
            div_carte.onclick = () => {
                attack_card_uid = uid;
            }
            if (uid == attack_card_uid)
                div_carte.style.boxShadow = "0px 0px 40px 20px #0ff";
        }
        else if (div == document.querySelector(".opponent-cards")){
            div_carte.onclick = () => {
                if (attack_card_uid != "") {
                    let target_card_uid = uid;
                    actions("ATTACK", attack_card_uid, target_card_uid);
                    attack_card_uid = "";
                }
            }
        }
        
        div.append(div_carte);
    }


}
