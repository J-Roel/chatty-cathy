knex-pg


var knex = require('knex')({
	
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		port: '3000',
		uesr: 'jeremy',
		password: 'password',
		database: 'test'
	}
});


router.get('/', function(res, req, next){
	knex('user')
	.select('*')
	.then(function(data){
		console.log(data);
		res.render('users', {
			title: '',
			users: data
		});
	});
});



npm

dotenv


schema.sql is to build database

then creata a new file to to seed the database
psql chattycathy < data/schema.sql



###in seed file:
INSERT INTO chatrooms (key_code) VALUES('81723546');
INSERT INTO chatrooms (key_code) VALUES('13411546');
INSERT INTO chatrooms (key_code) VALUES('23462561');


###After building files:
heroku pg:psql DATABASE < data/schema.sql
heroku pg:psql DATABASE < data/seed.sql

psql chattycathy < migrations/12-21-15-initDatabase.sql


###Heroku Postgres

- heroku addons:create heroku-postgresql
- modified expected environment variables to match Heroku
	- npm dotenv
	- Set variable by process.env 
- Fill Heroku database
	- Heroku pg:psql < DATABASE data/schema.sql
	- Heroku pg:psql < DATABASE data/seed.sql

- Heroku logs
- Heroku config

- 