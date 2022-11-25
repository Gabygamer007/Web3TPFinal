<?php
    require_once("action/AjaxActionsAction.php");

    $action = new AjaxActionsAction();
    $data = $action->execute();

    echo json_encode($data["result"]);