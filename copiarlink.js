document.addEventListener('DOMContentLoaded', function () {
    var copiarLinkBtn = document.getElementById('copiarLinkBtn');

    copiarLinkBtn.addEventListener('click', function () {
        // Enlace predefinido que quieres copiar
        var enlacePredefinido = "https://www.youtube.com/"; // Reemplaza con tu enlace

        // Intenta copiar el contenido al portapapeles usando el API de Clipboard
        navigator.clipboard.writeText(enlacePredefinido)
            .then(function () {
                // Mostrar un mensaje de éxito con SweetAlert
                Swal.fire("Enlace copiado al portapapeles");
            })
            .catch(function (err) {
                // Manejar cualquier error que pueda ocurrir al copiar
                console.error('Error al copiar al portapapeles:', err);
                Swal.fire("Error al copiar al portapapeles");
            });
    });
});







