window.addEventListener('DOMContentLoaded', function() {
    var gifs = document.querySelectorAll('.gif-image');
    var index = 0;

    function showNextGif() {
        gifs[index].style.display = 'none'; // Oculta el GIF actual

        index = (index + 1) % gifs.length; // Incrementa el índice para mostrar el siguiente GIF

        setTimeout(function() {
            gifs[index].style.display = 'block'; // Muestra el siguiente GIF después de 2 segundos
            setTimeout(showNextGif, 4000); // Espera 4 segundos y muestra el siguiente GIF
        }, 6000);
    }

    setTimeout(function() {
        gifs[index].style.display = 'block'; // Muestra el primer GIF después de 2 segundos
        setTimeout(showNextGif, 4000); // Espera 4 segundos y muestra el siguiente GIF
    }, 6000);
});
