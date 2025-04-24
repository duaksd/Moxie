document.addEventListener('DOMContentLoaded', () => {
    const searchToggle = document.getElementById('search-toggle');
    const searchBox = document.querySelector('.search-box');
    const searchInput = searchBox.querySelector('input');
    const searchButton = searchBox.querySelector('button[type="submit"]');

    // Evento para o botão de busca
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Você buscou por: ${query}`);
            // Aqui você pode redirecionar ou filtrar os resultados
        } else {
            alert('Por favor, insira um termo para busca.');
        }
    });

    // Fechar a busca ao clicar fora
    document.addEventListener('click', (event) => {
        if (!searchBox.contains(event.target) && !searchToggle.contains(event.target)) {
            searchToggle.checked = false;
        }
    });
});