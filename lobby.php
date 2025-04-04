<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();

	require_once("partial/header.php");
?>

<title>Lobby</title>
    <link href="css/lobby.css" rel="stylesheet" >
    <link rel="icon" href="https://www.pngitem.com/pimgs/m/531-5315843_rasengan-freetoedit-moving-rasengan-hd-png-download.png">
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
        <div class="bouton_cartes">
            <a href="cartes.php"><button>Cartes populaires</button></a>
        </div>
        

        <div class="div-iframe">
        <iframe style="width:700px;height:562px;" onload="applyStyles(this)" 
        src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION['key'] ?>/large"> 
        </iframe>
        </div>
        


    
</body>
<?php
    require_once("partial/footer.php");

    