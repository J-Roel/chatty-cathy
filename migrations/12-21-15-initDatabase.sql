CREATE DATABASE chattyCathy;

\c chattyCathy;

CREATE TABLE chatRooms (
  id SERIAL PRIMARY KEY,
  key_code varchar(40),
);

-- CREATE TABLE chat_history (
--   id SERIAL PRIMARY KEY,
--   chatroom_id INTEGER,
--   chat_history TEXT,
-- );
