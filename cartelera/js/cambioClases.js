const btnCambiar=document.getElementById('cambiar');

btnCambiar.addEventListener('click',function(){
    const turno=document.getElementById('turnoActual');
    const entreturno=document.getElementById('entreTurnos')
    if(turno.classList.contains('ver')){
        turno.classList.remove("ver");
        turno.classList.add("no-ver");
        entreturno.classList.remove("no-ver");
        entreturno.classList.add("ver");
        if(turno.classList.contains('no-ver')){
            setTimeout(()=>{
            turno.classList.add("d-none");
            entreturno.classList.remove("d-none");
            }, 550);
        }
    }else{
        turno.classList.remove("no-ver");
        turno.classList.add("ver");
        entreturno.classList.remove("ver");
        entreturno.classList.add("no-ver");
        if(turno.classList.contains('ver')){
            setTimeout(()=>{
                turno.classList.remove("d-none");
                entreturno.classList.add("d-none");
            }, 550); 
        }
    }
});

