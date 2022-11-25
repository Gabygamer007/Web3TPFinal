<?php
    require_once("action/GameAction.php");

    $action = new GameAction();
    $data = $action->execute();

	require_once("partial/header.php");
?>

<title>Page de jeu</title>
    <link href="css/game.css" rel="stylesheet" >
    <script defer src="js/javascript.js"></script>
</head>
<body>
    <div class="opponent-bar">
        <div class="opponent-hand-cards">
            <div class="carte-cachee"></div>
            <div class="carte-cachee"></div>
            <div class="carte-cachee"></div>
            <div class="carte-cachee"></div>
            <div class="carte-cachee"></div>
            <div class="carte-cachee"></div>
            <div class="carte-cachee"></div>
            <div class="carte-cachee"></div>
        </div>
        <div class="opponent-info">
            <div class="opponent-health">30</div>
            <div class="opponent-user-image"></div>
            <div class="opponent-mp">0</div>
        </div>
        <div class="opponent-card-left"><div class="opponent-card-left-value">25</div></div>
    </div>
    <div class="opponent-cards">
        <div class="carte">
            <div class="carte-cost">10</div>
            <div class="carte-img" style="background-image: url(./img/image1-front-card.png); background-repeat: round; background-size: cover;"></div>
            <div class="carte-name">Ninja</div>
            <div class="carte-desc">Battlecry : Leech 1 HP from the opponent's hero</div>
            <div class="carte-stats">
                <div class="carte-health">10</div>
                <div class="carte-atk">1</div>
            </div>
        </div>
        <div class="carte">
        <div class="carte-cost">8</div>
            <div class="carte-img" style="background-image: url(./img/image2-front-card.png); background-repeat: round; background-size: cover;"></div>
            <div class="carte-name">Ninja</div>
            <div class="carte-desc">Stealth: At the start of your turn, give +1 HP to a random friendly minion</div>
            <div class="carte-stats">
                <div class="carte-health">1</div>
                <div class="carte-atk">1</div>
            </div>
        </div>
        <div class="carte"></div>
        <div class="carte"></div>
        <div class="carte"></div>
        <div class="carte"></div>
        <div class="carte"></div>
    </div>
    <div class="my-cards">
        <div class="carte">
            <div class="carte-cost">10</div>
            <div class="carte-img" style="background-image: url(./img/image3-front-card.png); background-repeat: round; background-size: cover;"></div>
            <div class="carte-name">Ninja</div>
            <div class="carte-desc">Stealth: At the start of your turn, give +1 HP to a random friendly minion</div>
            <div class="carte-stats">
                <div class="carte-health">1</div>
                <div class="carte-atk">1</div>
            </div>
        </div>
        <div class="carte">
            <div class="carte-cost">10</div>
            <div class="carte-img" style="background-image: url(./img/image4-front-card.png); background-repeat: round; background-size: cover;"></div>
            <div class="carte-name">Ninja</div>
            <div class="carte-desc">Stealth: At the start of your turn, give +1 HP to a random friendly minion</div>
            <div class="carte-stats">
                <div class="carte-health">1</div>
                <div class="carte-atk">1</div>
            </div>
        </div>
        <div class="carte"></div>
        <div class="carte"></div>
        <div class="carte"></div>
        <div class="carte"></div>
        <div class="carte"></div></div>
    <div class="my-bar">
        <div class="my-info">
            <div class="my-health">30</div>
            <div class="my-mp"><div class="my-mp-value">1</div></div>
            <div class="my-cards-left"><div class="my-cards-left-value">25</div></div>
        </div>
        <div class="my-hand-cards">
            <div class="carte">
                <div class="carte-cost">10</div>
                <div class="carte-img" style="background-image: url(./img/image4-front-card.png); background-repeat: round; background-size: cover;"></div>
                <div class="carte-name">Ninja</div>
                <div class="carte-desc">Stealth: At the start of your turn, give +1 HP to a random friendly minion</div>
                <div class="carte-stats">
                    <div class="carte-health">1</div>
                    <div class="carte-atk">1</div>
                </div>
            </div>
        </div>
        <div class="my-misc">
            <Button class="boutons-misc">Hero Power</Button>
            <Button class="boutons-misc">Surrender</Button>
            <div class="time-remaining">50</div>
        </div>
    </div>
    
</body>
<?php
    require_once("partial/footer.php");