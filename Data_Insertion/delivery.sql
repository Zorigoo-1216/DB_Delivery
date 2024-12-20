  CREATE DATABASE delivery;


  CREATE TABLE `employee` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `Last_name` VARCHAR(255) NOT NULL,
    `First_name` VARCHAR(255)NOT NULL,
    `sex` CHAR(1),
    `position` VARCHAR(255),
    `email` VARCHAR(30) NOT NULL,
    `phone` BIGINT , 
    `date_of_brith` DATE,
    `passport` VARCHAR(255),
    `home_address` VARCHAR(255),
    `salary` INT,
    PRIMARY KEY (`id`),
    UNIQUE (`phone`),
    UNIQUE (`email`)
  );

  DELIMITER //
  CREATE TRIGGER check_employee_constraints_insert
  BEFORE  INSERT ON `employee`
  FOR EACH ROW
  BEGIN
      IF NEW.`email`IS NULL THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'employee must have email ';
      END IF;
      IF NEW.sex NOT IN ("F","M") THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'sex must be one of F or M ';
      END IF;
  END //
  DELIMITER ;

  DELIMITER //
  CREATE TRIGGER check_employee_constraints_update
  BEFORE  UPDATE ON `employee`
  FOR EACH ROW
  BEGIN
      IF NEW.`email`IS NULL THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'employee must have email ';
      END IF;
      IF NEW.sex NOT IN ("F","M") THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'sex must be one of F or M ';
      END IF;
  END //
  DELIMITER ;


  CREATE TABLE `driver`(
    employee_id INT,
    `transportation_type` VARCHAR(10),
    `delivery_area` VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES `employee`(id) ON DELETE CASCADE ON UPDATE CASCADE
  );

  DELIMITER //
  CREATE TRIGGER check_driver_constraints_insert
  BEFORE  INSERT ON driver
  FOR EACH ROW
  BEGIN
      IF NEW.`transportation_type`NOT IN ('CAR','BIKE', 'MOTORCYCLE') THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'transportation type must be one of car, bike, motorcycle ';
      END IF;
  END //
  DELIMITER ;

  DELIMITER //
  CREATE TRIGGER check_driver_constraints_update
  BEFORE  UPDATE ON driver
  FOR EACH ROW
  BEGIN
      IF NEW.`transportation_type` NOT IN ('CAR', 'BIKE', 'MOTORCYCLE') THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'transportation type must be one of car, bike, motorcycle ';
      END IF;
  END //
  DELIMITER ;


  CREATE TABLE `partner` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) ,
    `password` VARCHAR(30),
    `address` VARCHAR(255),
    `phone` INT,
    `email` VARCHAR(30),
    `business_type` VARCHAR(255),
    PRIMARY KEY (id),
    UNIQUE (phone),
    UNIQUE (email)
  );

  CREATE TABLE `storage` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `manager_id` INT,
    `address` VARCHAR(255),
    `phone` INT,
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (phone)
  );

  CREATE TABLE `product` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `quantity` INT,
    `storage_id` INT,
    partner_id INT,
    `name` VARCHAR(100),
    `price` INT,
    PRIMARY KEY (id),
    FOREIGN KEY (storage_id) REFERENCES `storage`(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (partner_id) REFERENCES partner(id) ON DELETE NO ACTION ON UPDATE CASCADE
  );



  CREATE TABLE `order` (
    `id`  INT NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(30) NOT NULL,
    `product_id` INT,
    `quantity` INT, 
    `created_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `address` VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE NO ACTION ON UPDATE CASCADE
  );

 DELIMITER //
CREATE TRIGGER set_default_order_status
BEFORE INSERT ON `order`
FOR EACH ROW
BEGIN
    -- Set default to 'WAITING' if status is empty or NULL
    IF NEW.status IS NULL OR TRIM(NEW.status) = '' THEN
        SET NEW.status = 'WAITING';
    END IF;

    -- Ensure status is among allowed values
    IF NEW.status NOT IN ('SUCCESS', 'CANCELED', 'WAITING', 'ON DELIVERY') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'status must be one of SUCCESS, CANCELED, WAITING, ON DELIVERY';
    END IF;
END //
DELIMITER ;

  DELIMITER //
  CREATE TRIGGER check_order_constraints_insert
  BEFORE  INSERT ON `order`
  FOR EACH ROW
  BEGIN
      IF NEW.status NOT IN ("SUCCESS", "CANCELED", "WAITING", "ON DELIVERY") THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'status must be one of  SUCCESS, CANCELED, WAITING, ON DELIVERY';
      END IF;
  END //
  DELIMITER ;

  CREATE TABLE `delivery` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `employee_id` INT,
    `order_id` INT,
    `delivered_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    FOREIGN KEY (order_id) REFERENCES `order`(id) ON DELETE NO ACTION ON UPDATE CASCADE
  );


  CREATE TABLE `payment` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `order_id` INT,
    `type` VARCHAR(255),
    `status` VARCHAR(10),
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES `order`(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CHECK( `status` IN ("SUCCESS","REFUNDED"))
  );




DELIMITER //
CREATE TRIGGER update_product_quantity_after_order
AFTER INSERT ON `order`
FOR EACH ROW
BEGIN
    UPDATE product
    SET quantity = quantity - NEW.quantity
    WHERE id = NEW.product_id;
    IF (SELECT quantity FROM product WHERE id = NEW.product_id) < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient product quantity for this order.';
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER prevent_duplicate_delivery
BEFORE INSERT ON delivery
FOR EACH ROW
BEGIN
    IF (SELECT COUNT(*) FROM delivery WHERE order_id = NEW.order_id) > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'An order can have only one delivery.';
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER set_default_order_status
BEFORE INSERT ON `order`
FOR EACH ROW
BEGIN
    IF NEW.status IS NULL OR NEW.status = '' THEN
        SET NEW.status = 'WAITING';
    END IF;
END //
DELIMITER ;





DELIMITER //
CREATE TRIGGER insert_delivery_after_update_order
AFTER UPDATE ON `order`
FOR EACH ROW
BEGIN
    DECLARE driver_id INT;
    DECLARE addr TEXT;
    IF OLD.status = 'WAITING' AND NEW.status = 'ON DELIVERY' THEN
       
        SELECT address INTO addr FROM `order` WHERE id = NEW.id;
        SELECT employee_id 
        INTO driver_id
        FROM driver
        WHERE INSTR(addr, delivery_area) > 0
        ORDER BY RAND()
        LIMIT 1;
        INSERT INTO `delivery` (employee_id, order_id, delivered_time)
        VALUES (driver_id, NEW.id, NULL);
    END IF;
END //
DELIMITER ;



