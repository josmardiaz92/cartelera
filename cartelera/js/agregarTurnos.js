const contenedor=document.getElementById('tabla-turnos');
const btnCambiar=document.getElementById('cambiar');
var listaTurnos = [
    {paciente: 'josmar diaz', en: 'consultorio 02'},
    {paciente: '6 diaz', en: 'consultorio 02'},
    {paciente: '7 diaz', en: 'consultorio 02'},
    {paciente: 'gaby diaz', en: 'consultorio 02'},
    {paciente: 'alejo diaz', en: 'consultorio 02'},
    {paciente: '4 diaz', en: 'consultorio 02'},
    {paciente: '5 diaz', en: 'consultorio 02'},
    {paciente: '8 diaz', en: 'consultorio 02'}
];


if (listaTurnos.length !== 0) {
    let c = 0;
    let data = '';

    listaTurnos.forEach(function(row) {
        if (c < 5) {
            data += row.paciente + '|' + row.en + '|tr|';
            if (c === 0) {
                var newRow = document.createElement('tr');
                newRow.innerHTML=`<tr><td class='text-center text-light border-0 fs-3'><span class='primer-fila'>${row.paciente}</span></td><td class='en text-center text-light border-0 fs-3'><span class='primer-fila'>${row.en}</span></td></tr>`;
                contenedor.appendChild(newRow);
            } else {
                var newRow = document.createElement('tr');
                newRow.innerHTML=`<tr><td class='text-center text-light border-0 fs-3'>${row.paciente}</td><td class='en text-center text-light border-0 fs-3'>${row.en}</td></tr>`;
                contenedor.appendChild(newRow);
            }
        }
    c++;
    let turnos=document.getElementById('turnos');
    turnos.value=data;
        
    });
}

btnCambiar.addEventListener('click',function(){
    const turno=document.getElementById('turnoActual');
    const entreturno=document.getElementById('entreTurnos')
    const turnoPacienteActual=document.getElementById('turno-paciente-general').innerText=`${listaTurnos[0].paciente}`;
    const turnoAreaActual=document.getElementById('turno-area-general').innerText=`${listaTurnos[0].en}`;
    if(turno.classList.contains('ver'))
    {
        turno.classList.remove("ver");
        turno.classList.add("no-ver");
        entreturno.classList.remove("no-ver");
        entreturno.classList.add("ver");

        if(turno.classList.contains('no-ver'))
        {
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

        if(turno.classList.contains('ver'))
        {
            setTimeout(()=>{
                turno.classList.remove("d-none");
                entreturno.classList.add("d-none");
            }, 550); 
        }
    }
});