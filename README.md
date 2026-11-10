# Arco Doces — Novo layout (GitHub Pages)

Landing page estática para **Arco Doces**, com visual editorial em tons de creme, laranja e chocolate.

## Recursos

- Layout 100% redesenhado (responsivo para celular e computador)
- Logo e foto do responsável
- Fotos ilustrativas dos **8 sabores**, representando quebra-queixo em formato mais largo e quadrado
- Filtros por tipo de sabor
- Carrinho simples que permite adicionar produtos, ajustar quantidades e escrever observações
- Envio do texto do pedido para **WhatsApp +55 87 99128-6601**, sem pagamento automático
- Link para [Instagram](https://www.instagram.com/quebraqueixo_arcodoces/)
- Funciona apenas com HTML, CSS e JavaScript, sem serviços de hospedagem pagos

## Publicar no GitHub Pages

1. Crie um repositório público, por exemplo `arco-doces`.
2. Extraia este ZIP. Envie **index.html, style.css, script.js, README.md, .nojekyll e a pasta assets** para a raiz do repositório (não envie a pasta externa como um nível extra).
3. Abra **Settings → Pages → Build and deployment**, selecione **Deploy from a branch**, branch `main` e pasta `/(root)`; salve.
4. Seu endereço normalmente será `https://SEU-USUARIO.github.io/arco-doces/`.

## Editar

- **index.html**: textos, seções, nomes dos sabores, botões e links.
- **style.css**: layout, cores e tamanhos de tela.
- **script.js**: lista de sabores, número WhatsApp, carrinho e filtros.
- **assets/**: logo, foto do responsável e fotografias ilustrativas de sabores.

Para atualizar o WhatsApp, troque `5587991286601` no `script.js` e nos links do `index.html`.

**Importante:** O site não tem login, banco de dados ou pagamento online. O pedido só é enviado depois que o cliente clica em **Enviar pedido** e confirma o envio no WhatsApp. Os preços, prazos, entrega e disponibilidade são tratados diretamente no atendimento. As imagens dos produtos são ilustrativas e devem ser substituídas por fotos reais caso necessário.

## Atualização GitHub Pages
Extraia o ZIP e envie **os arquivos da raiz do pacote** (index.html, style.css, script.js, README.md e pasta assets/) para a raiz do repositório. Substitua os antigos. O botão Meu pedido desaparece quando o rodapé está visível, evitando cobrir dados e crédito Dev: Kayko.

Atualização: seção “Nossa história” com moldura de embalagem artesanal, destaque do responsável e identidade visual Arco Doces.


## Atualização extra
- Seção de localização com mapa incorporado e referência “em frente à Caixa Econômica Federal”.
- Texto do endereço sem número visível, com o ponto correto marcado no mapa.
- Destaque para delivery, desconto de 10% ao seguir o Instagram, e formas de pagamento: PIX e dinheiro.
- Ícone do WhatsApp reforçado em links de contato e crédito “Dev: Kayko” linkado.
