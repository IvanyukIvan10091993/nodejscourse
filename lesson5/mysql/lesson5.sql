SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `gbnode` ;
CREATE SCHEMA IF NOT EXISTS `gbnode` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `gbnode` ;

-- -----------------------------------------------------
-- Table `gbnode`.`tasks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gbnode`.`tasks` ;

CREATE TABLE IF NOT EXISTS `gbnode`.`tasks` (
  `task_id` INT NOT NULL AUTO_INCREMENT,
  `task_name` VARCHAR(45) NOT NULL,
  `task_description` VARCHAR(255) NULL,
  `task_iscomplete` TINYINT(1) NOT NULL DEFAULT FALSE,
  `task_priority` INT NOT NULL,
  PRIMARY KEY (`task_id`));


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
