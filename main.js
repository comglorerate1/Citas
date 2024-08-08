let quotes = [];

async function fetchQuotes() {
    try {
        const response = await fetch('quotes.json');
        quotes = await response.json();
    } catch (error) {
        console.error('Error al cargar las citas:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchQuotes();
});

document.getElementById('new-quote').addEventListener('click', () => {
    if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        document.getElementById('quote').innerText = quotes[randomIndex].quote;
    } else {
        document.getElementById('quote').innerText = "No se pudieron cargar las citas.";
    }
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