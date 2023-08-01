const rutaImagenes='../php/listarCon1.php';
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
                                        <button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#modal" data-bs-whatever=${element.cod_mul}><i class="fa-solid fa-eye" style="color: #001A6F" data-bs-toggle="tooltip" data-bs-placement="left" title="Ver"></i></button>
                                      </td>
                                  </tr>`
          })

    })
    .catch(error=>{console.error(`Atención ${error}`)})
}

async function consultarUna(codigo){
  fetch(rutaImagenes)
  .then(resp=>resp.json())
  .then(imagenes=>{
    imagenes.forEach(imagen=>{
      if(imagen.cod_mul==codigo){
        const btnEditar=modal.querySelector('#editar');
        const modalNombre = modal.querySelector('#url_mul');
        modalNombre.value = imagen.url_mul;

        const modalExtension=modal.querySelector('#ext_mul');
        modalExtension.value=imagen.ext_mul;

        const modalSwitch=modal.querySelector('#switch');
        const modalMuestraImagen=modal.querySelector('#modalImagen');
        modalMuestraImagen.innerHTML=`<img src="../imagenes/${imagen.url_mul}.${imagen.ext_mul}" alt="" srcset="" class="muestra-modal img-fluid">`;
          modalSwitch.addEventListener('change',function(){
            if(this.checked){
              modalUbicacion.disabled=false;
              modalArea.disabled=false;
              modalDuracion.readOnly=false;
              modalstatus.disabled=false;
              btnEditar.disabled=false;
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
                fileInput.addEventListener("change", function() {
                  const file = this.files[0];
                   // Obtener el nombre del archivo y la extensión
                  const nombreNuevo = file.name.split('.').slice(0, -1).join('.');
                  const extensionNueva = file.name.split('.').pop().toLowerCase(); // Obtener la extensión del archivo
                  if (file) {
                    const reader = new FileReader();
                    reader.addEventListener("load", function() {
                      imagePreview.src = reader.result;
                      imagePreview.classList.remove('d-none');
                      modalNombre.value=nombreNuevo;
                      modalExtension.value=extensionNueva;
                    });
                    reader.readAsDataURL(file);
                  } else {
                    imagePreview.classList.add('d-none');
                    imagePreview.src = "#";
                  }
                });
            }else{
              modalUbicacion.disabled=true;
              modalArea.disabled=true;
              modalDuracion.readOnly=true;
              modalstatus.disabled=true;
              btnEditar.disabled=true;
              btnEditar.classList.add('d-none');
              modalMuestraImagen.innerHTML=`<img src="../imagenes/${imagen.url_mul}.${imagen.ext_mul}" alt="" srcset="" class="muestra-modal img-fluid">`;
            }
          })
        
        const modalUbicacion=modal.querySelector('#ubi_mul');
        modalUbicacion.value=imagen.ubi_mul;

        const modalArea=modal.querySelector('#are_mul');
        modalArea.value=imagen.are_mul;

        const modalDuracion=modal.querySelector('#dur_mul');
        modalDuracion.value=`${(imagen.dur_mul)/1000} Segundos`;

        const modalstatus=modal.querySelector('#est_mul');
        modalstatus.value=imagen.est_mul;
      }
    })
  })
  .catch(error=>{console.error(`Atención ${error}`)})
}

consultarImagenes();
