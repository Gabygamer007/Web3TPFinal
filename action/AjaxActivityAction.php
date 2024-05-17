<?php
    require_once("action/CommonAction.php");
    #require_once("action/DAO/CartesPopulairesDAO.php");

    class AjaxActivityAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $data = [];
            $data["type"] = $_POST["typeAction"];
            $data["uid"] = $_POST["uid_card"];
            $data["targetuid"] = $_POST["uid_target_card"];
            $data["key"] = $_SESSION["key"];
            #if ($data["type"] == "PLAY") {
            #    CartesPopulairesDao::addNbFoisJoue($_POST["id_card"]);
            #}
            $result = parent::callAPI("games/action", $data);
            
            return compact("result");
        }
    }