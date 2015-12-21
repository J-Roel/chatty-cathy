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


