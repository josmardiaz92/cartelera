const btnValidar=document.getElementById('aceptarClave');
const inputClave=document.getElementById('clave');
let claveIngresada='';
let responsable='';

const btnAgregar=document.getElementById('agregarTasa');
btnAgregar.addEventListener('click',()=>{
    const dolar=document.getElementById('usd_cam').value;
    const pesos=document.getElementById('cop_cam').value;
    const modalDolar=document.getElementById('modalDolar');
    const modalPesos=document.getElementById('modalPesos');
    modalDolar.innerHTML=`${dolar} Bs/USD`;
    modalPesos.innerHTML=`${pesos} Bs/COP`;
})

inputClave.addEventListener('change',()=>{
    claveIngresada=inputClave.value;
    switch (claveIngresada) {
        case '12903127':
            responsable='pedro';
            btnValidar.disabled=false;
            break;
        case '1980':
            responsable='lorenzo';
            btnValidar.disabled=false;
            break;
        default:
            alert('Clave invalida')
            btnValidar.disabled=true;
            break;
    }
});

btnValidar.addEventListener('click', subirTasa);

function subirTasa(){
    const dolar=parseFloat(document.getElementById('usd_cam').value);
    const pesos=parseFloat(document.getElementById('cop_cam').value);
    const formData = new FormData();
    formData.append("responsable",responsable);
    formData.append("dolar",dolar);
    formData.append("pesos",pesos);
    fetch("../php/insertarTasa.php",{
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Subida exitosa.');
            location.reload();
            
        } else {
            alert('Error al subir');
        }
    })
    .catch(error => {
        console.error("Hubo un error al subir las tasas:", error);
    });
}
