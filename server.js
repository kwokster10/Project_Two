var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');

var db = new sqlite3.Database("db/diner.db");
var app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

// if you wanted to namespace your app, include it like so 
// app.use("/rick-run", express.static('public'));
app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('index.html')
});

app.get('/categories', function(req, res){
	db.all("SELECT * FROM categories;", function(err, rows){
		if(err){
			throw err;
		}
		res.json(rows);
	});
});

app.get('/categories/:id', function(req, res){
	db.get('SELECT * FROM categories WHERE id = ?;', req.params.id, function(err, row){
		db.all("SELECT * FROM dishes WHERE category_id = ?;", req.params.id, function(err, rows){
			if(err){
				throw err;
			}
			row["dishes"] = rows;
			res.json(row);
		})
	});
});

app.post('/categories', function(req, res){
	db.run("INSERT INTO categories (name) VALUES (?);", req.body.name, function(err,row){
		if(err){
			throw err;
		}
		var id = this.lastID;
        db.get("SELECT * FROM categories WHERE id = ?;", id, function(err, row) {
        	if(err) {
        		throw err;
        	}
        	res.json(row);
        });
    });
});

app.put('/categories/:id', function(req, res){
	var id = req.params.id
	db.run("UPDATE categories SET name = ? WHERE id = ?;", req.body.name, id, function(err){
		if(err){
			throw err;
		}
		db.get("SELECT * FROM categories WHERE id = ?;", id, function(err, row){
			if(err){
				throw err;
			}
			res.json(row);
		});
	});
});

app.delete('/categories/:id', function(req, res){
	db.run("DELETE FROM dishes WHERE category_id = ?;", req.params.id, function(err) {
		db.run("DELETE FROM categories WHERE id = ?;", req.params.id, function(err){
			if(err){
				throw err;
			}
			res.json({deleted: true});
		});
	});
});


app.get('/dishes', function(req, res) {
	db.all("SELECT * FROM dishes;", function(err, rows) {
		if(err) {
			throw err;
		}
		res.json(rows);
	});
});


app.get('/dishes/:id', function(req, res) {
	db.get("SELECT * FROM dishes WHERE id = ?;", req.params.id, function(err, row){
		if(err) {
			throw err;
		}
		res.json(row);
	});
});

app.post('/dishes', function(req, res) {
	db.run("INSERT INTO dishes (name, description, image_url, price, category_id) VALUES (?,?,?,?,?);", req.body.name,  req.body.description, req.body.image_url, req.body.price, req.body.category_id, function(err) {
		if(err) {
			throw err;
		}
    var id = this.lastID;
    db.get("SELECT * FROM dishes WHERE id = ?;", id, function(err, row) {
    	if(err) {
    		throw err;
    	}
    	res.json(row);
    });
  });
});

app.put('/dishes/:id', function(req, res) {
	var id = req.params.id;
	db.run("UPDATE dishes SET name = ?, description = ?, price = ?, image_url = ?, category_id = ? WHERE id = ?;", req.body.name, req.body.description, req.body.price, req.body.image_url, req.body.category_id, id, function (err) {
		if(err) {
			throw err;
		}
		db.get("SELECT * FROM dishes WHERE id = ?;", id, function(err, row) {
			if(err) {
				throw err;
			}
			res.json(row);
		});
	});
});

app.delete('/dishes/:id', function(req, res) {
	db.run("DELETE FROM dishes WHERE id = ?;", req.params.id, function(err) {
		if(err) {
			throw err;
		}
		res.json({deleted: true});
	});
});

var port = Number(process.env.PORT || 3000);
app.listen(port);
console.log("Listening on "+ port);



