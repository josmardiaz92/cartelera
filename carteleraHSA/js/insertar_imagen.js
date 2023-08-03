const btnAgregar=document.getElementById('insertImagen');
btnAgregar.addEventListener('click',uploadImages);

function uploadImages() {
    const files = document.getElementById("imagen").files;
    const ubicacion = document.getElementById("ubicacion").value;
    const area = document.getElementById("area").value;
    const duracion = (document.getElementById("duracion").value)*1000;

    if (files.length === 0) {
        alert("Por favor, selecciona al menos una imagen.");
        return;
    }

    const formData = new FormData();
    for (const file of files) {
        formData.append("imagen[]", file);
    }
    formData.append("ubicacion", ubicacion);
    formData.append("area", area);
    formData.append("duracion", duracion)

    fetch("../php/insertarImagen.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.success) {
            alert('Subida exitosa.');
            location.reload();
            
        } else {
            alert('Error al subir');
        }
    })
    .catch(error => {
        console.error("Hubo un error al subir las imágenes:", error);
    });
}
