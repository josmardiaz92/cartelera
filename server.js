const express = require('express');
const app = express();

app.use(express.static('sitio/html'));

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
