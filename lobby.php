<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();

	require_once("partial/header.php");
?>

<title>Lobby</title>
    <link href="css/lobby.css" rel="stylesheet" >
    <script defer src="js/javascript.js"></script>
</head>
<body>
    <div>
        <a href="login.php"><button>Log out</button></a>
        <a href="game.php"><button>Play</button></a>
        <a href="game.php"><button>Practice</button></a>
        
        <iframe style="width:700px;height:240px;" onload="applyStyles(this)" 
        src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION['key'] ?>"> 
        </iframe>


    </div>
</body>
<?php
    require_once("partial/footer.php");

    