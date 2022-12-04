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
    
        <form action="" method="post">
            <button class="but_log_out" type="submit" name="LOG_OUT">Log out</button>
            <div class="div-boutons">
                <button type="submit" name="PVP">Play</button>
                <button type="submit" name="TRAINING">Practice</button>
                
            </div>
        </form>

        <div class="div-iframe">
        <iframe style="width:700px;height:240px;" onload="applyStyles(this)" 
        src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION['key'] ?>"> 
        </iframe>
        </div>
        


    
</body>
<?php
    require_once("partial/footer.php");

    