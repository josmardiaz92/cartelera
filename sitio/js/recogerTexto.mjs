/* fetch('../prueba.txt')
  .then(response => response.text())
  .then(data => {
    // Aquí puedes utilizar el contenido del archivo en la variable 'data'
    console.log(data);
  })
  .catch(error => {
    console.log('Ocurrió un error al leer el archivo:', error);
  }); */

/* const archivos = ['../textos/prueba01.txt', '../textos/prueba02.txt','../textos/prueba03.txt','../textos/prueba04.txt'];

const promesasLectura = archivos.map(archivo => {
  return fetch(archivo)
    .then(response => response.text());
});

Promise.all(promesasLectura)
  .then(datos => {
    // Aquí puedes trabajar con los datos de los archivos
    // Compararlos, realizar operaciones, etc.
    console.log(datos)
    datos.forEach(dato=>{
        if(dato!=='')
        {
            document.write(dato);
        }
        else
        {
            console.log('el dato esta vacio');
        }
    });
  })
  .catch(error => {
    console.log('Ocurrió un error al leer los archivos:', error);
  });
 */

/*   import fetch from 'node-fetch';
import { createConnection } from 'mysql';

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pruebajs',
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar con la base de datos:', error);
  } else {
    console.log('Conexión exitosa con la base de datos');
  }
});

const archivos = [
  'C:/xampp/htdocs/github/cartelera/sitio/textos/prueba01.txt',
  'C:/xampp/htdocs/github/cartelera/sitio/textos/prueba02.txt',
  'C:/xampp/htdocs/github/cartelera/sitio/textos/prueba03.txt',
  'C:/xampp/htdocs/github/cartelera/sitio/textos/prueba04.txt',
];

function insertarDatos() {
  const promesasLectura = archivos.map((archivo) => {
    return fetch('file://' + archivo)
      .then((response) => response.text());
  });

  Promise.all(promesasLectura)
    .then((datos) => {
      datos.forEach((dato) => {
        if (dato !== '') {
          const sql = 'INSERT INTO tabla (nom_tab) VALUES (?)';
          connection.query(sql, [dato], (error, result) => {
            if (error) {
              console.error('Error al insertar datos en la base de datos:', error);
            } else {
              console.log('Datos insertados correctamente');
            }
          });
        } else {
          console.log('El dato está vacío');
        }
      });
    })
    .catch((error) => {
      console.log('Ocurrió un error al leer los archivos:', error);
    });
}

insertarDatos(); // Ejecutar la función inicialmente

// Ejecutar la función cada 30 segundos
/* setInterval(insertarDatos, 30000); */

// Cierra la conexión con la base de datos al finalizar
//connection.end(); */


import { createConnection } from 'mysql';
import fs from 'fs';

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pruebajs',
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar con la base de datos:', error);
  } else {
    console.log('Conexión exitosa con la base de datos');
    insertarDatos(); // Ejecutar la función después de establecer la conexión
  }
});

const archivos = [
  'C:/xampp/htdocs/github/cartelera/sitio/textos/prueba01.txt',
  'C:/xampp/htdocs/github/cartelera/sitio/textos/prueba02.txt',
  'C:/xampp/htdocs/github/cartelera/sitio/textos/prueba03.txt',
  'C:/xampp/htdocs/github/cartelera/sitio/textos/prueba04.txt',
];

function insertarDatos() {
  const promesasLectura = archivos.map((archivo) => {
    return new Promise((resolve, reject) => {
      fs.readFile(archivo, 'utf8', (error, contenido) => {
        if (error) {
          reject(error);
        } else {
          resolve(contenido);
        }
      });
    });
  });

  Promise.all(promesasLectura)
    .then((datos) => {
      datos.forEach((dato) => {
        if (dato !== '') {
          const sql = 'INSERT INTO tabla1 (con_tab) VALUES (?)';
          connection.query(sql, [dato], (error, result) => {
            if (error) {
              console.error('Error al insertar datos en la base de datos:', error);
            } else {
              console.log('Datos insertados correctamente');
            }
          });
        } else {
          console.log('El dato está vacío');
        }
      });
    })
    .catch((error) => {
      console.log('Ocurrió un error al leer los archivos:', error);
    })
    .finally(() => {
      connection.end(); // Cerrar la conexión después de completar todas las consultas
    });
}

// Ejecutar la función cada 30 segundos
/* setInterval(insertarDatos, 30000); */
