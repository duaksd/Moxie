// Arquivo: js/finalizar-compra.js
(() => {
    // Funções utilitárias
    function formatarPreco(valor) {
      return "R$ " + valor.toFixed(2).replace(".", ",");
    }
  
    function carregarCarrinho() {
      const dados = localStorage.getItem("carrinho");
      return dados ? JSON.parse(dados) : [];
    }
  
    function salvarCarrinho(carrinho) {
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
  
    // Inicialização de variáveis e elementos
    const enderecoMostrar = document.getElementById("mostrar-endereco");
    const btnAlterarEndereco = document.getElementById("btn-alterar-endereco");
    const formEndereco = document.getElementById("form-endereco");
  
    const produtosLista = document.getElementById("produtos-lista");
    const inputCupom = document.getElementById("input-cupom");
    const btnAplicarCupom = document.getElementById("aplicar-cupom");
    const mensagemCupom = document.getElementById("mensagem-cupom");
  
    const subtotalEl = document.getElementById("subtotal-produtos");
    const freteEl = document.getElementById("frete-valor");
    const descontoEl = document.getElementById("desconto-valor");
    const totalPagarEl = document.getElementById("total-pagar");
  
    const formPagamento = document.getElementById("form-pagamento");
    const msgResultado = document.getElementById("mensagem-resultado");
  
    // Lista cupons com % desconto
    const cupons = {
      "DESCONTO10": 0.1,
      "DESCONTO20": 0.2,
      "FRETEGRATIS": 0,
    };
  
    // Carregar cupom e desconto do localStorage, se houver
    let descontoAplicado = 0;
    let cupomAtivo = null;
    const cupomStorage = JSON.parse(localStorage.getItem("cupomAplicado"));
    if (cupomStorage && typeof cupomStorage.cupom === "string" && cupons.hasOwnProperty(cupomStorage.cupom)) {
      descontoAplicado = cupons[cupomStorage.cupom];
      cupomAtivo = cupomStorage.cupom;
      // Mostra mensagem de cupom aplicado ao carregar a página
      mensagemCupom.textContent = "Cupom aplicado: " + cupomAtivo;
      mensagemCupom.classList.add("sucesso");
    }
  
    // Dados do endereço (inicializar vazio ou de localStorage)
    let enderecoDados = JSON.parse(localStorage.getItem("enderecoDados")) || {
      cep: "12345-678",
      endereco: "Rua Exemplo, 123",
      numero: "45",
      complemento: "Apto 101",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
    };
  
    // Renderiza o endereço na tela
    function renderizarEndereco() {
      enderecoMostrar.innerHTML = `
        <div class="endereco-titulo">Endereço Atual</div>
        <div class="endereco-detalhes">
          <p><strong>CEP:</strong> ${enderecoDados.cep}</p>
          <p><strong>Endereço:</strong> ${enderecoDados.endereco}, Nº ${enderecoDados.numero}</p>
          <p><strong>Complemento:</strong> ${enderecoDados.complemento || '-'}</p>
          <p><strong>Bairro:</strong> ${enderecoDados.bairro}</p>
          <p><strong>Cidade:</strong> ${enderecoDados.cidade} - ${enderecoDados.estado}</p>
        </div>
      `;
    }
    renderizarEndereco();
  
    // Preenche o formulário com os dados atuais do endereço
    function preencherFormularioEndereco() {
      formEndereco.cep.value = enderecoDados.cep;
      formEndereco.endereco.value = enderecoDados.endereco;
      formEndereco.numero.value = enderecoDados.numero;
      formEndereco.complemento.value = enderecoDados.complemento || "";
      formEndereco.bairro.value = enderecoDados.bairro;
      formEndereco.cidade.value = enderecoDados.cidade;
      formEndereco.estado.value = enderecoDados.estado;
    }
  
    // Alterna exibição do formulário de endereço
    btnAlterarEndereco.addEventListener("click", () => {
      const aberto = formEndereco.style.display === "block";
      if (aberto) {
        formEndereco.style.display = "none";
        btnAlterarEndereco.setAttribute("aria-expanded", "false");
      } else {
        preencherFormularioEndereco();
        formEndereco.style.display = "block";
        btnAlterarEndereco.setAttribute("aria-expanded", "true");
        formEndereco.querySelector("input").focus();
      }
    });
  
    // Salvar endereço do formulário
    formEndereco.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!formEndereco.checkValidity()) {
        formEndereco.reportValidity();
        return;
      }
      enderecoDados = {
        cep: formEndereco.cep.value.trim(),
        endereco: formEndereco.endereco.value.trim(),
        numero: formEndereco.numero.value.trim(),
        complemento: formEndereco.complemento.value.trim(),
        bairro: formEndereco.bairro.value.trim(),
        cidade: formEndereco.cidade.value.trim(),
        estado: formEndereco.estado.value,
      };
      localStorage.setItem("enderecoDados", JSON.stringify(enderecoDados));
      renderizarEndereco();
      formEndereco.style.display = "none";
      btnAlterarEndereco.setAttribute("aria-expanded", "false");
    });
  
    // Renderiza os produtos do carrinho
    function renderizarProdutos() {
      const carrinho = carregarCarrinho();
      produtosLista.innerHTML = "";
      let subtotal = 0;
  
      if(carrinho.length === 0){
        produtosLista.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#777;">Seu carrinho está vazio.</td></tr>';
        return subtotal;
      }
  
      carrinho.forEach(item => {
        const precoNum = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
        const totalItem = precoNum * (item.quantidade || 1);
        subtotal += totalItem;
  
        produtosLista.innerHTML += `
          <tr>
            <td class="produto-info">
              <img src="${item.imagem}" alt="${item.alt || item.nome}" />
              <span class="nome-produto">${item.nome}</span>
            </td>
            <td>${formatarPreco(precoNum)}</td>
            <td>${item.quantidade || 1}</td>
            <td>${formatarPreco(totalItem)}</td>
          </tr>`;
      });
      return subtotal;
    }
  
    // Cálculo do frete fixo ou gratuito
    function calcularFrete() {
      // Para fins do exemplo:
      // frete grátis para subtotal acima de 150 ou se cupom FRETEGRATIS válido
      if (descontoAplicado === 0 && cupomAtivo === "FRETEGRATIS") return 0;
      if (subtotalAtual >= 150) return 0;
      return 20.00;
    }
  
    // Atualiza todos os totais na tela
    let subtotalAtual = 0;
    function atualizarTotais() {
      subtotalAtual = renderizarProdutos();
      subtotalEl.textContent = formatarPreco(subtotalAtual);
  
      const frete = calcularFrete();
      freteEl.textContent = frete === 0 ? "Grátis" : formatarPreco(frete);
  
      const descontoValor = descontoAplicado * subtotalAtual;
      descontoEl.textContent = descontoValor > 0 ? "- " + formatarPreco(descontoValor) : "- R$ 0,00";
  
      const total = subtotalAtual + frete - descontoValor;
      totalPagarEl.textContent = formatarPreco(total > 0 ? total : 0);
    }
  
    atualizarTotais();
  
    // Aplica cupom
    btnAplicarCupom.addEventListener("click", () => {
      const cupom = inputCupom.value.trim().toUpperCase();
  
      if(!cupom) {
        mensagemCupom.textContent = "Digite um cupom";
        mensagemCupom.classList.remove("sucesso");
        return;
      }
  
      if (cupons[cupom] !== undefined) {
        descontoAplicado = cupons[cupom] || 0;
        cupomAtivo = cupom;
        mensagemCupom.textContent = "Cupom aplicado com sucesso!";
        mensagemCupom.classList.add("sucesso");
        inputCupom.value = "";
        // Salva cupom e desconto no localStorage
        localStorage.setItem("cupomAplicado", JSON.stringify({ cupom }));
        atualizarTotais();
      } else {
        descontoAplicado = 0;
        cupomAtivo = null;
        mensagemCupom.textContent = "Cupom inválido!";
        mensagemCupom.classList.remove("sucesso");
        // Remove cupom do localStorage se inválido
        localStorage.removeItem("cupomAplicado");
        atualizarTotais();
      }
    });
  
    // Finalizar compra
    formPagamento.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!formPagamento.checkValidity()) {
        formPagamento.reportValidity();
        return;
      }
      if (subtotalAtual === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }
  
      const metodoPagamento = formPagamento.pagamento.value;
  
      // Dados básicos para apresentar
      const resumo = `
        Compra finalizada com sucesso!\n
        Endereço: ${enderecoDados.endereco}, Nº ${enderecoDados.numero}, ${enderecoDados.bairro} - ${enderecoDados.cidade}/${enderecoDados.estado}\n
        Total a pagar: ${totalPagarEl.textContent}\n
        Forma de pagamento: ${metodoPagamento.charAt(0).toUpperCase() + metodoPagamento.slice(1)}\n
      `;
      msgResultado.textContent = resumo;
      msgResultado.style.display = "block";
  
      // Limpar carrinho e cupom
      localStorage.removeItem("carrinho");
      descontoAplicado = 0;
      cupomAtivo = null;
      localStorage.removeItem("cupomAplicado"); // Limpa cupom do localStorage
      atualizarTotais();
      produtosLista.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#777;">Seu carrinho está vazio.</td></tr>';
  
      // Limpa cupom e seleção pagamento
      inputCupom.value = "";
      mensagemCupom.textContent = "";
      formPagamento.reset();
    });
  
  })();

