-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mediconnect_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cita`
--

DROP TABLE IF EXISTS `cita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cita` (
  `id_cita` int NOT NULL AUTO_INCREMENT,
  `paciente_id` int NOT NULL,
  `medico_id` int NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `motivo` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_solicitud` datetime DEFAULT CURRENT_TIMESTAMP,
  `sede_id` int NOT NULL,
  PRIMARY KEY (`id_cita`),
  KEY `paciente_id` (`paciente_id`),
  KEY `medico_id` (`medico_id`),
  KEY `fk_cita_sede` (`sede_id`),
  CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `paciente` (`id_paciente`),
  CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`medico_id`) REFERENCES `medico` (`id_medico`),
  CONSTRAINT `fk_cita_sede` FOREIGN KEY (`sede_id`) REFERENCES `sede` (`id_sede`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cita`
--

LOCK TABLES `cita` WRITE;
/*!40000 ALTER TABLE `cita` DISABLE KEYS */;
INSERT INTO `cita` VALUES (1,4,1,'2025-05-28 06:00:00','Anemia','Pendiente','2025-05-27 18:21:09',1),(2,4,1,'2025-06-02 06:00:00','Anemia','Pendiente','2025-05-29 15:46:43',1),(3,8,1,'2025-06-02 06:30:00','asd','Pendiente','2025-05-29 23:43:48',1),(4,8,1,'2025-06-02 07:00:00','asdddd','Pendiente','2025-05-29 23:44:24',1),(5,8,1,'2025-06-02 07:30:00','General','Pendiente','2025-05-30 00:12:11',1),(6,8,1,'2025-06-02 08:00:00','lol','Pendiente','2025-05-30 02:51:36',1),(8,8,1,'2025-07-07 06:00:00','asd','Confirmada','2025-07-02 17:34:37',1),(9,8,1,'2025-07-07 06:30:00','Prueba1','Confirmada','2025-07-02 23:43:35',1),(11,8,1,'2025-07-08 06:00:00','asd','Confirmada','2025-07-03 01:45:37',1);
/*!40000 ALTER TABLE `cita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacto`
--

DROP TABLE IF EXISTS `contacto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacto` (
  `id_contacto` bigint NOT NULL AUTO_INCREMENT,
  `paciente_id` int DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `mensaje` varchar(255) NOT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_contacto`),
  KEY `paciente_id` (`paciente_id`),
  CONSTRAINT `contacto_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `paciente` (`id_paciente`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacto`
--

LOCK TABLES `contacto` WRITE;
/*!40000 ALTER TABLE `contacto` DISABLE KEYS */;
INSERT INTO `contacto` VALUES (1,NULL,'Antony','Cossio','U22200842@utp.edu.pe','921718033','Holas','2025-07-01 13:18:01'),(2,NULL,'Agustina','Agos','agustina@gmail.com','921718033','Prueba2','2025-07-01 13:18:35'),(3,NULL,'Agustina','Agos','agustina@gmail.com','921718033','Prueba3','2025-07-01 13:34:58'),(4,NULL,'Agustina','Agos','agustina@gmail.com','921718033','Prueba 4','2025-07-01 13:35:42'),(5,NULL,'Agustina','Agos','agustina@gmail.com','921718033','Prueba 5','2025-07-01 13:38:23'),(6,NULL,'Agustina','Agos','agustina@gmail.com','921718033','Prueba 6\n','2025-07-01 13:39:39'),(7,NULL,'Agustina','Agos','agustina@gmail.com','921718033','Prueba 7','2025-07-01 13:49:45'),(8,NULL,'Agustina','Agos','agustina@gmail.com','921718033','Prueba8','2025-07-01 13:53:39'),(9,NULL,'Agustina','Agos','agustina@gmail.com','921718033','Prueba9','2025-07-01 13:56:28'),(10,NULL,'Agustina','Agos','agustina@gmail.com','921718033','Holas','2025-07-01 13:57:33'),(11,8,NULL,NULL,NULL,NULL,'Prueba10','2025-07-01 14:28:47'),(12,8,NULL,NULL,NULL,NULL,'Prueba 11','2025-07-01 14:29:20'),(13,8,'Agustina','Agos','agustina@gmail.com','921718033','Prueba 11','2025-07-01 14:34:38'),(14,8,'Agustina','Agos','agustina@gmail.com','921718033','Prueba12','2025-07-01 16:01:46'),(15,8,'Agustina','Agos','agustina@gmail.com','921718033','Prueba12','2025-07-01 16:01:49'),(16,8,'Agustina','Agos','agustina@gmail.com','921718033','Prueba13','2025-07-01 16:13:08'),(17,8,'Agustina','Agos','agustina@gmail.com','921718033','Prueba 14','2025-07-01 16:22:50'),(18,8,'Agustina','Agos','agustina@gmail.com','921718033','Prueba 14','2025-07-01 16:49:46'),(19,8,'Agustina','Agos','agustina@gmail.com','921718033','Prueba 17','2025-07-01 16:54:56');
/*!40000 ALTER TABLE `contacto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_receta`
--

DROP TABLE IF EXISTS `detalle_receta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_receta` (
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  `receta_id` int NOT NULL,
  `medicamento` varchar(100) NOT NULL,
  `dosis` varchar(100) DEFAULT NULL,
  `instrucciones` text,
  PRIMARY KEY (`id_detalle`),
  KEY `receta_id` (`receta_id`),
  CONSTRAINT `detalle_receta_ibfk_1` FOREIGN KEY (`receta_id`) REFERENCES `receta` (`id_receta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_receta`
--

LOCK TABLES `detalle_receta` WRITE;
/*!40000 ALTER TABLE `detalle_receta` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_receta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario_medico`
--

DROP TABLE IF EXISTS `horario_medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horario_medico` (
  `id_horario` bigint NOT NULL AUTO_INCREMENT,
  `medico_id` int NOT NULL,
  `dia_semana` varchar(255) DEFAULT NULL,
  `turno` varchar(255) DEFAULT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  PRIMARY KEY (`id_horario`),
  KEY `medico_id` (`medico_id`),
  CONSTRAINT `horario_medico_ibfk_1` FOREIGN KEY (`medico_id`) REFERENCES `medico` (`id_medico`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario_medico`
--

LOCK TABLES `horario_medico` WRITE;
/*!40000 ALTER TABLE `horario_medico` DISABLE KEYS */;
INSERT INTO `horario_medico` VALUES (1,1,'Lunes','Mañana','06:00:00','12:00:00'),(2,1,'Martes','Mañana','06:00:00','12:00:00'),(3,1,'Miercoles','Mañana','06:00:00','12:00:00'),(4,1,'Jueves','Mañana','06:00:00','12:00:00'),(5,1,'Viernes','Mañana','06:00:00','12:00:00'),(6,2,'Lunes','Mañana','06:00:00','12:00:00'),(7,2,'Martes','Mañana','06:00:00','12:00:00'),(8,2,'Miercoles','Mañana','06:00:00','12:00:00'),(9,2,'Jueves','Mañana','06:00:00','12:00:00'),(10,2,'Viernes','Mañana','06:00:00','12:00:00'),(11,4,'Lunes','Mañana','06:00:00','12:00:00'),(12,4,'Martes','Mañana','06:00:00','12:00:00'),(13,4,'Miercoles','Mañana','06:00:00','12:00:00'),(14,4,'Jueves','Mañana','06:00:00','12:00:00'),(15,4,'Viernes','Mañana','06:00:00','12:00:00'),(16,7,'Lunes','Mañana','06:00:00','12:00:00'),(17,7,'Martes','Mañana','06:00:00','12:00:00'),(18,7,'Miercoles','Mañana','06:00:00','12:00:00'),(19,7,'Jueves','Mañana','06:00:00','12:00:00'),(20,7,'Viernes','Mañana','06:00:00','12:00:00'),(21,3,'Lunes','Tarde','13:00:00','18:00:00'),(22,3,'Martes','Tarde','13:00:00','18:00:00'),(23,3,'Miercoles','Tarde','13:00:00','18:00:00'),(24,3,'Jueves','Tarde','13:00:00','18:00:00'),(25,3,'Viernes','Tarde','13:00:00','18:00:00'),(26,5,'Lunes','Tarde','13:00:00','18:00:00'),(27,5,'Martes','Tarde','13:00:00','18:00:00'),(28,5,'Miercoles','Tarde','13:00:00','18:00:00'),(29,5,'Jueves','Tarde','13:00:00','18:00:00'),(30,5,'Viernes','Tarde','13:00:00','18:00:00'),(31,6,'Lunes','Tarde','13:00:00','18:00:00'),(32,6,'Martes','Tarde','13:00:00','18:00:00'),(33,6,'Miercoles','Tarde','13:00:00','18:00:00'),(34,6,'Jueves','Tarde','13:00:00','18:00:00'),(35,6,'Viernes','Tarde','13:00:00','18:00:00'),(36,8,'Lunes','Tarde','13:00:00','18:00:00'),(37,8,'Martes','Tarde','13:00:00','18:00:00'),(38,8,'Miercoles','Tarde','13:00:00','18:00:00'),(39,8,'Jueves','Tarde','13:00:00','18:00:00'),(40,8,'Viernes','Tarde','13:00:00','18:00:00'),(41,9,'Lunes','Mañana','06:00:00','12:00:00'),(42,9,'Martes','Mañana','06:00:00','12:00:00'),(43,9,'Miercoles','Mañana','06:00:00','12:00:00'),(44,9,'Jueves','Mañana','06:00:00','12:00:00'),(45,9,'Viernes','Mañana','06:00:00','12:00:00'),(46,10,'Lunes','Mañana','06:00:00','12:00:00'),(47,10,'Martes','Mañana','06:00:00','12:00:00'),(48,10,'Miercoles','Mañana','06:00:00','12:00:00'),(49,10,'Jueves','Mañana','06:00:00','12:00:00'),(50,10,'Viernes','Mañana','06:00:00','12:00:00'),(51,11,'Lunes','Tarde','13:00:00','18:00:00'),(52,11,'Martes','Tarde','13:00:00','18:00:00'),(53,11,'Miercoles','Tarde','13:00:00','18:00:00'),(54,11,'Jueves','Tarde','13:00:00','18:00:00'),(55,11,'Viernes','Tarde','13:00:00','18:00:00'),(56,12,'Lunes','Tarde','13:00:00','18:00:00'),(57,12,'Martes','Tarde','13:00:00','18:00:00'),(58,12,'Miercoles','Tarde','13:00:00','18:00:00'),(59,12,'Jueves','Tarde','13:00:00','18:00:00'),(60,12,'Viernes','Tarde','13:00:00','18:00:00'),(61,12,'Lunes','Tarde','13:00:00','18:00:00'),(62,12,'Martes','Tarde','13:00:00','18:00:00'),(63,12,'Miércoles','Tarde','13:00:00','18:00:00'),(64,12,'Jueves','Tarde','13:00:00','18:00:00'),(65,12,'Viernes','Tarde','13:00:00','18:00:00');
/*!40000 ALTER TABLE `horario_medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medico`
--

DROP TABLE IF EXISTS `medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medico` (
  `id_medico` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `nombres` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `especialidad` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `consultorio` varchar(255) DEFAULT NULL,
  `sede_id` int DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_medico`),
  KEY `usuario_id` (`usuario_id`),
  KEY `fk_medico_sede` (`sede_id`),
  CONSTRAINT `fk_medico_sede` FOREIGN KEY (`sede_id`) REFERENCES `sede` (`id_sede`),
  CONSTRAINT `medico_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medico`
--

LOCK TABLES `medico` WRITE;
/*!40000 ALTER TABLE `medico` DISABLE KEYS */;
INSERT INTO `medico` VALUES (1,1,'Ana','González','Pediatría','999111111','101',1,'doc7.jpg'),(2,2,'Luis','Ramírez','Pediatría','999111112','102',1,'doc1.jpg'),(3,3,'María','Fernández','Pediatría','999111113','103',2,'doc3.jpg'),(4,4,'Carlos','Soto','Cardiología','999111114','201',2,'doc2.jpg'),(5,5,'Elena','Martínez','Cardiología','999111115','202',3,'servi8.png'),(6,6,'Pedro','Jiménez','Cardiología','999111116','203',3,NULL),(7,7,'Lucía','Rivas','Dermatología','999111117','301',4,NULL),(8,8,'Ricardo','Valdez','Dermatología','999111118','302',4,NULL),(9,9,'Sofía','Castro','Dermatología','999111119','303',5,NULL),(10,10,'Miguel','Campos','Pediatría','999111120','104',5,NULL),(11,11,'Julia','Salas','Cardiología','999111121','204',6,NULL),(12,12,'Daniel','Moreno','Dermatología','999111122','304',6,NULL),(13,24,'Ana','Gonzalez','Pediatría','987654321','100',1,NULL),(14,27,'Antonne','Cossete','Oftalmología','123456789','100',1,'R.jpg'),(15,28,'Cler','Escudero','Cardiología','921718033','122',1,'steven-universe-news.jpg'),(20,41,'Rosa','Ala','Pediatría','1235','123',1,'encanto-1-1080x609.jpg');
/*!40000 ALTER TABLE `medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente` (
  `id_paciente` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `nombres` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `fecha_nacimiento` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_paciente`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES (1,13,'Antony Piero','Cossio Vega','999888777','Lima, Perú','2000-01-01'),(2,14,'Real','Gang','123456789','Mi casa','2000-01-01'),(3,15,'Brenda','Mendoza','123456789','Mi casa','2000-01-01'),(4,16,'Antony','Cossio','123456789','micasa','2000-01-01'),(5,17,'Kendra','Zapata','123456789','asd','2000-01-01'),(8,21,'Agus','Carajo','921718033','Mi casa','2000-01-01'),(9,22,'Carlos','Antonio','111111111','mi casa','2000-01-01');
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receta`
--

DROP TABLE IF EXISTS `receta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receta` (
  `id_receta` int NOT NULL AUTO_INCREMENT,
  `cita_id` int NOT NULL,
  `fecha_emision` datetime DEFAULT CURRENT_TIMESTAMP,
  `notas` text,
  PRIMARY KEY (`id_receta`),
  KEY `cita_id` (`cita_id`),
  CONSTRAINT `receta_ibfk_1` FOREIGN KEY (`cita_id`) REFERENCES `cita` (`id_cita`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receta`
--

LOCK TABLES `receta` WRITE;
/*!40000 ALTER TABLE `receta` DISABLE KEYS */;
/*!40000 ALTER TABLE `receta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reclamo`
--

DROP TABLE IF EXISTS `reclamo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reclamo` (
  `id_reclamo` bigint NOT NULL AUTO_INCREMENT,
  `paciente_id` int NOT NULL,
  `sede_id` int NOT NULL,
  `dni` varchar(15) NOT NULL,
  `tipo_reclamo` varchar(30) NOT NULL,
  `clasificacion` varchar(50) NOT NULL,
  `detalle` text NOT NULL,
  `fecha_reclamo` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_reclamo`),
  KEY `fk_reclamo_paciente` (`paciente_id`),
  KEY `fk_reclamo_sede` (`sede_id`),
  CONSTRAINT `fk_reclamo_paciente` FOREIGN KEY (`paciente_id`) REFERENCES `paciente` (`id_paciente`),
  CONSTRAINT `fk_reclamo_sede` FOREIGN KEY (`sede_id`) REFERENCES `sede` (`id_sede`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reclamo`
--

LOCK TABLES `reclamo` WRITE;
/*!40000 ALTER TABLE `reclamo` DISABLE KEYS */;
INSERT INTO `reclamo` VALUES (1,8,1,'33333333','Reclamo','Servicio no relacionado a telecomunicaciones','asd','2025-05-30 04:30:46'),(2,8,1,'75435931','Reclamo','Producto','asdddd','2025-05-30 04:43:50');
/*!40000 ALTER TABLE `reclamo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'ADMIN'),(2,'MEDICO'),(3,'PACIENTE');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sede`
--

DROP TABLE IF EXISTS `sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sede` (
  `id_sede` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `mapa_url` text,
  PRIMARY KEY (`id_sede`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
INSERT INTO `sede` VALUES (1,'Clínica MediConect Piura','Nuestra sede en Piura está ubicada frente a Promart, junto al estacionamiento de motocicletas. Accede por la Puerta del Jirón H para recibir atención médica de calidad con equipos modernos y personal especializado.','Piura','Frente a Promart, Jirón H, Piura','/img/sede1.jpg','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63574.88794285284!2d-80.70808545136718!3d-5.194819700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a107f68f622ff%3A0xb2d68b7546c8503a!2sCl%C3%ADnica%20San%20Miguel%20de%20La%20Red%20Cl%C3%ADnica%20Internacional!5e0!3m2!1ses-419!2spe!4v1745544389753!5m2!1ses-419!2spe'),(2,'Clínica MediConect Arequipa Camaná','Visítanos en el segundo piso del Mall Aventura, en Av. Porongoche 500. Nuestra sede cuenta con servicios especializados en medicina general, pediatría y diagnóstico por imágenes.','Arequipa','Mall Aventura, Av. Porongoche 500, Arequipa','/img/sede6.jpg','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61236.02113463862!2d-71.57730535512226!3d-16.412057635256893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424a42086cf8d5%3A0xb6b0b4bb26fe4882!2sCl%C3%ADnica%20San%20Juan%20de%20Dios%20Arequipa!5e0!3m2!1ses-419!2spe!4v1745544485612!5m2!1ses-419!2spe'),(3,'Clínica MediConect Arequipa Centro','Visítanos en el segundo piso del Mall Aventura, en Av. Porongoche 500. Nuestra sede cuenta con servicios especializados en medicina general, pediatría y diagnóstico por imágenes.','Arequipa','Centro de Arequipa','/img/sede4.jpg','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61236.02113463862!2d-71.57730535512226!3d-16.412057635256893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424a42086cf8d5%3A0xb6b0b4bb26fe4882!2sCl%C3%ADnica%20San%20Juan%20de%20Dios%20Arequipa!5e0!3m2!1ses-419!2spe!4v1745544485612!5m2!1ses-419!2spe'),(4,'Clínica MediConect Lima Centro','Ubicados en Lima Centro, tercer piso. Contamos con atención médica ambulatoria, controles preventivos y orientación psicológica.','Lima','Centro de Lima','/img/sede2.jpg','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62429.38921493152!2d-77.09311092737387!3d-12.054745724606377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c87b8819d459%3A0x6da256a012fc08ab!2sCl%C3%ADnica%20Ricardo%20Palma!5e0!3m2!1ses-419!2spe!4v1745544514314!5m2!1ses-419!2spe'),(5,'Clínica MediConect Lima Norte','Nuestra sede en Lima Norte ofrece atención integral, con especialidades médicas y servicios de laboratorio.','Lima','Lima Norte','/img/sede3.jpg','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124860.34283114265!2d-77.14335836121877!3d-12.051383700914354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x456adf987e2477d%3A0x31167f7cd10d7d0d!2sCl%C3%ADnica%20Jes%C3%BAs%20del%20Norte!5e0!3m2!1ses-419!2spe!4v1745544536997!5m2!1ses-419!2spe'),(6,'Clínica MediConect Lima Sur','En nuestra sede de Lima Sur brindamos atención pediátrica, medicina interna y vacunación.','Lima','Lima Sur','/img/sede5.jpg','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124860.35408931594!2d-77.14335860924473!3d-12.051359502848742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b7804ac66ee1%3A0x97975ccf585087f6!2sCentro%20M%C3%A9dico%20Plaza%20Lima%20Sur%20de%20la%20Cl%C3%ADnica%20Ricardo%20Palma!5e0!3m2!1ses-419!2spe!4v1745544559115!5m2!1ses-419!2spe');
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `rol_id` int NOT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'ana.gonzalez','$2a$10$c4H9hB5xPvQRK1FvTUV.c.WcaZMaqTu.E5Zb59k7.i5lfuMbYA8cC','ana.gonzalez@hotmail.com',2,'2025-04-22 16:49:16',1),(2,'luis.ramirez','medico123','luis.ramirez@clinic.com',2,'2025-04-22 16:49:16',1),(3,'maria.fernandez','medico123','maria.fernandez@clinic.com',2,'2025-04-22 16:49:16',1),(4,'carlos.soto','medico123','carlos.soto@clinic.com',2,'2025-04-22 16:49:16',1),(5,'elena.martinez','medico123','elena.martinez@clinic.com',2,'2025-04-22 16:49:16',1),(6,'pedro.jimenez','medico123','pedro.jimenez@clinic.com',2,'2025-04-22 16:49:16',1),(7,'lucia.rivas','medico123','lucia.rivas@clinic.com',2,'2025-04-22 16:49:16',1),(8,'ricardo.valdez','medico123','ricardo.valdez@clinic.com',2,'2025-04-22 16:49:16',1),(9,'sofia.castro','medico123','sofia.castro@clinic.com',2,'2025-04-22 16:49:16',1),(10,'miguel.campos','medico123','miguel.campos@clinic.com',2,'2025-04-22 16:49:16',1),(11,'julia.salas','medico123','julia.salas@clinic.com',2,'2025-04-22 16:49:16',1),(12,'daniel.moreno','medico123','daniel.moreno@clinic.com',2,'2025-04-22 16:49:16',1),(13,'AntonyCV','123456789','antonycossio@hotmail.com',3,'2025-04-22 17:20:44',1),(14,'RealGang','$2a$10$YGmYUqoxaqbREMjLKtebEeozVUMwVHZm0zAaEX34RbVWiyz7NBVya','Real@gmail.com',3,'2025-04-22 21:05:33',1),(15,'Brendis','$2a$10$rnS5DVcIlR.pJ5kqAG31T.XkD4gjmiruxP4RL2p45HnXFNP2kJRyG','brenda@gmail.com',3,'2025-04-22 21:21:41',1),(16,'Azael','$2a$10$g4fCXIKseqh.6b.47eZx2OvPaSWcTevxXfevO1gtgT41j6anYx4TK','antony@hotmail.com',3,'2025-04-25 00:18:28',1),(17,'Lucia','$2a$10$Ii2ru88X2e6ULaE7ZKNwUOh/ic.ucPV6NvUhlIIsudRJkyha8x1mO','kendra@gmail.com',3,'2025-04-25 20:32:37',1),(20,'prueba1@correo.com','$2a$10$yN1lzfsIKyQJoHPVmp2MDemNC51SVkRQQ6PQBV7pgy894dJUDPa0i',NULL,3,NULL,NULL),(21,'gusita','$2a$10$p/5nEActkwlbMS8rBplhsefU0Ag0PdIy1FjPqTRaAVap.NViuS2ha','agusita@hotmail.com',3,NULL,NULL),(22,'Carlox','$2a$10$QiAXEeTD2wz.riW72gEwA.jA9s4ik.XYCAKclfoskKxL1kvR99awy','carlos@gmail.com',3,NULL,NULL),(24,'ana.medico','$2a$10$c4H9hB5xPvQRK1FvTUV.c.WcaZMaqTu.E5Zb59k7.i5lfuMbYA8cC','ana@hotmail.com',2,NULL,1),(26,'admin','$2a$10$k07k2LYipAvKh/6ncQ2GG.zlQfRbioGaaHb4Bk.X9.IYrwHpjgZM2','admin@mediconect.com',1,NULL,1),(27,'antonne.cossete','$2a$10$cuQ1TVCRCU.aMvZarFZWvO.KU0n0aBDp1dfrHLFYYTGRu1K6WbiPm','antonne.cossete@mediconect.com',2,NULL,1),(28,'cler.escudero','$2a$10$rwB3ev5.q6YiN5dBXGVeB.7Jkx.9APR5YfJAoDT7.YbDmvQ8nq0QW','cler.escudero@mediconect.com',2,NULL,1),(30,'b.b','$2a$10$pbVYWGv232T1qr/GfDm4WOm0GVO4lKeyIythA4XxJPUSq/lBe8FCS','b.b@mediconect.com',2,NULL,1),(31,'antonio.carrique','$2a$10$65RozGXwvcQsQlklPKiRq.GtXlhB1kcatoP4ryGT5hlKKNfXDFbD2','antonio.carrique@mediconect.com',2,NULL,1),(32,'antonio.alvarez','$2a$10$Sn4pwV.k/YDXWKB4y4o.lu2z0HA7DbSDPTuDCoKaG2Zr7opHwd5M.','antonio.alvarez@mediconect.com',2,NULL,1),(33,'antonio.asdasd','$2a$10$xOKlCTJE.0RiQ34uvNb97ebrwdqGB5zCI3pfKXyHl5Sz/5abBsX6K','antonio.asdasd@mediconect.com',2,NULL,1),(34,'asdddd.asddddd','$2a$10$vTGvIoNSfp6OndpQ7.tYeu0l4NxFV3gneF74xSJ1q1qRky5x0v.pa','asdddd.asddddd@mediconect.com',2,NULL,1),(35,'antony.asadas','$2a$10$/TDjanGORb9.4KBW0uMYleR80lYTLTkAtuqd5j35xpuyDjD7eMSqy','antony.asadas@mediconect.com',2,NULL,1),(36,'asd.asd','$2a$10$noItD2.7XgFi9igqnrnHp.FrKjkyDa.kaoR2.leqK8lv6YZBjSXOi','asd.asd@mediconect.com',2,NULL,1),(37,'aaaaa.aaaaa','$2a$10$.BPxRWOPyLlf0WJpUmVLNu8LXpoavqnawa9TN11Rsb66kdTPJTWCe','aaaaa.aaaaa@mediconect.com',2,NULL,1),(41,'rosa.ala','$2a$10$vY6f0TRDINCjiL7a4Sfhq.6mJsu0UOLTm2eLQlFxk27ABfkIZcSUO','rosa.ala@mediconect.com',2,NULL,1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-03 23:20:10
