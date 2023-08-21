let ruta='../php/consultarRecarga.php';
let estatus='';

consultarRecarga();

setInterval(() => {
    consultarRecarga();
}, 3000);

function consultarRecarga() {
    fetch(ruta)
        .then(res => res.json())
        .then(recarga => {
            recarga[0].est_acc=='A'?estatus=true:estatus=false;
            if(estatus){
                setTimeout(() => {
                    hacerRecarga();
                }, 3000);
            }
        });
}

function hacerRecarga(){
    estatus='I';
    const formData = new FormData();
    formData.append("estatus",estatus);
    fetch("../php/hacerRecarga.php",{
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload(true);
        }
    })
    .catch(error => {
        console.error("Hubo un error al hacer la recarga: ", error);
    });
}
