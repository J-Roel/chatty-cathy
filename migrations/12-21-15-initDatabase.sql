DROP DATABASE IF EXISTS chattycathy;
CREATE DATABASE chattycathy;

\c chattycathy;

DROP TABLE IF EXISTS chatrooms;
CREATE TABLE chatrooms ( id SERIAL PRIMARY KEY, key_code VARCHAR(8) );


-- CREATE TABLE chat_history (
--   id SERIAL PRIMARY KEY,
--   chatroom_id INTEGER,
--   chat_history TEXT,
-- );


INSERT INTO chatrooms (key_code) VALUES('81723546');
INSERT INTO chatrooms (key_code) VALUES('13411546');
INSERT INTO chatrooms (key_code) VALUES('23462561');
INSERT INTO chatrooms (key_code) VALUES('99999999');
