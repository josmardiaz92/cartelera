/* fetch('../prueba.txt')
  .then(response => response.text())
  .then(data => {
    // Aquí puedes utilizar el contenido del archivo en la variable 'data'
    console.log(data);
  })
  .catch(error => {
    console.log('Ocurrió un error al leer el archivo:', error);
  }); */

const archivos = ['../textos/prueba01.txt', '../textos/prueba02.txt','../textos/prueba03.txt','../textos/prueba04.txt'];

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
