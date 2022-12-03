<?php
	require_once("action/CommonAction.php");

	class LobbyAction extends CommonAction {
		
		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

		protected function executeAction() {
            $data = [];
			$type = null;
			if (isset($_POST["PVP"]))
				$type = "PVP";
			else if (isset($_POST["TRAINING"]))
				$type = "TRAINING";
			else if (isset($_POST["LOG_OUT"])) {
				$data["key"] = $_SESSION["key"];
				$result = parent::callAPI("signout", $data);
				$_SESSION["visibility"] = CommonAction::$VISIBILITY_PUBLIC;
				header("location:login.php");
			}
			
			if (isset($_POST["PVP"]) or isset($_POST["TRAINING"]) ) {
				$data["type"] = $type;
				$data["key"] = $_SESSION["key"];
				$result = parent::callAPI("games/auto-match", $data);
				if ($result == "JOINED_TRAINING")
					header("location:game.php");
			}
			


			return [];
		}


	}