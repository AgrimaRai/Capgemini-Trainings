CREATE DATABASE player_management;
USE player_management;

CREATE TABLE players (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    skill VARCHAR(50) NOT NULL,
    exp INT NOT NULL,
    country VARCHAR(100) NOT NULL,
    overall_score DOUBLE NOT NULL
);
