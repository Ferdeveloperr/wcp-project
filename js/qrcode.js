const $btnQR = document.getElementById('btnQR');

const generateQRCode = () => {
    const $url = document.getElementById('url').value;
    const $qrcontainer = document.getElementById('qrcode');

    //limpiamos el contenedor
    $qrcontainer.innerHTML = "";


    //generamos el QR

    new QRCode($qrcontainer, {
        text: $url,
        width: 228,
        height: 228,
    });

};

$btnQR.addEventListener("click", generateQRCode);