let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let tRegresivo = null

let winAudio = new Audio('./sounds/win.mp3');
let loseAudio = new Audio('./sounds/lose.mp3');
let clickAudio = new Audio('./sounds/click.mp3');
let rightAudio = new Audio('./sounds/right.mp3');
let wrongAudio = new Audio('./sounds/wrong.mp3');

// documentos
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t.restante");

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
numeros = numeros.sort(()=>Math.random()-0.5)
console.log(numeros)

// funciones

const reload = document.getElementById('reload');

reload.addEventListener('click', _ => { // el _ es para indicar la ausencia de parametros
    location.reload();
});

function contarTiempo(){
    tRegresivo = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tRegresivo)
            bloquearTarjetas();
            loseAudio.play();
            alert("Termino el tiempo")
        }
    },1000)
}

function bloquearTarjetas(){
    for (let i = 0; i <=15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png" alt={numeros[i]}>`;
        tarjetaBloqueada.disabled = true;
        
    }
    //alert("Termino el tiempo")

}

function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true

    }

    tarjetasDestapadas++;
    
    if(tarjetasDestapadas == 1){
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt={primerResultado}>`;
        clickAudio.play();
        //Deshabilitar boton
        tarjeta1.disabled = true;
        
    }else if( tarjetasDestapadas == 2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML =  `<img src="./images/${segundoResultado}.png" alt={segundoResultado}>`;
        clickAudio.play();

        tarjeta2.disabled = true;

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
        
        if(primerResultado == segundoResultado){
            tarjetasDestapadas = 0;
            
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightAudio.play();

            if(aciertos == 8){
                winAudio.play();
                clearInterval(tRegresivo)
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🎊🎊🎉🎉👍🏆👍🎉🎉🎊🎊`
                mostrarTiempo.innerHTML =  `Perfecto!!!, solo demoraste ${30 - timer} segundos ⏱️`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤟🤟😎😎 `
            }

        }else{
            //Mostrar temporalmente valores y volver a tapar
            wrongAudio.play();
            setTimeout(()=>{
                tarjeta1.innerHTML = ""
                tarjeta2.innerHTML = ""
                tarjeta1.disabled = false
                tarjeta2.disabled = false
                tarjetasDestapadas = 0;
            }, 800)
        }
    }


}