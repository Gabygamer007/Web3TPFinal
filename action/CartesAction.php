<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/CartesPopulairesDAO.php");

    class CartesAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data = [];
                
            if (isset($_POST["EFFACER_DONNEES"])) {
                CartesPopulairesDAO::effacer_donnees();
                header("location:lobby.php");
            }

            
            return [];
        }
    }