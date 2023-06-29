const nombre='josmar diaz';
function sumar(n1,n2){
    return n1+n2;
}
function restar(n1,n2){
    return n1-n2;
}
function multiplicar(n1,n2){
    return n1*n2;
}

//module.exports.nombre=nombre;
module.exports={
    nombre:nombre,
    sumar:sumar,
    restar:restar,
    multiplicar:multiplicar,
    dividir:function(n1,n2){
        return n1/n2;
    }
};