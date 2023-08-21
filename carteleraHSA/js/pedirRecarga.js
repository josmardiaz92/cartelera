let ruta='../php/consultarRecarga.php';
let newEstatus='';
const btnRecargar=document.getElementById('recargar');

btnRecargar.addEventListener('click',pedirRecarga);

function pedirRecarga(){
    newEstatus='A';
    const formData = new FormData();
    formData.append("estatus",newEstatus);
    fetch("../php/hacerRecarga.php",{
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('recarga hecha');
        }
    })
    .catch(error => {
        console.error("Hubo un error al hacer la recarga: ", error);
    });
}
