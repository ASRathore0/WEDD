-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: wedding_universe
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('wedding-universe-cache-5c785c036466adea360111aa28563bfd556b5fba','i:1;',1792748695),('wedding-universe-cache-5c785c036466adea360111aa28563bfd556b5fba:timer','i:1792748695;',1792748695);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery_media`
--

DROP TABLE IF EXISTS `gallery_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gallery_media` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `invitation_id` bigint(20) unsigned NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `media_type` enum('image','video') NOT NULL DEFAULT 'image',
  `url` varchar(255) NOT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL DEFAULT 'all',
  `order_index` int(11) NOT NULL DEFAULT 0,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gallery_media_invitation_id_category_order_index_index` (`invitation_id`,`category`,`order_index`),
  CONSTRAINT `gallery_media_invitation_id_foreign` FOREIGN KEY (`invitation_id`) REFERENCES `invitations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery_media`
--

LOCK TABLES `gallery_media` WRITE;
/*!40000 ALTER TABLE `gallery_media` DISABLE KEYS */;
INSERT INTO `gallery_media` VALUES (1,1,'The Royal Portrait','Devansh & Samaira at the City Palace Pavilion','image','https://images.unsplash.com/photo-1609151162377-794fa6ec4a39?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1609151162377-794fa6ec4a39?auto=format&fit=crop&w=600&q=80','couple',1,1,'2026-10-23 03:52:32','2026-10-23 03:52:32'),(2,1,'Golden Hour Romance','A gentle breeze over Lake Pichola','image','https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80','couple',2,1,'2026-10-23 03:52:32','2026-10-23 03:52:32'),(3,1,'Botanical Heena Artistry','Intricate bridal henna and heirloom polki kundan','image','https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80','ceremonies',3,0,'2026-10-23 03:52:32','2026-10-23 03:52:32'),(4,1,'Royal Jharokhas & Archways','Palatial stone craftsmanship in antique gold light','image','https://images.unsplash.com/photo-1599818816933-728b12f6797f?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1599818816933-728b12f6797f?auto=format&fit=crop&w=600&q=80','cinematic',4,1,'2026-10-23 03:52:32','2026-10-23 03:52:32'),(5,1,'Crimson Rose Mandap','Floral canopy waiting for the sacred Agni','image','https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80','ceremonies',5,0,'2026-10-23 03:52:32','2026-10-23 03:52:32'),(6,1,'Moonlit Palace Silhouette','Lake palace glimmering against the vermilion night','image','https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80','cinematic',6,1,'2026-10-23 03:52:32','2026-10-23 03:52:32');
/*!40000 ALTER TABLE `gallery_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitations`
--

DROP TABLE IF EXISTS `invitations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invitations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Wedding Universe',
  `partner_one` varchar(255) NOT NULL DEFAULT 'Devansh',
  `partner_two` varchar(255) NOT NULL DEFAULT 'Samaira',
  `wedding_date` datetime NOT NULL,
  `wedding_timezone` varchar(255) NOT NULL DEFAULT 'Asia/Kolkata',
  `venue_city` varchar(255) NOT NULL DEFAULT 'Udaipur, Rajasthan',
  `tagline` varchar(255) NOT NULL DEFAULT 'A Little Universe Created For You',
  `hero_image_url` varchar(255) DEFAULT NULL,
  `celestial_quote` text DEFAULT NULL,
  `audio_title` varchar(255) NOT NULL DEFAULT 'Raag Darbari - Celestial Sitar & Santoor',
  `audio_url` varchar(255) DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `theme_settings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`theme_settings`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invitations_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitations`
--

LOCK TABLES `invitations` WRITE;
/*!40000 ALTER TABLE `invitations` DISABLE KEYS */;
INSERT INTO `invitations` VALUES (1,'amit-sweety','Shubh Vivah — Sweety Singh & Amit Kumar Singh','Sweety Singh','Amit Kumar Singh','2026-11-30 19:00:00','Asia/Kolkata','Shiv Bajrang Hotel, Thawe','Two Hearts. One Extraordinary Universe.','http://127.0.0.1:8000/storage/hero/YcLeRQ3HxzvF3KWETlpc5XGmVSdSF8ftRp2iZyto.png','In a universe of billions of galaxies, our stars converged into one eternal harmony.','Celestial Raag - Santoor & Sitar Reverie','https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',1,'{\"primary_color\":\"#EAB308\",\"secondary_color\":\"#CA8A04\",\"accent_color\":\"#FACC15\",\"bg_dark\":\"#FEFCE8\",\"bg_light\":\"#FFFDF0\",\"font_serif\":\"Cinzel Decorative, Cormorant Garamond, serif\",\"font_sans\":\"Outfit, sans-serif\",\"ganesh_image_url\":\"\\/images\\/ganesh_ji.jpg\",\"ganesh_shloka_hindi\":\"\\u0965 \\u0936\\u094d\\u0930\\u0940 \\u0917\\u0923\\u0947\\u0936\\u093e\\u092f \\u0928\\u092e\\u0903 \\u0965\",\"ganesh_mantra\":\"\\u0935\\u0915\\u094d\\u0930\\u0924\\u0941\\u0923\\u094d\\u0921 \\u092e\\u0939\\u093e\\u0915\\u093e\\u092f \\u0938\\u0942\\u0930\\u094d\\u092f\\u0915\\u094b\\u091f\\u093f \\u0938\\u092e\\u092a\\u094d\\u0930\\u092d\\u0964 \\u0928\\u093f\\u0930\\u094d\\u0935\\u093f\\u0918\\u094d\\u0928\\u0902 \\u0915\\u0941\\u0930\\u0941 \\u092e\\u0947 \\u0926\\u0947\\u0935 \\u0938\\u0930\\u094d\\u0935\\u0915\\u093e\\u0930\\u094d\\u092f\\u0947\\u0937\\u0941 \\u0938\\u0930\\u094d\\u0935\\u0926\\u093e\\u0965\",\"groom_details\":{\"name\":\"Amit Kumar Singh\",\"title\":\"The Groom (\\u0935\\u0930)\",\"qualification\":\"B.Tech in Computer Science \\/ Senior Software Architect\",\"profession\":\"Senior Technology Consultant & Entrepreneur\",\"father_name\":\"Shri Ramendra Singh\",\"mother_name\":\"Smt. Shanti Devi\",\"native_place\":\"Thawe, Gopalganj, Bihar\",\"about\":\"Visionary and rooted in tradition. Leading digital technologies while cherishing deep cultural values.\",\"photo_url\":\"\\/images\\/amit_sweety_hero.jpg\"},\"bride_details\":{\"name\":\"Sweety Singh\",\"title\":\"The Bride (\\u0935\\u0927\\u0942)\",\"qualification\":\"M.Sc \\/ MBA in Financial Management\",\"profession\":\"Financial Analyst & Creative Specialist\",\"father_name\":\"Shri Dharmendra Singh\",\"mother_name\":\"Smt. Sunita Devi\",\"native_place\":\"Thawe, Gopalganj, Bihar\",\"about\":\"Graceful, intellectual, and radiant. An accomplished professional who brings joy, elegance, and harmony.\",\"photo_url\":\"\\/images\\/amit_sweety_hero.jpg\"},\"family_invitation_text\":\"Together with their families, cordially invite you to share in the joy and blessings of their holy matrimonial union.\",\"auspicious_welcome\":\"\\u092e\\u0902\\u0917\\u0932\\u092e\\u094d \\u092d\\u0917\\u0935\\u093e\\u0928 \\u0935\\u093f\\u0937\\u094d\\u0923\\u0941\\u0903, \\u092e\\u0902\\u0917\\u0932\\u092e\\u094d \\u0917\\u0930\\u0941\\u0921\\u093c\\u0927\\u094d\\u0935\\u091c\\u0903\\u0964 \\u092e\\u0902\\u0917\\u0932\\u092e\\u094d \\u092a\\u0941\\u0923\\u094d\\u0921\\u0930\\u0940\\u0915\\u093e\\u0915\\u094d\\u0937\\u0903, \\u092e\\u0902\\u0917\\u0932\\u093e\\u092f \\u0924\\u0928\\u094b \\u0939\\u0930\\u093f\\u0903\\u0965\",\"compliments_from\":\"With best compliments from: Singh & Pariwar, Relatives & Friends\",\"bride_family\":[{\"id\":\"bf-1\",\"name\":\"\\u0938\\u094d\\u0935. \\u0936\\u094d\\u0930\\u0940 \\u0930\\u093e\\u092e\\u091a\\u0928\\u094d\\u0926\\u094d\\u0930 \\u0938\\u093f\\u0902\\u0939 \\u090f\\u0935\\u0902 \\u0936\\u094d\\u0930\\u0940\\u092e\\u0924\\u0940 \\u0926\\u0947\\u0935\\u0915\\u0940 \\u0926\\u0947\\u0935\\u0940\",\"relation\":\"\\u0926\\u093e\\u0926\\u093e \\u091c\\u0940 - \\u0926\\u093e\\u0926\\u0940 \\u091c\\u0940 (Paternal Grandparents)\",\"category\":\"elders\",\"note\":\"\\u092a\\u0930\\u092e \\u092a\\u0942\\u091c\\u094d\\u092f \\u092a\\u0942\\u0930\\u094d\\u0935\\u091c \\u090f\\u0935\\u0902 \\u0915\\u0941\\u0932\\u0926\\u0947\\u0935\\u0924\\u093e \\u0924\\u0941\\u0932\\u094d\\u092f \\u0936\\u0941\\u092d\\u093e\\u0936\\u0940\\u0937\"},{\"id\":\"bf-2\",\"name\":\"\\u0938\\u094d\\u0935. \\u0936\\u094d\\u0930\\u0940 \\u0930\\u093e\\u092e\\u0935\\u0943\\u0915\\u094d\\u0937 \\u0938\\u093f\\u0902\\u0939 \\u090f\\u0935\\u0902 \\u0936\\u094d\\u0930\\u0940\\u092e\\u0924\\u0940 \\u092a\\u094d\\u0930\\u092d\\u093e\\u0935\\u0924\\u0940 \\u0926\\u0947\\u0935\\u0940\",\"relation\":\"\\u0928\\u093e\\u0928\\u093e \\u091c\\u0940 - \\u0928\\u093e\\u0928\\u0940 \\u091c\\u0940 (Maternal Grandparents)\",\"category\":\"elders\",\"note\":\"\\u0938\\u0926\\u093e \\u0938\\u094d\\u092e\\u0930\\u0923\\u0940\\u092f \\u092e\\u0902\\u0917\\u0932\\u092e\\u092f \\u0936\\u0941\\u092d\\u093e\\u0936\\u0940\\u0937\"},{\"id\":\"bf-3\",\"name\":\"\\u0936\\u094d\\u0930\\u0940 \\u0927\\u0930\\u094d\\u092e\\u0947\\u0928\\u094d\\u0926\\u094d\\u0930 \\u0938\\u093f\\u0902\\u0939 \\u090f\\u0935\\u0902 \\u0936\\u094d\\u0930\\u0940\\u092e\\u0924\\u0940 \\u0938\\u0941\\u0928\\u0940\\u0924\\u093e \\u0926\\u0947\\u0935\\u0940\",\"relation\":\"\\u092e\\u093e\\u0924\\u093e-\\u092a\\u093f\\u0924\\u093e (Parents)\",\"category\":\"parents\",\"note\":\"\\u0935\\u0927\\u0942 \\u0915\\u0947 \\u092a\\u0930\\u092e \\u0938\\u094d\\u0928\\u0947\\u0939\\u0940 \\u092e\\u093e\\u0924\\u093e \\u090f\\u0935\\u0902 \\u092a\\u093f\\u0924\\u093e (\\u0925\\u093e\\u0935\\u0947, \\u0917\\u094b\\u092a\\u093e\\u0932\\u0917\\u0902\\u091c)\"},{\"id\":\"bf-4\",\"name\":\"\\u0936\\u094d\\u0930\\u0940 \\u092c\\u0940\\u0930\\u0947\\u0928\\u094d\\u0926\\u094d\\u0930 \\u0938\\u093f\\u0902\\u0939 \\u090f\\u0935\\u0902 \\u0936\\u094d\\u0930\\u0940\\u092e\\u0924\\u0940 \\u0930\\u0947\\u0916\\u093e \\u0926\\u0947\\u0935\\u0940\",\"relation\":\"\\u091a\\u093e\\u091a\\u093e \\u091c\\u0940 - \\u091a\\u093e\\u091a\\u0940 \\u091c\\u0940 (Paternal Uncle & Aunt)\",\"category\":\"uncles_aunts\",\"note\":\"\\u0938\\u0938\\u094d\\u0928\\u0947\\u0939 \\u0936\\u0941\\u092d\\u093e\\u0936\\u0940\\u0937\"},{\"id\":\"bf-5\",\"name\":\"\\u0936\\u094d\\u0930\\u0940 \\u091c\\u093f\\u0924\\u0947\\u0928\\u094d\\u0926\\u094d\\u0930 \\u0938\\u093f\\u0902\\u0939 \\u090f\\u0935\\u0902 \\u0936\\u094d\\u0930\\u0940\\u092e\\u0924\\u0940 \\u092e\\u0940\\u0928\\u093e \\u0926\\u0947\\u0935\\u0940\",\"relation\":\"\\u091a\\u093e\\u091a\\u093e \\u091c\\u0940 - \\u091a\\u093e\\u091a\\u0940 \\u091c\\u0940 (Paternal Uncle & Aunt)\",\"category\":\"uncles_aunts\",\"note\":\"\\u0938\\u0938\\u094d\\u0928\\u0947\\u0939 \\u0936\\u0941\\u092d\\u093e\\u0936\\u0940\\u0937\"},{\"id\":\"bf-6\",\"name\":\"\\u0936\\u094d\\u0930\\u0940 \\u0938\\u0902\\u091c\\u092f \\u0938\\u093f\\u0902\\u0939 \\u090f\\u0935\\u0902 \\u0936\\u094d\\u0930\\u0940\\u092e\\u0924\\u0940 \\u0909\\u0930\\u094d\\u092e\\u093f\\u0932\\u093e \\u0926\\u0947\\u0935\\u0940\",\"relation\":\"\\u092e\\u093e\\u092e\\u093e \\u091c\\u0940 - \\u092e\\u093e\\u092e\\u0940 \\u091c\\u0940 (Maternal Uncle & Aunt)\",\"category\":\"uncles_aunts\",\"note\":\"\\u092e\\u093e\\u0924\\u0943\\u092a\\u0915\\u094d\\u0937 \\u092e\\u0902\\u0917\\u0932\\u0915\\u093e\\u092e\\u0928\\u093e\\u090f\\u0902\"},{\"id\":\"bf-7\",\"name\":\"\\u0930\\u093e\\u0939\\u0941\\u0932 \\u0938\\u093f\\u0902\\u0939 \\u090f\\u0935\\u0902 \\u0905\\u092d\\u093f\\u0937\\u0947\\u0915 \\u0938\\u093f\\u0902\\u0939\",\"relation\":\"\\u092d\\u094d\\u0930\\u093e\\u0924\\u093e (Brothers)\",\"category\":\"siblings\",\"note\":\"\\u0938\\u094d\\u0928\\u0947\\u0939\\u0940 \\u092d\\u093e\\u0908\"},{\"id\":\"bf-8\",\"name\":\"\\u0938\\u092e\\u0938\\u094d\\u0924 \\u0938\\u093f\\u0902\\u0939 \\u092a\\u0930\\u093f\\u0935\\u093e\\u0930 \\u090f\\u0935\\u0902 \\u0938\\u094d\\u0928\\u0947\\u0939\\u0940\\u091c\\u0928\",\"relation\":\"\\u0926\\u0930\\u094d\\u0936\\u0928\\u093e\\u092d\\u093f\\u0932\\u093e\\u0937\\u0940 \\/ \\u0938\\u094d\\u0935\\u093e\\u0917\\u0924\\u093e\\u0915\\u093e\\u0902\\u0915\\u094d\\u0937\\u0940 (Welcoming Kinsfolk)\",\"category\":\"darsanabhilashi\",\"note\":\"\\u0925\\u093e\\u0935\\u0947, \\u0917\\u094b\\u092a\\u093e\\u0932\\u0917\\u0902\\u091c (\\u092c\\u093f\\u0939\\u093e\\u0930)\"}]}','2026-10-23 03:52:32','2026-10-24 04:33:08');
/*!40000 ALTER TABLE `invitations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_10_23_091920_create_personal_access_tokens_table',1),(5,'2026_10_23_091957_create_wedding_tables',2),(6,'2026_10_23_101130_add_hero_image_to_invitations_table',3);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'admin-universe-access','5cda571729b5fb68a72528008f4bb185944af3ad3d4bc03544d52aec8714d67e','[\"*\"]',NULL,NULL,'2026-10-23 03:56:13','2026-10-23 03:56:13'),(3,'App\\Models\\User',1,'admin-universe-access','3c33804535a6b3b40da57a14f2c3fd40c5a99e6161b8532f25263f4771766549','[\"*\"]','2026-10-24 04:35:30',NULL,'2026-10-23 09:41:37','2026-10-24 04:35:30'),(4,'App\\Models\\User',1,'admin-universe-access','7ed6cb9a1e763d42ba1282ba232809b82ffa14b0745eb299c9993e02d141f144','[\"*\"]','2026-10-24 00:00:08',NULL,'2026-10-23 23:59:36','2026-10-24 00:00:08');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rsvps`
--

DROP TABLE IF EXISTS `rsvps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rsvps` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `invitation_id` bigint(20) unsigned NOT NULL,
  `guest_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `attendance_status` enum('attending','declined','tentative') NOT NULL DEFAULT 'attending',
  `guest_count` int(11) NOT NULL DEFAULT 1,
  `selected_events` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`selected_events`)),
  `dietary_notes` text DEFAULT NULL,
  `message` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rsvps_invitation_id_attendance_status_index` (`invitation_id`,`attendance_status`),
  KEY `rsvps_invitation_id_created_at_index` (`invitation_id`,`created_at`),
  CONSTRAINT `rsvps_invitation_id_foreign` FOREIGN KEY (`invitation_id`) REFERENCES `invitations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rsvps`
--

LOCK TABLES `rsvps` WRITE;
/*!40000 ALTER TABLE `rsvps` DISABLE KEYS */;
INSERT INTO `rsvps` VALUES (1,1,'Maharaja Vikramaditya & Maharani Gayatri Singh','vikram.singh@royalheritage.in','+91 98111 22334','attending',2,'[\"Surya Kanti \\u2014 The Haldi\",\"Sitara Raat \\u2014 The Sangeet\",\"The Vedic Pheras \\u2014 Royal Nuptials\",\"Jashn-e-Khaas \\u2014 The Grand Reception\"]','Strict Royal Jain Rajasthani cuisine','Heartiest congratulations to both the royal families! We await this magical union under the stars.',NULL,'2026-10-23 03:52:33','2026-10-23 03:52:33'),(2,1,'Dr. Siddharth & Natasha Oberoi','siddharth@oberoigroup.com','+91 98222 33445','attending',3,'[\"Heena Utsav \\u2014 The Mehendi\",\"Sitara Raat \\u2014 The Sangeet\",\"The Vedic Pheras \\u2014 Royal Nuptials\"]','Gluten free preferences','So thrilled to witness the celestial wedding of the decade! Sending all our love.',NULL,'2026-10-23 03:52:33','2026-10-23 03:52:33'),(3,1,'Kabir & Tara Mehta','kabir.mehta@londonvc.co.uk','+44 7700 900123','attending',2,'[\"Surya Kanti \\u2014 The Haldi\",\"Heena Utsav \\u2014 The Mehendi\",\"Sitara Raat \\u2014 The Sangeet\",\"The Vedic Pheras \\u2014 Royal Nuptials\",\"Jashn-e-Khaas \\u2014 The Grand Reception\"]','No restrictions, excited for authentic Mewari feasts','Flying in all the way from London! Wouldn’t miss our Oxford astronomer’s grand celestial wedding for the world.',NULL,'2026-10-23 03:52:33','2026-10-23 03:52:33'),(4,1,'Princess Ananya & Prince Neil',NULL,NULL,'attending',1,'[\"Surya Kanti \\u2014 The Haldi\",\"Heena Utsav \\u2014 The Mehendi\",\"Sitara Raat \\u2014 The Sangeet\",\"The Vedic Pheras \\u2014 Royal Nuptials\",\"Jashn-e-Khaas \\u2014 The Grand Reception\"]',NULL,NULL,'127.0.0.1','2026-10-23 04:13:55','2026-10-23 04:13:55');
/*!40000 ALTER TABLE `rsvps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('2qXu8gbJUKsZW2MLkDRnXqztTG7RQZrXtGdmPm8h',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-IN) WindowsPowerShell/5.1.26100.9711','YTozOntzOjY6Il90b2tlbiI7czo0MDoiOXAwSGVnMm5wZUo3VExqakpsQm1VOGRJZmM4aU1wOXJiOURicmtQSyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1792838224),('UruCvhcs00Lqt7LzAX4pfJzh9xC7gWbrao6bFxPf',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUGFBS1kySTQ4dkJlMVdkNDRVTWkwdnFTNnFWcFB0QjdCZkJIYTVycCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1792748369);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `story_milestones`
--

DROP TABLE IF EXISTS `story_milestones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `story_milestones` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `invitation_id` bigint(20) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `date_label` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `quote` varchar(255) DEFAULT NULL,
  `order_index` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `story_milestones_invitation_id_order_index_index` (`invitation_id`,`order_index`),
  CONSTRAINT `story_milestones_invitation_id_foreign` FOREIGN KEY (`invitation_id`) REFERENCES `invitations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story_milestones`
--

LOCK TABLES `story_milestones` WRITE;
/*!40000 ALTER TABLE `story_milestones` DISABLE KEYS */;
/*!40000 ALTER TABLE `story_milestones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Royal Custodian','admin@weddinguniverse.luxury',NULL,'$2y$12$Pkfo8O/fNG40KnjbusE8NuhSz8MBx32mOcN9t3vEmXmBBa4AyqjY2',NULL,'2026-10-23 03:52:32','2026-10-23 03:52:32');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venue_travel`
--

DROP TABLE IF EXISTS `venue_travel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `venue_travel` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `invitation_id` bigint(20) unsigned NOT NULL,
  `venue_name` varchar(255) NOT NULL,
  `venue_sub_heading` varchar(255) DEFAULT NULL,
  `address` text NOT NULL,
  `map_embed_url` text DEFAULT NULL,
  `map_directions_url` text DEFAULT NULL,
  `parking_info` text DEFAULT NULL,
  `accommodation_info` text DEFAULT NULL,
  `transport_info` text DEFAULT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `venue_travel_invitation_id_foreign` (`invitation_id`),
  CONSTRAINT `venue_travel_invitation_id_foreign` FOREIGN KEY (`invitation_id`) REFERENCES `invitations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venue_travel`
--

LOCK TABLES `venue_travel` WRITE;
/*!40000 ALTER TABLE `venue_travel` DISABLE KEYS */;
INSERT INTO `venue_travel` VALUES (1,1,'Shiv Bajrang Hotel, Thawe','Auspicious Heritage Destination','Near Thawe Mandir, Gopalganj, Bihar 841428','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.188373446452!2d73.6688753761763!3d24.582736156321957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5628b056157%3A0xe5a9df66f77ff779!2sThe%20Oberoi%20Udaivilas%2C%20Udaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin','https://maps.google.com/?q=Shiv+Bajrang+Hotel+Thawe+Gopalganj+Bihar','Valet parking available for all wedding guests inside the hotel premises.','Rooms and suites arranged for outstation family and guests at Shiv Bajrang Hotel.','Pick-up and shuttle services available from Gopalganj Railway Station and Siwan Junction.','Singh Family Hospitality Desk','+91 98765 43210','hospitality@weddinguniverse.luxury','2026-10-23 03:52:33','2026-10-23 05:10:37');
/*!40000 ALTER TABLE `venue_travel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wedding_events`
--

DROP TABLE IF EXISTS `wedding_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wedding_events` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `invitation_id` bigint(20) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `event_type` varchar(255) NOT NULL,
  `event_date` date NOT NULL,
  `start_time` varchar(255) NOT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `venue_name` varchar(255) NOT NULL,
  `venue_address` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `dress_code` varchar(255) DEFAULT NULL,
  `calendar_link` varchar(255) DEFAULT NULL,
  `color_accent` varchar(255) DEFAULT NULL,
  `order_index` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wedding_events_invitation_id_order_index_index` (`invitation_id`,`order_index`),
  CONSTRAINT `wedding_events_invitation_id_foreign` FOREIGN KEY (`invitation_id`) REFERENCES `invitations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wedding_events`
--

LOCK TABLES `wedding_events` WRITE;
/*!40000 ALTER TABLE `wedding_events` DISABLE KEYS */;
INSERT INTO `wedding_events` VALUES (18,1,'Haldi Utsav (हल्दी उत्सव)','haldi','2026-11-28','10:00 AM','02:00 PM','Shiv Bajrang Hotel, Thawe','Near Thawe Mandir, Gopalganj, Bihar','Auspicious turmeric ceremony filled with love, laughter, golden marigold petals, and traditional folk music.','Peele Vastra / Festive Yellow & Ochre','https://calendar.google.com/calendar/render?action=TEMPLATE&text=Haldi+Utsav+-+Amit+and+Sweety&dates=20261128T043000Z/20261128T083000Z','#D97706',1,'2026-10-24 03:02:07','2026-10-24 03:02:07'),(19,1,'Mehndi & Sangeet Raas (मेंहदी एवं संगीत)','mehendi','2026-11-29','05:00 PM','11:00 PM','Shiv Bajrang Hotel, Thawe','Grand Banquet Hall, Shiv Bajrang Hotel, Thawe, Gopalganj, Bihar','An enchanting evening of intricate henna designs, soulful songs, dance performances, and family celebrations.','Royal Green, Emerald & Festive Ethnic','https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mehndi+and+Sangeet+-+Amit+and+Sweety&dates=20261129T113000Z/20261129T173000Z','#047857',2,'2026-10-24 03:02:07','2026-10-24 03:02:07'),(20,1,'Shubh Vivah (शुभ विवाह एवं पाणिग्रहण)','wedding','2026-11-30','07:00 PM','02:00 AM','Shiv Bajrang Hotel, Thawe','Royal Vivah Mandap, Shiv Bajrang Hotel, Thawe, Gopalganj, Bihar','The auspicious Vedic wedding rituals, Jaimala, and the seven sacred vows (Saat Phere) around the holy fire.','Traditional Royal Attire — Deep Maroon, Crimson Red & Antique Gold','https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shubh+Vivah+-+Amit+and+Sweety&dates=20261130T133000Z/20261130T203000Z','#881337',3,'2026-10-24 03:02:07','2026-10-24 03:02:07');
/*!40000 ALTER TABLE `wedding_events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-24 16:44:40
