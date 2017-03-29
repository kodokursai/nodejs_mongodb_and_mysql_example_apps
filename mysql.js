// MySQL klientas
var mysql      = require('mysql');

// Vardu generavimui
var random_name = require('node-random-name');

// Komandines eilutes parametrai
var argv = require('minimist')(process.argv.slice(2));

// MySQL prisijungimo konf.
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : '',
  password : '',
  database : ''
});

/******************************************************/

connection.connect();

switch(argv.a) {
case "seed":
    fillDB(connection);
    break;
case "select":
    select(connection);
    break;
default:
    console.log("Nepasirinktas veiksmas -a!");
}

connection.end();

/******************************************************/

function fillDB(connection) {
	var fillInUsersCount = 9999;

	for (var i = 0; i < fillInUsersCount; i++) {
		var user = {name: random_name(), age: getRandomInt(18, 99)};
		var query = connection.query('INSERT INTO users SET ?', user, function(err, result) {
		    if (err) {
				console.log(err);
			} else {
				console.log(result);
			}
		});
	}
}

function select(connection) {
	var age = getRandomInt(18, 99);
	connection.query('SELECT * from users WHERE age = ?', age, function(err, rows, fields) {
	  if (!err) {
	    console.log('The solution is: ', rows);
	  }
	  else {
	    console.log('Error while performing Query.');
		console.log(err);
	  }	
	});
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/*
CREATE TABLE `users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL,
  `age` INT(3) NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));

*/