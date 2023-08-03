//TODO Toma de los elementos mediante la clase
elementosUpdate=document.querySelectorAll('.validarUpdate');

//TODO Aca es donde se ejecuta todo
elementosUpdate.forEach(elemento=>{
    elemento.addEventListener('blur',(evento)=>{
        const campo=evento.target;
        const valor=campo.value;
        const id=campo.id;
        console.log(campo,valor,id)
        const Regexp=expresionesRegulares[id];
        const nombreCampo=nombresCampos[id];
        const texto=`El campo ${nombreCampo} no puede ir vacio`;
        if(valor.length===0){
            campo.classList.remove("is-valid");
            campo.classList.remove("casilla");
            campo.classList.add("is-invalid");
            campo.classList.add("invalidUpdate");
            campo.classList.add("invalida");
            campo.nextElementSibling.classList.add("invalid-feedback");
            campo.nextElementSibling.innerText = "No puede dejarlo vacío";
            aparecer(alerta,textoAlerta,texto);
            setTimeout(() => {
                desaparecer(alerta);
            }, 3000);

        }else{
            validarCampo(campo,valor,Regexp,nombreCampo);
        }
        //TODO aca activo el boton
        const casillasInvalidas=document.querySelectorAll('.invalidUpdate').length;
        const btnEditar=document.getElementById('editar');
        if(casillasInvalidas>0){
            btnEditar.disabled=true;
        }else{
            btnEditar.disabled=false;
        }
    })
});