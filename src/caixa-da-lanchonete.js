class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        const cardapio = {
            cafe: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.50, extra: 'cafe' },
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduíche", valor: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00, extra: 'sanduiche' },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
        };

        const formasDePagamento = ['dinheiro', 'debito', 'credito'];

        let valorTotal = 0;
        const itensExtras = new Set();
        
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }
        
        if (!formasDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            itensExtras.add(codigo);

            if (!cardapio[codigo]) {
                return "Item inválido!";
            }
            
            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            if (cardapio[codigo].extra) {
                if (!itensExtras.has(cardapio[codigo].extra)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }

            valorTotal += cardapio[codigo].valor * quantidade;
        }

        if (metodoDePagamento === 'dinheiro') {
            valorTotal -= valorTotal * 0.05;
        } else if (metodoDePagamento === 'credito') {
            valorTotal += valorTotal * 0.03;
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }

}

export { CaixaDaLanchonete };
