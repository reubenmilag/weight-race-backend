CREATE TABLE IF NOT EXISTS challenge_participants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  challenge_id INT NOT NULL,
  user_id INT NOT NULL,
  status ENUM('pending','accepted','rejected') NOT NULL DEFAULT 'accepted',
  joined_at DATETIME NOT NULL,
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_challenge_user (challenge_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
