#!/usr/bin/node

const http = require("http");
const node_static = require("node-static");

const mongo = require("mongodb").MongoClient;

let server_url = "mongodb://localhost:27017";

let chat_db;

mongo.connect(server_url, (err, server) => {
	if(err){
		console.log("Error connecting to MongoDB");
		throw err;
	}
	console.log("Into MONGODB Server");

	chat_db = server.db("amongmeme");

	//chat_db.collection("chat").find({});
});

console.log("INIT CHAT SERVER");

let public_files = new node_static.Server("pub");

http.createServer( (request, response) => {
	if (request.url.startsWith("/chat")){
		let info = request.url.split("=");
		console.log(info[1]);

		let cursor = chat_db.collection("chat").find(query);
		cursor.toArray().then( (data) => {
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.write( JSON.stringify(data) );
			response.end();
		});

		return;
	}

	if (request.url == "/recent"){
		const estimated_count = chat_db.collection("chat").estimatedDocumentCount();
		
		estimated_count.then((count) => {
			console.log(count);

			const MAX = 5;
		});
	
		}

		response.end();
		return;
	}

	public_files.serve(request, response);
}).listen(8282);

