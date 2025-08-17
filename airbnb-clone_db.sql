-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: airbnb_clone
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Bookings`
--

DROP TABLE IF EXISTS `Bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `room_id` int NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `guests_count` int DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `fk_bookings_user` (`user_id`),
  CONSTRAINT `Bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Bookings_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `Rooms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bookings`
--

LOCK TABLES `Bookings` WRITE;
/*!40000 ALTER TABLE `Bookings` DISABLE KEYS */;
INSERT INTO `Bookings` VALUES (1,2,1,'2025-08-10','2025-08-13',NULL,1050000.00,0,0,NULL,'2025-08-08 22:12:44','2025-08-08 22:12:44'),(2,3,3,'2025-09-01','2025-09-04',NULL,1500000.00,0,0,NULL,'2025-08-08 22:12:44','2025-08-08 22:12:44');
/*!40000 ALTER TABLE `Bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `content` text,
  `rating` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `Rooms` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Locations`
--

DROP TABLE IF EXISTS `Locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `province` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_location_name_province` (`name`,`province`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Locations`
--

LOCK TABLES `Locations` WRITE;
/*!40000 ALTER TABLE `Locations` DISABLE KEYS */;
INSERT INTO `Locations` VALUES (1,'District 1','Ho Chi Minh',NULL,NULL,NULL,0,0,NULL,'2025-08-08 22:12:44','2025-08-08 22:12:44'),(2,'Ba Dinh','Ha Noi',NULL,NULL,NULL,0,0,NULL,'2025-08-08 22:12:44','2025-08-08 22:12:44'),(3,'Hoi An','Quang Nam',NULL,NULL,NULL,0,0,NULL,'2025-08-08 22:12:44','2025-08-08 22:12:44'),(4,'Hà Nội','Hà Nội',NULL,NULL,'Thủ đô ngàn năm văn hiến',0,1,'2025-08-16 09:39:52','2025-08-16 09:38:35','2025-08-16 09:39:51');
/*!40000 ALTER TABLE `Locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rooms`
--

DROP TABLE IF EXISTS `Rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_phong` varchar(255) NOT NULL,
  `khach` int NOT NULL DEFAULT '1',
  `phong_ngu` int NOT NULL DEFAULT '1',
  `giuong` int NOT NULL DEFAULT '1',
  `phong_tam` int NOT NULL DEFAULT '1',
  `mo_ta` text,
  `gia_tien` decimal(10,2) DEFAULT NULL,
  `may_giat` tinyint(1) DEFAULT '0',
  `ban_la` tinyint(1) DEFAULT '0',
  `tivi` tinyint(1) DEFAULT '0',
  `dieu_hoa` tinyint(1) DEFAULT '0',
  `wifi` tinyint(1) DEFAULT '0',
  `bep` tinyint(1) DEFAULT '0',
  `do_xe` tinyint(1) DEFAULT '0',
  `ho_boi` tinyint(1) DEFAULT '0',
  `ban_ui` tinyint(1) DEFAULT '0',
  `hinh_anh` json DEFAULT NULL,
  `location_id` int DEFAULT NULL,
  `host_id` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_rooms_location` (`location_id`),
  KEY `fk_rooms_host` (`host_id`),
  CONSTRAINT `fk_rooms_host` FOREIGN KEY (`host_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `fk_rooms_location` FOREIGN KEY (`location_id`) REFERENCES `Locations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rooms`
--

LOCK TABLES `Rooms` WRITE;
/*!40000 ALTER TABLE `Rooms` DISABLE KEYS */;
INSERT INTO `Rooms` VALUES (1,'Phòng Deluxe',2,1,1,1,'Phòng có view đẹp nhìn ra hồ',500000.00,1,1,1,1,1,1,1,0,0,'[\"https://res.cloudinary.com/demo/image1.jpg\", \"https://res.cloudinary.com/demo/image2.jpg\"]',1,1,0,0,NULL,'2025-08-17 01:40:33','2025-08-17 01:40:33'),(2,'Phòng VIP Family',4,2,3,2,'Phòng VIP dành cho gia đình, rộng rãi',1200000.00,1,1,1,1,1,1,1,1,1,'[\"https://res.cloudinary.com/demo/image3.jpg\", \"https://res.cloudinary.com/demo/image4.jpg\"]',2,1,0,0,NULL,'2025-08-17 01:40:33','2025-08-17 01:40:33'),(3,'Phòng Đơn Tiết Kiệm',1,1,1,1,'Phòng nhỏ gọn, giá rẻ cho sinh viên',250000.00,0,0,1,0,1,0,0,0,0,'[\"https://res.cloudinary.com/demo/image5.jpg\"]',3,2,0,0,NULL,'2025-08-17 01:40:33','2025-08-17 01:40:33'),(4,'Phòng Deluxe',2,1,2,1,'Phòng có view đẹp',500000.00,1,1,1,1,1,1,1,0,0,'[\"string\"]',4,1,0,0,NULL,'2025-08-17 01:49:17','2025-08-17 01:49:17');
/*!40000 ALTER TABLE `Rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,NULL,'Admin','admin@test.com','hashedpassword123',NULL,NULL,NULL,'admin',0,0,NULL,'2025-08-08 22:12:44','2025-08-08 22:12:44'),(2,NULL,'Alice','alice@example.com','alice123',NULL,NULL,NULL,'user',0,0,NULL,'2025-08-08 22:12:44','2025-08-08 22:12:44'),(3,NULL,'Bob','bob@example.com','bob123',NULL,NULL,NULL,'user',0,0,NULL,'2025-08-08 22:12:44','2025-08-08 22:12:44'),(4,NULL,'Alice','alice1@example.com','$2b$10$Rq7FGG5//LNY78Yd48SD9emBSS1QhQzXr/ZGNv2KlxyZxPCRxGDli',NULL,NULL,NULL,'admin',0,0,NULL,'2025-08-14 07:48:03','2025-08-16 09:22:21'),(5,NULL,'Alice Nguyen','test@email.com','$2b$10$Jy86AHdH3LwZpdAIWLfOYOl86RNzMhBzPAJhiuPP/jP5BL8aTcm5C',NULL,NULL,NULL,'user',0,1,'2025-08-16 18:25:49','2025-08-15 15:50:05','2025-08-16 18:25:49'),(6,'https://res.cloudinary.com/dzrpwstm9/image/upload/v1755289004/user-avatars/j8xbyn2sv5pp8flxtnvu.jpg','admin','test1@gmail.com','$2b$10$erLQYrhRIqJ4Robl3b5Sre/T0ozJaQPkOzjbbgUFPIT97Rd8NZz9C','0362772537','2025-08-15',1,'user',0,0,NULL,'2025-08-15 20:16:46','2025-08-15 20:16:46');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'airbnb_clone'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-17  9:29:15
