

##/--- TABLE SETUP ---/
` Postgres


| ---- USERS ---- |
| id SERIAL PRIMARY KEY -> unique ID of table entries
|
| user_name VARCHAR(40) -> ...if it's more than 40, their name is too long
|
| password VARCHAR(20) -> need to hash with bcrypt
|
| email VARCHAR(127) -> 
|
| rooms -> this is an array of the rooms the user is associated with
|
|-----------------|


| ---- ROOMS ---- |
| id SERIAL PRIMARY KEY -> unique ID of the table entries
|
| keyCode VARCHAR(8) -> keep to 8; need to hash? I let if as a varchar
|
| users TEXT[] -> array of user_names associated with room.
|
| line_history TEXT[] -> arrat if users drawing history built in objects
|
| chat_history TEXT[] -> array of users text (how long do we keep this?)
|
|	?-For line and chat history:
|	 ?-Might localize in the broswer memory and not even do this in
|	 ?-the database. They can keep the information there... but what's
|    ?-the limit? Do a timestamp and delete? Or just a number of entries?
|
|
|-----------------|

//What I passed into the psql
CREATE TABLE users ( 
id SERIAL PRIMARY KEY,
user_name varchar(40),
password varchar(20),
email varchar(127),
rooms integer[]
);


CREATE TABLE rooms (
id SERIAL PRIMARY KEY,
keyCode varchar(8),
users text[],
creation_date date,
line_history text[],
chat_history text[]
);