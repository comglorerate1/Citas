let quotes = [];
let availableQuotes = [];

async function fetchQuotes() {
    try {
        const response = await fetch('quotes.json');
        quotes = await response.json();
        resetAvailableQuotes();  // Inicializar el array de citas disponibles
    } catch (error) {
        console.error('Error al cargar las citas:', error);
    }
}

function resetAvailableQuotes() {
    availableQuotes = [...quotes];  // Copiar todas las citas al array de citas disponibles
}

document.addEventListener('DOMContentLoaded', () => {
    fetchQuotes();
    updateShareLinks();  // Actualizar los enlaces de compartir al cargar la página
});

document.getElementById('new-quote').addEventListener('click', () => {
    if (availableQuotes.length === 0) {
        resetAvailableQuotes();  // Reiniciar cuando todas las citas hayan sido mostradas
    }

    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuote = availableQuotes.splice(randomIndex, 1)[0];  // Remover la cita seleccionada del array
    document.getElementById('quote').innerText = selectedQuote.quote;
    updateShareLinks();  // Actualizar los enlaces de compartir con la nueva cita
});

document.getElementById('copy-quote').addEventListener('click', () => {
    const quoteText = document.getElementById('quote').innerText;
    const textArea = document.createElement('textarea');
    textArea.value = quoteText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
});

function updateShareLinks() {
    const quoteText = encodeURIComponent(document.getElementById('quote').innerText);

    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=&quote=${quoteText}`;
    const whatsappUrl = `https://wa.me/?text=${quoteText}`;
    const instagramUrl = `https://www.instagram.com/?url=&caption=${quoteText}`; // Instagram no soporta compartir texto directamente, pero puedes usar el caption

    document.getElementById('facebook-share').setAttribute('href', facebookUrl);
    document.getElementById('whatsapp-share').setAttribute('href', whatsappUrl);
    document.getElementById('instagram-share').setAttribute('href', instagramUrl);
}
