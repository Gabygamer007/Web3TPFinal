<?php
    require_once("action/GameAction.php");

    $action = new GameAction();
    $data = $action->execute();

	require_once("partial/header.php");
?>

<title>Page de jeu</title>
    <link href="css/game.css" rel="stylesheet" >
    <link rel="icon" href="https://www.pngitem.com/pimgs/m/531-5315843_rasengan-freetoedit-moving-rasengan-hd-png-download.png">
    <script defer src="js/javascript.js"></script>
    <script defer src="js/game.js"></script>
</head>
<body>
    <div class="opponent-bar">
        <div class="opponent-hand-cards">
        </div>
        <div class="opponent-info">
            <div class="opponent-health"></div>
            <div class="opponent-user-image"></div>
            <div class="opponent-mp"></div>
        </div>
        <div class="opponent-card-left"><div class="opponent-card-left-value"></div></div>
    </div>
    <div class="opponent-cards">
        
    </div>
    <div class="my-cards">
        
    </div>
    <div class="my-bar">
        <div class="my-info">
            <div class="my-health"></div>
            <div class="my-mp"><div class="my-mp-value"></div></div>
            <div class="my-cards-left"><div class="my-cards-left-value"></div></div>
        </div>
        <div class="my-hand-cards">
            
        </div>
        <div class="my-misc">
            <Button class="boutons-misc" id="hero_power">Hero Power</Button>
            <Button class="boutons-misc" id="end_turn">End Turn</Button>
            <Button class="boutons-misc" id="surrender">Surrender</Button>
            <div class="time-remaining"></div>
        </div>
    </div>
    
</body>
<?php
    require_once("partial/footer.php");