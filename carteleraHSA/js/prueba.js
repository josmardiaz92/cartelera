function uploadImages() {
    const imageInput = document.getElementById("image");
    const ubicacionSelect = document.getElementById("ubicacion");
    const areaSelect = document.getElementById("area");

    const files = imageInput.files;
    const ubicacion = ubicacionSelect.value;
    const area = areaSelect.value;

    if (files.length === 0) {
        alert("Por favor, selecciona al menos una imagen.");
        return;
    }

    const formData = new FormData();
    for (const file of files) {
        formData.append("images[]", file);
    }
    formData.append("ubicacion", ubicacion);
    formData.append("area", area);

    fetch("../php/prueba.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    })
    .catch(error => {
        console.error("Hubo un error al subir las imágenes:", error);
    });
}
