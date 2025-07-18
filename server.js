// Importamos el módulo http, que viene integrado en Node.js
const http = require('http');

// Definimos el host y el puerto en el que escuchará nuestro servidor
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// Creamos nuestro servidor
// El servidor recibe dos argumentos: la solicitud (req) y la respuesta (res)
const server = http.createServer((req, res) => {
  // Establecemos el código de estado HTTP 200 (OK)
  res.statusCode = 200;
  // Indicamos que el tipo de contenido que enviaremos es texto plano
  res.setHeader('Content-Type', 'text/plain');
  // Enviamos la respuesta "Hola, mundo!" al navegador
  res.end('Hola, mundo!');
});

// Hacemos que nuestro servidor "escuche" en el puerto y host que definimos
server.listen(port, hostname, () => {
  // Imprimimos un mensaje en la terminal para saber que el servidor está corriendo
  console.log(`El servidor está corriendo en http://${hostname}:${port}/`);
});