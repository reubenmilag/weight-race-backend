CREATE TABLE IF NOT EXISTS habit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  habit_id INT NOT NULL,
  user_id INT NOT NULL,
  log_date DATE NOT NULL,
  value DECIMAL(10,2) NULL,
  note VARCHAR(500) NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_habit_user_date (habit_id, user_id, log_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
