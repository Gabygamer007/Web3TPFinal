let bouton_surrender = document.querySelector("#surrender");
let bouton_hero_power = document.querySelector("#hero_power");
let bouton_end_turn = document.querySelector("#end_turn");
let attack_card_uid = "";
let hero_ennemi = document.querySelector(".opponent-user-image");
let div_erreurs = document.createElement("div");
div_erreurs.className = "message_erreur";
let nb_secs = 0;

hero_ennemi.onclick = () => {
    if (attack_card_uid != "") {
        activity("ATTACK", null, attack_card_uid, 0);
        attack_card_uid = "";
    }
}

bouton_surrender.onclick = () => {
    activity("SURRENDER", 111, null, null);
}

bouton_hero_power.onclick = () => {
    activity("HERO_POWER", 0, null, null);
}

bouton_end_turn.onclick = () => {
    activity("END_TURN", null, null, null);
}


const state = () => {
    fetch("ajax-state.php", {
        method: "POST"
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

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
            else if (data == "LAST_GAME_WON") {
                document.querySelector('body').innerHTML = 'YOU WON ! :)';
                document.querySelector('body').className = "game-won";
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
                    attack_card_uid = "";
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

                div_mon_board.append(div_erreurs);

                if (nb_secs == 3) {
                    nb_secs = 0;
                    div_erreurs.innerHTML = "";
                }


            }
            console.log(attack_card_uid);

            nb_secs += 1;

            setTimeout(state, 1000);
        })
}


window.addEventListener("load", () => {
    setTimeout(state, 1000);
});


function activity(typeAction, id_card, uid_card, uid_target_card) {
    let formData = new FormData();
    formData.append("typeAction", typeAction);
    formData.append("id_card", id_card);
    formData.append("uid_card", uid_card);
    formData.append("uid_target_card", uid_target_card);

    fetch("ajax_activity.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            let div_template = document.createElement("p");
            if (data == "INVALID_KEY") {
                div_template.innerHTML = "Clé invalide";
                div_erreurs.append(div_template);
            }
            else if (data == "INVALID_ACTION") {
                div_template.innerHTML = "Action invalide";
                div_erreurs.append(div_template);
            }
            else if (data == "ACTION_IS_NOT_AN_OBJECT") {
                div_template.innerHTML = "Mauvaise structure de données";
                div_erreurs.append(div_template);
            }
            else if (data == "NOT_ENOUGH_ENERGY") {
                div_template.innerHTML = "Pas assez d'énergie";
                div_erreurs.append(div_template);
            }
            else if (data == "BOARD_IS_FULL") {
                div_template.innerHTML = "Pas assez de place pour la carte";
                div_erreurs.append(div_template);
            }
            else if (data == "CARD_NOT_IN_HAND") {
                div_template.innerHTML = "La carte n’est pas dans votre main";
                div_erreurs.append(div_template);
            }
            else if (data == "CARD_IS_SLEEPING") {
                div_template.innerHTML = "Carte ne peut être jouée ce tour-ci";
                div_erreurs.append(div_template);
            }
            else if (data == "MUST_ATTACK_TAUNT_FIRST") {
                div_template.innerHTML = "Vous devez attaquer les carte 'taunt' d'abord";
                div_erreurs.append(div_template);
            }
            else if (data == "OPPONENT_CARD_NOT_FOUND") {
                div_template.innerHTML = "La carte attaquée n’est pas présente sur le jeu";
                div_erreurs.append(div_template);
            }
            else if (data == "OPPONENT_CARD_HAS_STEALTH") {
                div_template.innerHTML = "La carte ne peut être attaquée directement tant qu’elle possède « stealth »";
                div_erreurs.append(div_template);
            }
            else if (data == "CARD_NOT_FOUND") {
                div_template.innerHTML = "La carte cherchée (uid) n’est pas présente";
                div_erreurs.append(div_template);
            }
            else if (data == "ERROR_PROCESSING_ACTION") {
                div_template.innerHTML = "Erreur interne, ne devrait pas se produire";
                div_erreurs.append(div_template);
            }
            else if (data == "INTERNAL_ACTION_ERROR") {
                div_template.innerHTML = "Autre erreur interne, ne devrait pas se produire";
                div_erreurs.append(div_template);
            }
            else if (data == "HERO_POWER_ALREADY_USED") {
                div_template.innerHTML = "Pouvoir déjà utilisé pour ce tour";
                div_erreurs.append(div_template);
            }
            else if (data == "WRONG_TURN") {
                div_template.innerHTML = "Ce n'est pas votre tour";
                div_erreurs.append(div_template);
            }
            console.log(data);
        })
}

function creerCartes(div, cartes, data) {
    for (carte in cartes) {
        let id = cartes[carte]["id"]

        let div_carte = document.createElement("div");
        div_carte.className = "carte";
        let div_cost = document.createElement("div");
        div_cost.className = "carte-cost";
        let div_img = document.createElement("div");
        div_img.className = "carte-img";
        if (1 <= id <= 101) // carte qui existe en ce moment
            div_img.style.backgroundImage = "url(./img/images_persos/perso-" + id + ".png)";
        else // carte "generique"
            div_img.style.backgroundImage = "url(./img/images_persos/perso-0.png)";
        div_img.style.backgroundRepeat = "round";
        div_img.style.backgroundSize = "cover";
        let div_name = document.createElement("div");
        div_name.className = "carte-name";
        div_name.innerHTML = dictNoms[id];
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
        if (data["yourTurn"] == true) {
            if (div == document.querySelector(".my-hand-cards")) {
                if (cartes[carte]["cost"] <= data["mp"]) {
                    div_name.style.textShadow =
                        "2px 0 yellowgreen, -2px 0 yellowgreen, 0 2px yellowgreen, 0 -2px yellowgreen, 1px 1px yellowgreen, -1px -1px yellowgreen, 1px -1px yellowgreen, -1px 1px yellowgreen";
                }
                div_carte.onclick = () => {
                    activity("PLAY", id, uid, null);
                }
            }
            else if (div == document.querySelector(".my-cards")) {
                if (cartes[carte]["state"] == "IDLE") {
                    if (uid == attack_card_uid)
                        div_carte.style.boxShadow = "0px 0px 40px 10px #0ff";
                    div_name.style.textShadow =
                        "2px 0 yellowgreen, -2px 0 yellowgreen, 0 2px yellowgreen, 0 -2px yellowgreen, 1px 1px yellowgreen, -1px -1px yellowgreen, 1px -1px yellowgreen, -1px 1px yellowgreen";
                }
                div_carte.onclick = () => {
                    if (uid == attack_card_uid)
                        attack_card_uid = "";
                    else
                        attack_card_uid = uid;
                }
            }
            else if (div == document.querySelector(".opponent-cards")) {
                div_carte.onclick = () => {
                    if (attack_card_uid != "") {
                        let target_card_uid = uid;
                        activity("ATTACK", null, attack_card_uid, target_card_uid);
                        attack_card_uid = "";
                        console.log(target_card_uid);
                    }
                }
            }
        }
        div.append(div_carte);
    }


}

let dictNoms = {
    0: "Ninja", // carte "generique"
    1: "Leaf Ninja",
    2: "Choji Akimichi",
    3: "Fukasaku and Shima",
    4: "Chiriku the Monk",
    5: "Mifune Samurai",
    6: "Anko Mitarashi",
    7: "Temari",
    8: "Neji Hyuga",
    9: "Ameyuri Ringo",
    10: "Kurotsuchi",
    11: "Akatsuchi",
    12: "Kiba Inuzuka",
    13: "Rock Lee",
    14: "Dan Kato",
    15: "Hanzo of the Salamander",
    16: "Konan",
    17: "Yugito Nii",
    18: "Tobirama Senju",
    19: "Omoi",
    20: "Kushina Uzumaki",
    21: "Kakuzu",
    22: "Darui",
    23: "Chiyo",
    24: "Orochimaru",
    25: "Kakashi Hatake",
    26: "Jugo",
    27: "Indra Otsutsuki",
    28: "Ginkaku and Kinkaku",
    29: "Itachi Uchiha",
    30: "Naruto Uzumaki",
    31: "Hashirama Senju",
    32: "Madara Uchiha",
    33: "Obito Uchiha",
    34: "Rin Nohara",
    35: "Yagura Karatachi",
    36: "Hamura Otsutsuki",
    37: "Zabuza Momochi",
    38: "Mei Terumi",
    39: "Deidara",
    40: "Pakura",
    41: "A",
    42: "Rasa",
    43: "Asura Otsutsuki",
    44: "C",
    45: "Berserk Gyuki",
    46: "Might Guy",
    47: "Shikamaru Nara",
    48: "Yamato",
    49: "Jiraiya",
    50: "Mu",
    51: "Kimimaro",
    52: "Iruka Umino",
    53: "Nagato Uzumaki",
    54: "Pain",
    55: "Roshi",
    56: "Shino Aburame",
    57: "Shisui Uchiha",
    58: "Killer B",
    59: "Haku",
    60: "Tenten",
    61: "Chojuro",
    62: "Sasuke Uchiha",
    63: "Hiashi Hyuga",
    64: "Kaguya Otsutsuki",
    65: "Hidan",
    66: "Kankuro",
    67: "Karin Uzumaki",
    68: "A",
    69: "Sakura Haruno",
    70: "Chino",
    71: "Kidomaru",
    72: "Sai",
    73: "Kurenai Sarutobi",
    74: "Utakata",
    75: "Sakon and Ukon",
    76: "Tsunade Senju",
    77: "Tayuya",
    78: "Shikaku Nara",
    79: "Jirobo",
    80: "Fuguki Suikazan",
    81: "Danzo Shimura",
    82: "Mangetsu Hozuki",
    83: "Kushimaru Kuriarare",
    84: "Gengetsu Hozuki",
    85: "Shizune",
    86: "Onoki",
    87: "Minato Namikaze",
    88: "Sakumo Hatake",
    89: "Suigetsu Hozuki",
    90: "Jinpachi Munashi",
    91: "Fu",
    92: "Hagoromo Otsutsuki",
    93: "Hinata Hyuga",
    94: "Sasori",
    95: "Jinin Akebino",
    96: "Hiruzen Sarutobi",
    97: "Ino Yamanaka",
    98: "Tobi",
    99: "Gaara",
    100: "Kisame Hoshigaki",
    101: "Ao"
}
