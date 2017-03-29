// MongoKlientas
var MongoClient = require('mongodb').MongoClient;

// Vardu generavimui
var random_name = require('node-random-name');

// Komandines eilutes parametrai
var argv = require('minimist')(process.argv.slice(2));

// Jungiames prie DB
MongoClient.connect("mongodb://localhost:27017/KayakUI", function(err, db) {
  if(err) {
    console.log("Klaida!");
    console.log(err);
  } else {
  	console.log("Prisijungta!");

  	var collection = db.collection('users');

  	switch(argv.a) {
    case "seed":
        fillDB(db, collection);
        break;
    case "select":
        select(db, collection);
        break;
    default:
        console.log("Nepasirinktas veiksmas -a!");
    }

  db.close();

  }
});

function fillDB(db, collection) {
	var fillInUsersCount = 9999;

	for (var i = 0; i < fillInUsersCount; i++) {
		var user = {name: random_name(), age: getRandomInt(18, 99), roles: ['admin', 'moderator', 'user']};
		collection.insert([user], function (err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
			}
		});
	}
	
}

function select(db, collection) {
	collection.findOne({age: getRandomInt(18, 99)}, function(err, item) {
		console.log(item);
	});
	
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

