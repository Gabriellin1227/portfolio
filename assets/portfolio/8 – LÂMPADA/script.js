var lampada_acender = document.getElementById("lamp")
var fundo = document.body


lampada_acender.addEventListener("click", function() {

    if (lampada_acender.src.endsWith("lamp_off.png")) {
        fundo.style.background = "radial-gradient(circle, white 8%, gold 100%)";
        lampada_acender.src = "assets/lamp_on.png"
        lampada_acender.alt = "Lâmpada Acessa"
    }
    else {
        fundo.style.background = "radial-gradient(circle, white 8%, black 100%)";
        lampada_acender.src = "assets/lamp_off.png"
        lampada_acender.alt = "Lâmpada Apagada"
    }

})