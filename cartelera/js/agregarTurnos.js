const contenedor=document.getElementById('tabla-turnos');
var listaTurnos = [
    {paciente: '6 diaz', en: 'consultorio 02'},
    {paciente: '7 diaz', en: 'consultorio 02'},
    {paciente: 'josmar diaz', en: 'consultorio 02'},
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