# Koala Store — reconstrução original

Projeto estático responsivo inspirado na estrutura pública observada em draxx.shop, mas com implementação própria, identidade Koala Store, paleta azul e apenas três categorias/produtos solicitados.

## Conteúdo
- `index.html` — estrutura completa da loja
- `style.css` — layout desktop/mobile, animações e componentes
- `script.js` — rotas, busca, carrinho, quantidades de 1 a 1000, checkout visual e interações
- `assets/koala-logo.jpg` — logo enviada pelo cliente

## Rotas
- `#inicio`
- `#categorias`
- `#destaques`
- `#categoria/assinaturas`
- `#categoria/discord`
- `#categoria/jogos`
- `#login`
- `#checkout`
- `#termos`

## Observação
Os botões de Google/Discord e o checkout Pix são interfaces funcionais no front-end, mas OAuth e cobrança real exigem credenciais/gateway e backend. Não há dependências externas obrigatórias, evitando erros 404 por assets remotos.
