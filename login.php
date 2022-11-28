<?php
	require_once("action/LoginAction.php");

	$action = new LoginAction();
	$data = $action->execute();

	require_once("partial/header.php");
?>
    <title>Page d'accueil</title>
    <link href="css/login.css" rel="stylesheet" >
</head>
<body>
    <div class="invalid-password" <?php 
        if ($data["invalid_password"] == true) {
            ?>
            style="opacity: 100%"
            <?php
        }
        else {
            ?>
            style="opacity: 0%"
            <?php
        }
        ?>
    >Mot de passe ou nom d'utilisateur invalide</div>
    
    <div id="container">
        <h1>Magix</h1>
        <div id="box">
            <form action="" method="post">
                <div class="formbox">
                    <input type="text" name="username" placeholder="Nom d'utilisateur" required>
                    <input type="password" name="password" placeholder="Mot de passe" required>
                    <button>Connexion</button>
                </div>
            </form>
        </div>
    </div>
</body>
<?php
    require_once("partial/footer.php");