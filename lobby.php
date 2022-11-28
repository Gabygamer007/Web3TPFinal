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
        <form action="" method="post">
            <button type="submit" name="LOG_OUT">Log out</button>
            <button type="submit" name="PVP">Play</button>
            <button type="submit" name="TRAINING">Practice</button>
        </form>
        
        <iframe style="width:700px;height:240px;" onload="applyStyles(this)" 
        src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION['key'] ?>"> 
        </iframe>

        <iframe width="1050px" height="500px" src="https://magix.apps-de-cours.com/server/#/deck/<?= $_SESSION['key'] ?>">
        </iframe>


    </div>
</body>
<?php
    require_once("partial/footer.php");

    