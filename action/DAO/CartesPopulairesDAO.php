<?php
    require_once("Connection.php");

    class CartesPopulairesDao{
        public static function addNbFoisJoue($id){
            $connection = Connection::getConnection();
 
            $statement = $connection->prepare(("INSERT INTO cartes (id_carte) VALUES (?)"));
            $statement->bindParam(1,$id);
            $statement->execute();
        }

        public static function infos_cartes() {
            $connection = Connection::getConnection();

            $statement = $connection->prepare(("SELECT COUNT(*), id_carte FROM cartes GROUP BY id_carte ORDER BY COUNT(*) DESC LIMIT 3"));
            $statement->setFetchMode(PDO::FETCH_ASSOC); 
            $statement->execute();

            return $statement->fetchAll();
        }

        public static function getNbTotalCarteJoue(){
            $connection = Connection::getConnection();

            $statement = $connection->prepare(("SELECT COUNT(*) FROM cartes"));
            $statement->setFetchMode(PDO::FETCH_ASSOC); 
            $statement->execute();

            return $statement->fetchAll();
        }
        public static function effacer_donnees(){
            $connection = Connection::getConnection();
 
            $statement = $connection->prepare(("DROP TABLE IF EXISTS cartes"));
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $statement = $connection->prepare(("CREATE TABLE cartes (
                                                    id_carte integer 
                                                                    )"));
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
        }

    }

?>