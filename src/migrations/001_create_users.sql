CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  height_cm DECIMAL(5,2) NOT NULL,
  start_weight_kg DECIMAL(5,2) NOT NULL,
  goal_weight_kg DECIMAL(5,2) NOT NULL,
  gender ENUM('male','female','other') NULL,
  age INT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
