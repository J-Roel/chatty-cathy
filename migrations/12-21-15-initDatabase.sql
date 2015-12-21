CREATE DATABASE chattycathy;

\c chattycathy;

CREATE TABLE chatrooms (
  id SERIAL PRIMARY KEY,
  key_code VARCHAR(8)
);

-- CREATE TABLE chat_history (
--   id SERIAL PRIMARY KEY,
--   chatroom_id INTEGER,
--   chat_history TEXT,
-- );
