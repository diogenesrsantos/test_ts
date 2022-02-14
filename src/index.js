const express = require('express');
const {request} = require('http');
const {uuid} = require('uuidv4');

const app = express();

app.use(express.json());


var projetos = [];
var ids = 1;
//projetos.push('Projeto 4');

app.get('/projects', (request, response) => {
  const { titulo }  = request.query;
  
  const result = titulo
    ? projetos.filter(projeto => projeto.titulo.includes(titulo))
    : projetos;

  return response.json( result );

});

app.get('/projectsid', (request, response) => {
  const { id }  = request.query;
  
  const result = id
    ? projetos.filter(projeto => projeto.id.includes(id))
    : projetos;

  return response.json( result );

});

app.post('/projects',(request, response) => {
  const {titulo, proprietario} = request.body;
  const id = `${ids}`;
  ids += 1;

  const projeto = {
    id,
    titulo,
    proprietario
  };

  projetos.push(projeto);

  return response.json(projeto);
});

app.put('/projects/:id',( request, response ) => { 
  const { id } = request.params;

  const { titulo, proprietario } = request.body;

  const prjIndex = projetos.findIndex(projeto => projeto.id === id);

  if (prjIndex <0 ) {
    return response.status( 400 ).json({error: "Projeto não encontrado!"});
  }

  const projeto = {
    id,
    titulo,
    proprietario
  };
  
  projetos[prjIndex] = projeto;
  
  return response.json(projeto);
});

app.listen(3333, () => {console.log('========  Backend Started! :D ========')});

