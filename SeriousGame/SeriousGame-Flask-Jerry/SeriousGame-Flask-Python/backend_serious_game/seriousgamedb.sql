-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 15 nov. 2023 à 18:48
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `seriousgamedb`
--

-- --------------------------------------------------------

--
-- Structure de la table `joueur`
--

DROP TABLE IF EXISTS `joueur`;
CREATE TABLE IF NOT EXISTS `joueur` (
  `JoueurID` int(11) NOT NULL AUTO_INCREMENT,
  `JoueurPseudo` varchar(255) NOT NULL,
  `JoueurPoint` int(11) NOT NULL,
  `PartieID` int(11) NOT NULL,
  PRIMARY KEY (`JoueurID`),
  KEY `fk_PartieID` (`PartieID`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `joueur`
--

INSERT INTO `joueur` (`JoueurID`, `JoueurPseudo`, `JoueurPoint`, `PartieID`) VALUES
(1, 'Bast', 8, 1),
(2, 'John', 3, 1),
(3, 'Son', 5, 1),
(5, 'Avrest', 7, 1);

-- --------------------------------------------------------

--
-- Structure de la table `niveau`
--

DROP TABLE IF EXISTS `niveau`;
CREATE TABLE IF NOT EXISTS `niveau` (
  `NiveauID` int(11) NOT NULL AUTO_INCREMENT,
  `NiveauIntitule` varchar(255) NOT NULL,
  `NiveauPoint` int(11) NOT NULL,
  PRIMARY KEY (`NiveauID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `niveau`
--

INSERT INTO `niveau` (`NiveauID`, `NiveauIntitule`, `NiveauPoint`) VALUES
(1, 'Facile', 1),
(2, 'Moyen', 2),
(3, 'Difficile', 3);

-- --------------------------------------------------------

--
-- Structure de la table `partie`
--

DROP TABLE IF EXISTS `partie`;
CREATE TABLE IF NOT EXISTS `partie` (
  `PartieID` int(11) NOT NULL AUTO_INCREMENT,
  `partieNom` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PartieID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `partie`
--

INSERT INTO `partie` (`PartieID`, `partieNom`) VALUES
(1, 'Partie1'),
(3, 'Partie3');

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `QuestionID` int(11) NOT NULL AUTO_INCREMENT,
  `QuestionIntitule` varchar(255) NOT NULL,
  `ThemeID` int(11) NOT NULL,
  `NiveauID` int(11) NOT NULL,
  PRIMARY KEY (`QuestionID`),
  KEY `fk_ThemeID` (`ThemeID`),
  KEY `fk_NiveauID` (`NiveauID`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `question`
--

INSERT INTO `question` (`QuestionID`, `QuestionIntitule`, `ThemeID`, `NiveauID`) VALUES
(1, 'Qui est l\'atome', 1, 2),
(3, 'Laquelle de ces 3 propositions est fausse', 1, 3),
(4, 'Qui est le proton', 1, 3),
(5, 'Qui est le neutron', 1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `reponse`
--

DROP TABLE IF EXISTS `reponse`;
CREATE TABLE IF NOT EXISTS `reponse` (
  `ReponseID` int(11) NOT NULL AUTO_INCREMENT,
  `ReponseIntitule` varchar(255) DEFAULT NULL,
  `ReponseImage` varchar(255) DEFAULT NULL,
  `ReponseIsCorrect` tinyint(1) NOT NULL,
  `reponseFeedback` varchar(255) DEFAULT NULL,
  `QuestionID` int(11) NOT NULL,
  PRIMARY KEY (`ReponseID`),
  KEY `fk_QuestionID` (`QuestionID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `theme`
--

DROP TABLE IF EXISTS `theme`;
CREATE TABLE IF NOT EXISTS `theme` (
  `ThemeID` int(11) NOT NULL AUTO_INCREMENT,
  `ThemeIntitule` varchar(255) NOT NULL,
  PRIMARY KEY (`ThemeID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `theme`
--

INSERT INTO `theme` (`ThemeID`, `ThemeIntitule`) VALUES
(1, 'Bio'),
(2, 'Pharmacologie');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
