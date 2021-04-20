#!/usr/bin/node

const http = require("http");
const node_static = require("node-static");

const mongo = require("mongodb").MongoClient;

let server_url = "mongodb://localhost:27017"

mongo.connect(server_url, (err, server) => {
	if(err){
		console.log("Error connecting to MongoDB");
		throw err;
	}
	console.log("Into MONGODB Server");

	let chat_db = server.db("amongmeme");

	chat_db.collection("chat").find({});
});

console.log("INIT CHAT SERVER");
/*
let public_files = new node_static.Server("pub");

http.createServer((request, response) => {
	console.log("File"+request.url);
	public_files.serve(request, response);
}).listen(8282);
*/
