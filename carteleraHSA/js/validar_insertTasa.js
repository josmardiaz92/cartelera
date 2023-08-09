//TODO Toma de los elementos mediante la clase
const elementosInsert=document.querySelectorAll('.validarInsertTasa');

//TODO toma los elementos que serviran para mostrar las validaciones
const alerta=document.getElementById('alerta');
const textoAlerta=document.getElementById('textoAlerta');
const alerta2=document.getElementById('alerta2');
const textoAlerta2=document.getElementById('textoAlerta2');
const alerta3=document.getElementById('alerta3');
const textoAlerta3=document.getElementById('textoAlerta3');


//TODO Aca estan como deben ir los valores para ser bien valorados
const valoresok={
    usd_cam: '"Por favor, inserte la tasa de cambio a dolares."',
    cop_cam: '"Por favor, inserte la tasa de cambio a dolares."'
}


//TODO Aca estan los nombres para cada campo
const nombresCampos={
    usd_cam: '"Tasa de bs a dolares"',
    cop_cam: '"Tasa de bs a pesos"'
}

//TODO Aca se agregan las expresiones regulares, se hace en una lista y se coloca como propiedad el id de los elementos
const expresionesRegulares = {
    usd_cam: /^(?=.*[1-9])\d+(\.\d{1,2})?$/,
    cop_cam: /^(?=.*[1-9])\d+(\.\d{1,2})?$/
};

//TODO en esta funcion se valida el contenido de los campos con respecto a las expresionesRegulares
const validarCampo=(campo,valor,expresionesRegular,nombreCampo)=>{
    const valido=expresionesRegular.test(valor);
    const valorok=valoresok[campo.id];
    const texto2=`El campo ${nombreCampo} no es valido\nTome en cuenta lo siguiente:\n ${valorok}`;
    const texto3=`El campo ${nombreCampo} es valido`;
    campo.classList.toggle("casilla",!valido);
    campo.classList.toggle("is-valid", valido); //*Si valido es true, se agrega "is-valid" a la clase del elemento
    campo.classList.toggle("is-invalid", !valido); //*Si valido es false, se agrega "is-invalid" a la clase del elemento
    campo.classList.toggle("invalidInsert", !valido);
    campo.classList.toggle("invalida", !valido); //*Si valido es false, se agrega "invalida" a la clase del elemento
    campo.nextElementSibling.classList.toggle("invalid-feedback", !valido); //*Si valido es false, se agrega "invalid-feedback" a la clase del siguiente elemento
    campo.nextElementSibling.innerText = valido ? " " : `Introduzca un valor válido`; //*Dependiendo del valor de valido, de agregará el primer valor para true o el 2do para false
    if(!valido){
        aparecer(alerta2,textoAlerta2,texto2);
            setTimeout(() => {
                desaparecer(alerta2);
            }, 10000);
    }else{
        aparecer(alerta3,textoAlerta3,texto3);
            setTimeout(() => {
                desaparecer(alerta3);
            }, 3000);
    }
};

//TODO Aca es donde se ejecuta todo
elementosInsert.forEach(elemento=>{
    elemento.addEventListener('blur',(evento)=>{
        const campo=evento.target;
        const valor=campo.value;
        const id=campo.id;
        const Regexp=expresionesRegulares[id];
        const nombreCampo=nombresCampos[id];
        const texto=`El campo ${nombreCampo} no puede ir vacio`;
        if(valor.length===0){
            campo.classList.remove("is-valid");
            campo.classList.remove("casilla");
            campo.classList.add("is-invalid");
            campo.classList.add("invalidInsert");
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
        const casillasInvalidas=document.querySelectorAll('.invalidInsert').length;
        const btnAgregar=document.getElementById('agregarTasa');
        if(casillasInvalidas>0){
            btnAgregar.disabled=true;
        }else{
            btnAgregar.disabled=false;
        }
    })
});

function desaparecer(elem){
        elem.style.opacity=1;
        (function cambio() //paraanidar funciones dentro de otras, se debe encerrar la anidad en parentesis
        {
            if((elem.style.opacity-=0.01)<0) // como la funcion va a ser llamada recursivamente, por eso plamnteamos esta condicional
            {
                elem.classList.add("d-none");
            }
            else
            {
                requestAnimationFrame(cambio); //con esto es que se hace la llamada recursiva. esta funcion informa al navegador que quieres realizar una animacion y solicita que el navegador programe el repintado de la ventana para el proximo ciclo de la animacion.
            }
        })(); //si no se lococan esos dos parentesis extras, no funciona la funcion, esto es porque es una funcion anidada.
    }

function aparecer(elem,campoText,text){
    elem.style.opacity=0;
    elem.style.color='#0000FF';
    elem.classList.remove('d-none');
    campoText.innerText=text;
    (function cambiar()
    {
        let val=parseFloat(elem.style.opacity);
        if(!((val+=0.05)>1))
        {
            elem.style.opacity=val;
            requestAnimationFrame(cambiar);
        }
    })();
}