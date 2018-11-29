
const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const orcamentos = [];

app.use(bodyParser.json());

app.listen(3000, function () {
	console.log('testando');
});

app.post('/orcamento', function (request, response) {
	orcamentos.push(request.body)
	response.status(200).send();
})

app.get('/orcamentos', function (request, response) {
	// reversão do array sem modificar: cria uma cópia e reverse na cópia
	response.render('lista-orcamentos.html', { orcamentos: orcamentos.slice().reverse() });
})