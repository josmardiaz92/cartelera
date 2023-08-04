const identificador=document.getElementById('identificador').value;
const rutaImagenes=`../php/${identificador}.php`;
const modal = document.getElementById('modal');


modal.addEventListener('show.bs.modal', function (event) {
  // Botón que activó el modal
    var button = event.relatedTarget
    // Extraer información de los atributos data-bs-*
    var codigoMul = button.getAttribute('data-bs-whatever');
    consultarUna(codigoMul);
    
});

async function consultarImagenes(){
    fetch(rutaImagenes)
    .then(respuesta=>respuesta.json())
    .then(arregloJsonImagenes=>{
      let status='';
      /* cuerpoTabla.innerHTML=''; */
        arregloJsonImagenes.forEach((element,index)=>{
          //*Aca se le da un valor visible al status
          switch (element.est_mul) {
            case 'A':
              status='Activo';              
              break;
            case 'I':
              status='Inactivo';              
              break;
            default:
              status=''
              break;
          }
          cuerpoTabla.innerHTML+=`
                                  <tr id="linea${index}">
                                      <td id="${element.url_mul}">${element.url_mul}</td>
                                      <td class="${element.ext_mul}">${element.ext_mul}</td>
                                      <td id="contenedorImg${index}">
                                          <img src="../imagenes/${element.url_mul}.${element.ext_mul}" alt="" srcset="" class="muestra img-fluid" id="imagen${index}">
                                      </td>
                                      <td class="${element.est_mul}">${status}</td>
                                      <td id="ver${index}">
                                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modal" data-bs-whatever=${element.cod_mul}><i class="fa-solid fa-eye" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver"></i></button>
                                      </td>
                                  </tr>`
          })

    })
    .catch(error=>{console.error(`Atención ${error}`)})
}

function editarImagen(ubi,are,dur,est,fil,cod,rut){
  
  const ubicacion = ubi.value;
  const area = are.value;
  const duracion=parseInt(dur.value)*1000;
  const estatus=est.value;

  const formData = new FormData();
  formData.append("imagen", fil);
  formData.append("ubicacion", ubicacion);
  formData.append("area", area);
  formData.append("duracion", duracion);
  formData.append("estatus", estatus);
  formData.append("codigo", cod)

  fetch(rut, {
      method: "POST",
      body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Actualizacion exitosa.');
      location.reload();
      
    } else {
      alert('Error al actualizar');
    }
  })
  .catch(error => {
    console.error("Hubo un error al subir las imágenes:", error);
  });
}

async function consultarUna(codigo){
  fetch(rutaImagenes)
  .then(resp=>resp.json())
  .then(imagenes=>{
    imagenes.forEach(imagen=>{
      if(imagen.cod_mul==codigo){
        const btnEditar=modal.querySelector('#editar');
        const modalNombre = modal.querySelector('#url_mul');
        const modalExtension=modal.querySelector('#ext_mul');
        const modalSwitch=modal.querySelector('#switch');
        const modalMuestraImagen=modal.querySelector('#modalImagen');
        const modalUbicacion=modal.querySelector('#ubi_mul');
        const modalArea=modal.querySelector('#are_mul');
        const modalDuracion=modal.querySelector('#dur_mul');
        const modalstatus=modal.querySelector('#est_mul');

        modalNombre.value = imagen.url_mul;
        modalExtension.value=imagen.ext_mul;
        modalMuestraImagen.innerHTML=`<img src="../imagenes/${imagen.url_mul}.${imagen.ext_mul}" alt="" srcset="" class="muestra-modal img-fluid">`;
          modalSwitch.addEventListener('change',function(){
            if(this.checked){
              modalUbicacion.disabled=false;
              modalArea.disabled=false;
              modalDuracion.readOnly=false;
              modalstatus.disabled=false;
              btnEditar.disabled=false;
              modalUbicacion.classList.add('casilla');
              modalArea.classList.add('casilla');
              modalDuracion.classList.add('casilla');
              modalstatus.classList.add('casilla');
              btnEditar.classList.remove('d-none');
              modalMuestraImagen.innerHTML=`<div>
                                              <label for="formFile" class="form-label text-capitalize">
                                                  elija una nueva imagen
                                              </label>
                                              <div id="preview" class="d-flex justify-content-center mb-2">
                                                  <img id="imagePreview" src="#" alt="Vista previa de la imagen" class="muestra-modal img-fluid d-none">
                                              </div>
                                              <input class="form-control" type="file" id="formFile">
                                          </div>`;
                const fileInput = document.getElementById("formFile");
                const imagePreview = document.getElementById("imagePreview");
                var files='';
                fileInput.addEventListener("change", function() {
                  files=this.files[0];
                  if (files) {
                    // Obtener el nombre del archivo y la extensión
                    const nombreNuevo = files.name.split('.').slice(0, -1).join('.');
                    const extensionNueva = files.name.split('.').pop().toLowerCase(); // Obtener la extensión del archivo
                    const reader = new FileReader();
                    reader.addEventListener("load", function() {
                      imagePreview.src = reader.result;
                      imagePreview.classList.remove('d-none');
                      modalNombre.value=nombreNuevo;
                      modalExtension.value=extensionNueva;
                    });
                    reader.readAsDataURL(files);
                  } else {
                    imagePreview.classList.add('d-none');
                    imagePreview.src = "#";
                    modalNombre.value = imagen.url_mul;
                    modalExtension.value=imagen.ext_mul;
                    files=''
                  }
                });
                btnEditar.addEventListener('click', () => {
                  if(files){
                    let ruta='../php/editarYsubirImagen.php';
                    editarImagen(modalUbicacion,modalArea,modalDuracion,modalstatus,files,codigo,ruta);
                  }else{
                    let ruta='../php/editarImagen.php';
                    editarImagen(modalUbicacion,modalArea,modalDuracion,modalstatus,files,codigo,ruta);
                  }
                });
            }else{
              modalUbicacion.disabled=true;
              modalArea.disabled=true;
              modalDuracion.readOnly=true;
              modalstatus.disabled=true;
              btnEditar.disabled=true;
              modalUbicacion.classList.remove('casilla');
              modalArea.classList.remove('casilla');
              modalDuracion.classList.remove('casilla');
              modalstatus.classList.remove('casilla');
              btnEditar.classList.add('d-none');
              modalMuestraImagen.innerHTML=`<img src="../imagenes/${imagen.url_mul}.${imagen.ext_mul}" alt="" srcset="" class="muestra-modal img-fluid">`;
            }
          })
        modalUbicacion.value=imagen.ubi_mul;
        modalArea.value=imagen.are_mul;
        modalDuracion.value=`${(imagen.dur_mul)/1000} Segundos`;
        modalstatus.value=imagen.est_mul;
      }
    })
  })
  .catch(error=>{console.error(`Atención ${error}`)})
}



consultarImagenes();
