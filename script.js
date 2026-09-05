const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const usuarioInput = document.getElementById('usuario').value;
        const passwordInput = document.getElementById('password').value;
        const errorMsg = document.getElementById('errorMsg');

        if (usuarioInput.trim() !== "" && passwordInput.trim() !== "") {
            window.location.href = "principal.html";
        } else {
            errorMsg.style.display = "block";
        }
    });
}

function cargarDetalle(nombreModulo) {
    localStorage.setItem('moduloSeleccionado', nombreModulo);
    window.location.href = "detalle.html";
}
