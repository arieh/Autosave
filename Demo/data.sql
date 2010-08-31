/*
MySQL Data Transfer
Source Host: localhost
Source Database: autosave
Target Host: localhost
Target Database: autosave
Date: 31/08/2010 13:47:07
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for data
-- ----------------------------
DROP TABLE IF EXISTS `data`;
CREATE TABLE `data` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `step` int(11) NOT NULL DEFAULT '0',
  `value` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`,`step`),
  FULLTEXT KEY `value` (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records 
-- ----------------------------
