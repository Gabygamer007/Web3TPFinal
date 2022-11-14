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
        <div class="opponent-card-holder"></div>
        <div class="opponent-info"></div>
        <div class="opponent-card-left"></div>
    </div>
    <div class="opponent-cards">
        <div class="carte"></div>
        <div class="carte"></div>
        <div class="carte"></div>
        <div class="carte"></div>
        <div class="carte"></div>
        <div class="carte"></div>
        <div class="carte"></div>
    </div>
    <div class="my-cards"></div>
    <div class="my-bar"></div>
    
</body>
<?php
    require_once("partial/footer.php");