fetch('../php/info.php')
  .then(response => response.json())
  .then(data => {
    var consultorios = data;

    console.log(consultorios); // Muestra los datos JSON en la consola del navegador

    // Iterar sobre los datos JSON y acceder a los valores
    for (var i = 0; i < consultorios.length; i++) {
      var consultorio = consultorios[i];
      var id = consultorio.cod_con;
      var nombre = consultorio.num_con;
      // Acceder a otros campos según sea necesario

      console.log('ID:', id);
      console.log('Nombre:', nombre);
      // Mostrar o realizar operaciones con otros campos
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

