-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2020 at 09:52 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foraneodb`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ingredientes`
--

CREATE TABLE `ingredientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(64) NOT NULL,
  `precio` float NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ingredientesxreceta`
--

CREATE TABLE `ingredientesxreceta` (
  `id_ingrediente` int(11) NOT NULL,
  `id_receta` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `mensaje` varchar(128) NOT NULL,
  `leida` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `id_usuario`, `mensaje`, `leida`) VALUES
(1, 1, 'hola mund', 0),
(2, 1, 'Adios mundo', 1),
(3, 1, 'hehe', 0);

-- --------------------------------------------------------

--
-- Table structure for table `rating_receta`
--

CREATE TABLE `rating_receta` (
  `id_receta` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `recetas`
--

CREATE TABLE `recetas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(64) DEFAULT NULL,
  `pasos` text NOT NULL,
  `tiempo` int(11) NOT NULL,
  `imagen` blob NOT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `recetas_favoritas`
--

CREATE TABLE `recetas_favoritas` (
  `id_receta` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `seguidores`
--

CREATE TABLE `seguidores` (
  `id_seguidor` int(11) NOT NULL,
  `id_seguido` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(128) NOT NULL,
  `apellidos` varchar(128) NOT NULL,
  `correo` varchar(128) NOT NULL,
  `usuario` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `correo`, `usuario`, `password`) VALUES
(1, 'Angelo', 'Ramirez Ortega', '', 'angeloortega', 'angelo123'),
(2, 'Andres', 'Perez Zeledon', '', 'elandres123', 'Andres123'),
(3, 'Alejandro', 'Tapia', '', 'tapia123', 'eltapia'),
(4, 'Angelo', 'Ramirez Ortega', 'angeloale1@gmail.com', 'angeloale1', 'Angelo123'),
(5, 'test', '2', 'test@mail.com', 'testing', 'test123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredientesxreceta`
--
ALTER TABLE `ingredientesxreceta`
  ADD PRIMARY KEY (`id_ingrediente`,`id_receta`),
  ADD KEY `fk_receta_id` (`id_receta`);

--
-- Indexes for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_not_usuario_id` (`id_usuario`);

--
-- Indexes for table `rating_receta`
--
ALTER TABLE `rating_receta`
  ADD PRIMARY KEY (`id_receta`,`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `recetas`
--
ALTER TABLE `recetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_usuario` (`id_usuario`),
  ADD KEY `fk_categoria_id` (`id_categoria`);

--
-- Indexes for table `recetas_favoritas`
--
ALTER TABLE `recetas_favoritas`
  ADD PRIMARY KEY (`id_receta`,`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `seguidores`
--
ALTER TABLE `seguidores`
  ADD PRIMARY KEY (`id_seguidor`,`id_seguido`),
  ADD KEY `id_seguido` (`id_seguido`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ingredientes`
--
ALTER TABLE `ingredientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `recetas`
--
ALTER TABLE `recetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ingredientesxreceta`
--
ALTER TABLE `ingredientesxreceta`
  ADD CONSTRAINT `fk_ingrediente_id` FOREIGN KEY (`id_ingrediente`) REFERENCES `ingredientes` (`id`),
  ADD CONSTRAINT `fk_receta_id` FOREIGN KEY (`id_receta`) REFERENCES `recetas` (`id`);

--
-- Constraints for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `fk_not_usuario_id` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `rating_receta`
--
ALTER TABLE `rating_receta`
  ADD CONSTRAINT `rating_receta_ibfk_1` FOREIGN KEY (`id_receta`) REFERENCES `recetas` (`id`),
  ADD CONSTRAINT `rating_receta_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `recetas`
--
ALTER TABLE `recetas`
  ADD CONSTRAINT `fk_categoria_id` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `recetas_favoritas`
--
ALTER TABLE `recetas_favoritas`
  ADD CONSTRAINT `recetas_favoritas_ibfk_1` FOREIGN KEY (`id_receta`) REFERENCES `recetas` (`id`),
  ADD CONSTRAINT `recetas_favoritas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `seguidores`
--
ALTER TABLE `seguidores`
  ADD CONSTRAINT `seguidores_ibfk_1` FOREIGN KEY (`id_seguidor`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `seguidores_ibfk_2` FOREIGN KEY (`id_seguido`) REFERENCES `usuarios` (`id`);
COMMIT;


DELIMITER $$

CREATE PROCEDURE sp_get_plan_recetas(IN pplato_min   INT, 
                                     IN pplato_max   INT, 
                                     IN categoria_id INT, 
                                     IN cantidad     INT)
begin 
  CREATE temporary TABLE temptable 
    ( 
       id           INT,
       id_categoria INT, 
       precio       INT, 
       tiempo       INT, 
       nombre       VARCHAR(64),
       categoria    VARCHAR(64), 
       usuario      VARCHAR(128),
       pasos        TEXT, 
       imagen       LONGBLOB);
    WHILE cantidad > 0 do 
    INSERT INTO temptable 
    SELECT r.id,
           r.id_categoria, 
           precios.precio, 
           r.tiempo, 
           r.nombre AS nombre, 
           c.nombre AS categoria, 
           u.usuario,
           r.pasos, 
           r.imagen 
    FROM   recetas r 
           JOIN usuarios u 
             ON r.id_usuario = u.id 
           JOIN categorias c 
             ON r.id_categoria = c.id 
           JOIN (SELECT rec.id, 
                        Sum(ing.precio * ingxrec.cantidad) AS precio 
                 FROM   recetas rec 
                        JOIN ingredientesxreceta ingxrec 
                          ON rec.id = ingxrec.id_receta 
                        JOIN ingredientes ing 
                          ON ingxrec.id_ingrediente = ing.id 
                 GROUP  BY ( rec.id )) AS precios 
             ON precios.id = r.id 
    WHERE  precios.precio >= pplato_min 
           AND precios.precio <= pplato_max 
           AND r.id_categoria = categoria_id 
    ORDER  BY Rand() 
    LIMIT  1; 
    SET cantidad = cantidad - 1; 
  end WHILE;
  SELECT * 
  FROM   temptable; 
end$$
 
DELIMITER ;