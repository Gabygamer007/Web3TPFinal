<?php
	require_once("action/CartesAction.php");

	$action = new CartesAction();
	$data = $action->execute();

	require_once("partial/header.php");
    $infos = CartesPopulairesDAO::infos_cartes();
    $nbTotalCartesJouees = CartesPopulairesDAO::getNbTotalCarteJoue();
    function donner_pourcentage ($nbFoisJoue, $nbTotal) {
        $total = ($nbFoisJoue)/($nbTotal)*100;
        return ($total);
    }
?>
    <title>Carte populaires</title>
    <link href="css/cartes.css" rel="stylesheet" >
    <script defer src="js/javascript.js"></script>
    
</head>
<body>
    <div>
        <a href="lobby.php"><button><---- Retour</button></a>
        <form action="" method="post">
            <button type="submit" name="EFFACER_DONNEES" >Effacer base de donnees</button>
        </form>
    </div>
    
    
    <div class="container">
        <div class="podium">
            <?php if (isset($infos[2])) { ?>
                <div style="margin-top:50px;" class="trois-premiers"> <!-- deuxieme carte la plus jouee -->
                    <div class="img_carte" style="background-image: url('img/images_persos/perso-<?php echo($infos[1]["id_carte"])?>.png');"></div>
                    <div class="id_carte">id: <?php echo(($infos[1]["id_carte"]))?></div>
                    <div class="id_carte">Popularite: <?php echo(round($infos[1]["count"]/$nbTotalCartesJouees[0]["count"]*100)) ?>%</div>
                </div>
                <div class="trois-premiers"> <!-- premiere carte la plus jouee -->
                    <div class="img_carte" style="background-image: url('img/images_persos/perso-<?php echo($infos[0]["id_carte"])?>.png');"></div>
                    <div class="id_carte">id: <?php echo(($infos[0]["id_carte"]))?></div>
                    <div class="id_carte">Popularite: <?php echo(round($infos[0]["count"]/$nbTotalCartesJouees[0]["count"]*100)) ?>%</div>
                </div>
                <div style="margin-top:100px;" class="trois-premiers"> <!-- troisieme carte la plus jouee -->
                    <div class="img_carte" style="background-image: url('img/images_persos/perso-<?php echo($infos[2]["id_carte"])?>.png');"></div>
                    <div class="id_carte">id: <?php echo(($infos[2]["id_carte"]))?></div>
                    <div class="id_carte">Popularite: <?php echo(round($infos[2]["count"]/$nbTotalCartesJouees[0]["count"]*100)) ?>%</div>
                </div>
            <?php } 
                else { ?>

            <?php } ?>
        </div>
    </div>
    
</body>
<?php
    require_once("partial/footer.php");