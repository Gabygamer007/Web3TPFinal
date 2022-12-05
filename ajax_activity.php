<?php
    require_once("action/AjaxActivityAction.php");

    $action = new AjaxActivityAction();
    $data = $action->execute();

    echo json_encode($data["result"]);