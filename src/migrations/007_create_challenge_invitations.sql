CREATE TABLE IF NOT EXISTS challenge_invitations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  challenge_id INT NOT NULL,
  inviter_id INT NOT NULL,
  invitee_id INT NOT NULL,
  status ENUM('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
  created_at DATETIME NOT NULL,
  responded_at DATETIME NULL,
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
  FOREIGN KEY (inviter_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (invitee_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_invite (challenge_id, invitee_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
