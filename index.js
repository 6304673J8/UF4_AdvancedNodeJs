#!/usr/bin/node

const http = require("http");
const node_static = require("node-static");

const mongo = require("mongodb").MongoClient;

let server_url = "mongodb://localhost:27017"
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
	console.log("File"+request.url);
	if (request.url == "/chat"){
		//console.log("Chat Starting");
		let cursor = chat_db.collection("chat").find({});

		let chat = cursor.toArray();		

		chat.then( (data) =>{
			console.log(data);

			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.write( JSON.stringify(data));
			response.end();
		});

		return;
	}

	if (request.url == "/submit"){
		console.log("send data", request.body);
		let body = [];
		request.on('data', (chunk) => {
			body.push(chunk);
		}).on('end', () => {
			let chat_data = JSON.parse(Buffer.concat(body).toString());

			chat_db.collection("chat").insertOne()({
			
			});
		});

		response.end();
		return;
	}

	public_files.serve(request, response);
}).listen(8282);

