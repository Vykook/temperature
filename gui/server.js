var express = require('express');
var mongo = require('mongodb').MongoClient, format = require('util').format;
var moment = require('moment');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use("/bower_components", express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
	var now = moment();
	var t24 = now.subtract(1, 'days').toISOString();

	mongo.connect('mongodb://mymongo:27017/home', function(err, db) {
		if(err) throw err;

		var collection = db.collection('temperature');

		collection.find({date:{'$gte': new Date(t24)}}, {_id: 0, temperature: 1, humidity: 1, date: 1}).sort({date: 1}).limit(1000).toArray(function(err, results) {
			res.render('index',
				{data: results}
			);
			db.close();
		});
	});
});

var server = app.listen(8888, function(){
	console.log('Running...');
});
