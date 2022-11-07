<?php
	require_once("action/CommonAction.php");

	class LoginAction extends CommonAction {
		
		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
            if (!empty($_POST["username"]) || !empty($_POST["password"])) {
                $data = [];
                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["password"];

                $result = parent::callAPI("signin", $data);

                if ($result == "INVALID_USERNAME_PASSWORD") {
                }
                else {
                	// Pour voir les informations retournées : var_dump($result);exit;
                	$key = $result->key;
                    $_SESSION["key"] = $key;
                    header("location:lobby.php");
                }
            }
			return [];
		}
	}