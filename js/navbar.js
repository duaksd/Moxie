function toggleDropdown(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const dropdown = document.getElementById("dropdownContent");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";

    if (dropdown.style.display === "block") {
        carregarDadosUsuario();
    }
}

async function carregarDadosUsuario() {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Decodifica o token para pegar o id do usuário (sem depender do localStorage)
    function parseJwt(token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    }
    const payload = parseJwt(token);
    if (!payload || !payload.id) return;

    try {
        const response = await fetch(`http://localhost:4000/usuarios/${payload.id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const usuario = await response.json();
            console.log('Usuário retornado do backend:', usuario); // <-- ADICIONE ESTA LINHA
            document.getElementById("userNameDisplay").innerHTML = `<strong>Nome:</strong> ${usuario.nome || '-'}`;
            document.getElementById("userEmailDisplay").innerHTML = `<strong>Email:</strong> ${usuario.email || '-'}`;
            document.getElementById("lastOrderDisplay").innerHTML = `<strong>Último pedido:</strong> -`;
            document.getElementById("favoritesDisplay").innerHTML = `<strong>Favoritos:</strong> -`;
            document.getElementById("savedCardsDisplay").innerHTML = `<strong>Cartões Salvos:</strong> -`;
            document.getElementById("addressDisplay").innerHTML = `<strong>Endereço:</strong> -`;
        } else {
            document.getElementById("userNameDisplay").innerHTML = `<strong>Nome:</strong> -`;
            document.getElementById("userEmailDisplay").innerHTML = `<strong>Email:</strong> -`;
        }
    } catch (error) {
        document.getElementById("userNameDisplay").innerHTML = `<strong>Nome:</strong> -`;
        document.getElementById("userEmailDisplay").innerHTML = `<strong>Email:</strong> -`;
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}

async function deleteProfile() {
    if (confirm("Tem certeza que deseja deletar seu perfil? Esta ação não pode ser desfeita.")) {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        const token = localStorage.getItem("token");

        if (!usuario || !usuario.id || !token) {
            alert("Usuário não autenticado.");
            window.location.href = "login.html";
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/usuarios/${usuario.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                localStorage.removeItem("token");
                localStorage.removeItem("usuario");
                alert("Perfil deletado com sucesso.");
                window.location.href = "login.html";
            } else {
                const errorData = await response.json();
                alert("Erro ao deletar perfil: " + (errorData.error || "Tente novamente."));
            }
        } catch (error) {
            alert("Erro na requisição: " + error.message);
        }
    }
}
