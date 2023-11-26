-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 26 nov. 2023 à 18:50
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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `partie`
--

INSERT INTO `partie` (`PartieID`, `partieNom`) VALUES
(5, 'partieX'),
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
  `QuestionImage` varchar(255) DEFAULT NULL,
  `ThemeID` int(11) NOT NULL,
  `NiveauID` int(11) NOT NULL,
  PRIMARY KEY (`QuestionID`),
  KEY `fk_ThemeID` (`ThemeID`),
  KEY `fk_NiveauID` (`NiveauID`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `question`
--

INSERT INTO `question` (`QuestionID`, `QuestionIntitule`, `QuestionImage`, `ThemeID`, `NiveauID`) VALUES
(1, 'Les féculents appartiennent à la famille des ', NULL, 1, 1),
(2, ' Le sucre de cuisine est aussi connu sous le nom de ', NULL, 1, 1),
(3, 'L’hémoglobine est  ', NULL, 1, 1),
(4, 'L’hémoglobine est : ', NULL, 1, 1),
(5, 'Cette molécule représente la formule générale', 'F:\\ProjetSeriousGame\\SeriousGame\\backend_serious_game\\upload\\Projet_Serious_Game_Files\\Capture.PNG', 1, 2),
(6, 'Cette molécule est ', 'F:\\ProjetSeriousGame\\SeriousGame\\backend_serious_game\\upload\\Projet_Serious_Game_Files\\Capture1.PNG', 1, 2),
(7, 'cette molécule est écrite ', 'F:\\ProjetSeriousGame\\SeriousGame\\backend_serious_game\\upload\\Projet_Serious_Game_Files\\Capture1.PNG', 1, 2),
(8, 'Les polysaccharides sont des molécules de haut poids constituées', NULL, 1, 3),
(9, 'Parmi les molécules citées, indiquez celle qui correspond à une hétéroprotéine ', NULL, 1, 3),
(10, 'les atomes sont composés', NULL, 2, 1),
(11, 'les molécules sont formées par l’association ', NULL, 2, 1),
(12, 'dans une molécule, les atomes sont liés entre eux par', NULL, 2, 1),
(13, ' la liaison entre deux atomes nécessite', NULL, 2, 1),
(14, ' les aliments que nous consommons au quotidien', NULL, 3, 1),
(15, '1g de glucide apporte à l’organisme une énergie équivalente à ', NULL, 3, 1),
(16, 'le glucose est important car', NULL, 3, 1),
(17, 'Dans la cellule, le glucose est oxydé dans ', NULL, 3, 2),
(18, ' la régulation des voies métaboliques est un processus  ', NULL, 3, 3),
(19, ' Une enzyme est ', NULL, 4, 1),
(20, 'Une enzyme est un catalyseur', NULL, 4, 1),
(21, 'La courbe présentée', 'F:\\ProjetSeriousGame\\SeriousGame\\backend_serious_game\\upload\\Projet_Serious_Game_Files\\Capture2.PNG', 4, 2),
(22, 'La vitesse maximale (Vmax) d’une réaction enzymatique', NULL, 4, 2),
(23, ' la spectrophotométrie UV-visible est une technique physique qui permet ', NULL, 5, 1),
(24, 'l’électrophorèse est une technique qui permet de séparer les molécules en fonction de leur ', NULL, 5, 1),
(25, ' le western-blot est une technique', NULL, 5, 2),
(26, 'dans le cas d’une électrophorèse SDS-PAGE, les protéines chargées négativement vont migrer', NULL, 5, 2),
(27, ' Après l’électrophorèse, l’étape de transfert consiste à transférer ', NULL, 5, 2),
(28, 'lorsqu’on augmente la concentration en acrylamide/bis-acrylamide, on augmente la résolution de séparation des protéines ', NULL, 5, 3),
(29, 'L’immunohistochimie permet l’étude des protéines', NULL, 5, 3),
(30, 'La spectrométrie de masse permet :', NULL, 5, 3);

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
  `ReponseFeedback` varchar(255) DEFAULT NULL,
  `QuestionID` int(11) NOT NULL,
  PRIMARY KEY (`ReponseID`),
  KEY `fk_QuestionID` (`QuestionID`)
) ENGINE=MyISAM AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `reponse`
--

INSERT INTO `reponse` (`ReponseID`, `ReponseIntitule`, `ReponseImage`, `ReponseIsCorrect`, `ReponseFeedback`, `QuestionID`) VALUES
(1, 'Glucides ', NULL, 1, '', 1),
(2, 'Protéines ', NULL, 0, 'Les protéines font partie des molécules nutritionnelles, mais on n’y trouve pas les féculents', 1),
(3, 'Lipides', NULL, 0, 'Les lipides font partie des molécules nutritionnelles, mais on n’y trouve pas les féculents', 1),
(4, 'Saccharose ', NULL, 1, '', 2),
(5, 'Glucose ', NULL, 0, ' Le sucre de cuisine est le saccharose. Le glucose est un ose qui rentre dans la composition du saccharose', 2),
(6, 'Lactose ', NULL, 0, 'Le sucre de cuisine est le saccharose. Le lactose est le sucre que l’on retrouve majoritairement dans le lait', 2),
(7, 'Une protéine présente dans les globules rouges et qui transporte l’oxygène', NULL, 1, '', 3),
(8, 'Une protéine qui est présente dans le foie et sert au transport du fer.', NULL, 0, 'L’hémoglobine transporte l’O2 et se retrouve dans le globules rouges', 3),
(9, 'Une protéine qui est présente dans les muscles et permet la contraction. ', NULL, 0, 'L’hémoglobine transporte l’O2 et se retrouve dans le globules rouges', 3),
(10, 'Une protéine', NULL, 1, '', 4),
(11, 'Un lipide', NULL, 0, 'L’hémoglobine est une protéine', 4),
(12, 'Un acide aminé', NULL, 0, 'L’hémoglobine est une protéine', 4),
(13, 'd’un acide aminé', NULL, 1, NULL, 5),
(14, 'd’un acide gras', NULL, 0, 'il s’agit de la formule générale d’un acide aminé. Un acide gras est une molécule à longue chaine carbone comportant un groupement -COOH porté par le C1', 5),
(15, 'd’un ose', NULL, 0, 'il s’agit de la formule générale d’un acide aminé. Un ose est une molécule dans la structure de laquelle on trouve une fonction aldéhyde ou une fonction cétone et plusieurs fonctions alcool', 5),
(16, 'un ose à 6 atomes de carbone', NULL, 1, NULL, 6),
(17, 'un acide gras à 6 atomes de carbone', NULL, 0, ' il s’agit d’un ose , c’est le D-glucose', 6),
(18, 'un acide aminé à 6 atome de carbone', NULL, 0, ' il s’agit d’un ose , c’est le D-glucose', 6),
(19, 'selon la représentation linéaire de Fisher', NULL, 1, NULL, 7),
(20, 'selon la représentation linéaire de Haworth', NULL, 0, ' il s’agit de la représentation linéaire de Fisher ; pour les oses, la représentation de Haworth est une représentation cyclique à 5 ou 6 sommets', 7),
(21, 'dans une représentation quelconque', NULL, 0, ' il s’agit de la représentation linéaire de Fisher', 7),
(22, 'd’un enchainement d’oses', NULL, 1, NULL, 8),
(23, 'd’oses et de protéines', NULL, 0, 'les glucides composés d’oses et de protéines sont des hétérosides', 8),
(24, 'de protéines', NULL, 0, ' les protéines ont une autre famille de macromolécules dans la structure desquelles on trouve des acides aminés', 8),
(25, 'hémoglobine', NULL, 1, NULL, 9),
(26, 'albumine', NULL, 0, ' l’albumine est la protéine la plus abondante dans le sang, elle est constituée uniquement d’acides aminés', 9),
(27, 'kératine', NULL, 0, 'la kératine est une protéine fibreuse constituée de 17 acides aminés', 9),
(28, 'd’électrons et de protons', NULL, 0, 'les atomes sont des éléments entrant dans la structure des molécules et qui sont constitués d’électrons, de neutrons et de protons', 10),
(29, 'd’électrons, de neutrons et de protons', NULL, 1, NULL, 10),
(30, 'd’électrons et de neutrons', NULL, 0, 'les atomes sont des éléments entrant dans la structure des molécules et qui sont constitués d’électrons, de neutrons et de protons', 10),
(31, 'de plusieurs atomes', NULL, 1, NULL, 11),
(32, 'de plusieurs électrons', NULL, 0, 'les molécules sont constituées de l’assemblage de plusieurs atomes, il en faut au minimum 2 pour pouvoir former une molécule', 11),
(33, 'de plusieurs noyaux réponse fausse, Feedback', NULL, 0, ':les molécules sont constituées de l’assemblage de plusieurs atomes, il en faut au minimum 2 pour pouvoir former une molécule', 11),
(34, 'une liaison covalente', NULL, 1, NULL, 12),
(35, 'une liaison de faible énergie', NULL, 0, 'les atomes d’une molécules sont liés entre eux par des liaisons covalente qui sont des liaisons de niveau énergétique élevé', 12),
(36, 'une liaison hydrogène', NULL, 0, 'les atomes d’une molécules sont liés entre eux par des liaisons covalente qui sont des liaisons de niveau énergétique élevé', 12),
(37, 'la mise en commun d’un électron provenant de chacun des deux atomes', NULL, 1, NULL, 13),
(38, 'la mise en commun d’un électron d’un atome et d’un proton du deuxième atome ', NULL, 0, 'la liaison entre 2 atomes se forment grâce à la mise en commun d’un électron provenant de chacun des deux atomes', 13),
(39, 'ne nécessitent pas d’interaction particulière entre les atomes', NULL, 0, 'la liaison entre 2 atomes se forment grâce à la mise en commun d’un électron provenant de chacun des deux atomes', 13),
(40, 'apportent l’énergie nécessaire à notre organisme', NULL, 1, NULL, 14),
(41, 'ne servent à rien, c’est juste le plaisir de manger', NULL, 0, 'les aliments apportent à notre organismes les éléments essentiels pour son développement', 14),
(42, 'sont superflus, c’est l’eau suffit à l’organisme', NULL, 0, 'les aliments apportent à notre organismes les éléments essentiels pour son développement', 14),
(43, '4 calories', NULL, 1, NULL, 15),
(44, '9 calories', NULL, 0, '1g de glucides apportent 4 calories', 15),
(45, '11 calories', NULL, 0, '1g de glucides apportent 4 calories', 15),
(46, 'Il constitue la principale source d’énergie pour certains organes', NULL, 1, NULL, 16),
(47, 'Il peut être transformé en acide nucléique', NULL, 0, 'le glucose est la principale source d’énergie pour certains organes comme le cerveau', 16),
(48, 'Il améliore le transit intestinal', NULL, 0, 'les fibres alimentaires permettent d’améliorer le transit intestinal, le glucose ne fait pas partie de la famille des fibres', 16),
(49, 'La glycolyse', NULL, 1, NULL, 17),
(50, 'Le cycle de Krebs', NULL, 0, 'le cycle de Krebs est la voie finale d’oxydation des molécules organiques, son substrat est l’acétyl-CoA', 17),
(51, 'La phosphorylation oxydative', NULL, 0, ' la phosphorylation oxydative est la voie métabolique qui permet la formation d’ATP, ses principaux substrats sont le NADH et le FADH2', 17),
(52, 'Qui permet le maintien d’un état stationnaire dynamique', NULL, 1, NULL, 18),
(53, 'Par lequel l’organisme est maintenu dans un état d’équilibre', NULL, 0, 'la mort correspond à un état d’équilibre, un organisme vivant se trouve dans un état stationnaire dynamique', 18),
(54, 'Inexistant, les réactions du métabolisme ont lieu quelles que soient les circonstances', NULL, 0, 'des événements extérieurs ont une influence sur les réactions du métabolisme qui peuvent être accélérées ou ralenties en fonction des besoins', 18),
(55, 'une protéine', NULL, 1, NULL, 19),
(56, 'un acide aminé', NULL, 0, ' une enzyme est une protéine constituée de plusieurs acides aminés', 19),
(57, 'un glucide', NULL, 0, 'une enzyme est une protéine constituée de plusieurs acides aminés', 19),
(58, 'biologique', NULL, 1, NULL, 20),
(59, 'chimique', NULL, 0, ' une enzyme est une protéine donc une molécule organique', 20),
(60, 'inorganique ', NULL, 0, ' une enzyme est une protéine donc une molécule organique', 20),
(61, 'est une hyperbole', NULL, 1, NULL, 21),
(62, 'est une droite', NULL, 0, ' la courbe est une hyperbole caractéristique des enzymes michaéliennes', 21),
(63, 'est une parabole', NULL, 0, ' la courbe est une hyperbole caractéristique des enzymes michaéliennes', 21),
(64, 'se mesure pour une concentration saturante en substrat', NULL, 1, NULL, 22),
(65, 'se mesure pour une concentration en substrat égale à KM', NULL, 0, 'Vmax se détermine pour des concentrations saturantes en substrat', 22),
(66, 'peut être obtenue dans n’importe quelle condition expérimentales', NULL, 0, ' Vmax se détermine dans des conditions optimales pour la réaction enzymatique', 22),
(67, 'de déterminer la concentration d’une substance en solution', NULL, 1, NULL, 23),
(68, 'de séparer les molécules présentes en solution', NULL, 0, ' la spectrophotométrie UV-visible permet déterminer la concentration d’une molécule et de donner des informations quant à la nature des liaisons présentes dans l’échantillon', 23),
(69, 'peut être utilisée pour n’importe quel type de molécule', NULL, 0, 'toutes les molécules n’absorbent pas la lumière dans l’UV ou le visible', 23),
(70, 'charge électrique', NULL, 1, NULL, 24),
(71, 'affinité avec un ligand', NULL, 0, 'le courant électrique qui circule dans le gel d’électrophorèse permet la migration des molécules et leur séparation selon la charge électrique globale', 24),
(72, 'caractère hydrophobe', NULL, 0, 'le courant électrique qui circule dans le gel d’électrophorèse permet la migration des molécules et leur séparation selon la charge électrique globale', 24),
(73, 'semi-quantitative', NULL, 0, ' le western-blot permet de mettre en évidence la présence d’une protéine et aussi de la quantifier', 25),
(74, 'semi-qualitativ', NULL, 0, ' le western-blot permet de mettre en évidence la présence d’une protéine et aussi de la quantifier', 25),
(75, 'quantitative et qualitative', NULL, 1, NULL, 25),
(76, 'de l’anode (+) vers la cathode (-)', NULL, 0, ' dans la technique SDS-PAGE les protéines sont toutes chargées négativement, déposées du côté de la cathode et vont migrer vers l’anode', 26),
(77, 'de la cathode (-) vers l’anode (+)', NULL, 1, NULL, 26),
(78, 'par diffusion dans le gel indépendamment des électrodes', NULL, 0, 'dans la technique SDS-PAGE les protéines sont toutes chargées négativement, déposées du côté de la cathode et vont migrer vers l’anode', 26),
(79, 'les protéines de la membrane sur le papier Whatman', NULL, 0, 'le trasnfert consiste à faire passer les protéine du gel vers la membrane', 27),
(80, 'les protéines du gel sur la membrane', NULL, 1, NULL, 27),
(81, 'les protéines du gel sur le papier Whatman', NULL, 0, 'le trasnfert consiste à faire passer les protéine du gel vers la membrane', 27),
(82, 'de faible poids moléculaire', NULL, 1, NULL, 28),
(83, 'de haut poids moléculaire', NULL, 0, 'plus la concentration en acrylamide/bis-acrylamide augmente plus on rend difficile la migration des protéines de haut poids moléculaire, cela permet de séparer les poids de poids moléculaire faible', 28),
(84, 'phosphorylées', NULL, 0, ' plus la concentration en acrylamide/bis-acrylamide augmente plus on rend difficile la migration des protéines de haut poids moléculaire, cela permet de séparer les poids de poids moléculaire faible', 28),
(85, 'sur un tissu', NULL, 1, NULL, 29),
(86, 'sur des cellules', NULL, 0, ' pour les cellules on parle d’immunocytochimie', 29),
(87, 'sur du plasma', NULL, 0, ' cette technique n’est pas applicable sur du plasma', 29);

-- --------------------------------------------------------

--
-- Structure de la table `theme`
--

DROP TABLE IF EXISTS `theme`;
CREATE TABLE IF NOT EXISTS `theme` (
  `ThemeID` int(11) NOT NULL AUTO_INCREMENT,
  `ThemeIntitule` varchar(255) NOT NULL,
  PRIMARY KEY (`ThemeID`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `theme`
--

INSERT INTO `theme` (`ThemeID`, `ThemeIntitule`) VALUES
(1, 'Les macromolécules du vivant'),
(2, 'La chimie'),
(3, 'Nutrition et métabolisme'),
(4, 'L’enzymologie '),
(5, 'Les techniques d’études des biomolécules'),
(6, 'L’expression des gènes');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
