// copiarlink.js

document.addEventListener('DOMContentLoaded', function () {
    var copiarLinkBtn = document.getElementById('copiarLinkBtn');

    copiarLinkBtn.addEventListener('click', function () {
        // Enlace predefinido que quieres copiar
        var enlacePredefinido = "https://www.youtube.com/"; // Reemplaza con tu enlace

        // Crea un elemento de entrada de texto oculto
        var input = document.createElement('input');
        input.setAttribute('value', enlacePredefinido);
        document.body.appendChild(input);

        // Selecciona y copia el contenido del campo de entrada de texto
        input.select();
        document.execCommand('copy');

        // Elimina el campo de entrada de texto después de copiar
        document.body.removeChild(input);

        // Puedes mostrar un mensaje de éxito u otro comportamiento aquí
        alert('Enlace copiado al portapapeles');
    });
});



