# MEI no Controle — site de vendas (Next.js)

Página de vendas da **Planilha Financeira para MEI 2027**, feita em Next.js 15 (App Router + TypeScript), pronta para publicar na Vercel.

## Publicar na Vercel (cerca de 10 minutos)

1. Crie um repositório no GitHub e envie esta pasta:
   ```bash
   git init
   git add .
   git commit -m "Site MEI no Controle"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/mei-no-controle.git
   git push -u origin main
   ```
2. Em [vercel.com/new](https://vercel.com/new), clique em **Import** no repositório. A Vercel detecta o Next.js sozinha.
3. Antes de clicar em **Deploy**, abra **Environment Variables** e cadastre as variáveis da tabela abaixo (no mínimo `NEXT_PUBLIC_SITE_URL` e `CHECKOUT_URL`).
4. Clique em **Deploy**.
5. Em **Settings › Domains**, conecte o seu domínio (ex.: `www.meinocontrole.com.br`) e atualize `NEXT_PUBLIC_SITE_URL` com ele. Depois, faça um **Redeploy**.

> Sempre que alterar uma variável na Vercel, faça um **Redeploy** para ela valer no site.

## Variáveis de ambiente

| Variável | O que faz | Exemplo |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Endereço final do site (SEO, sitemap, robots) | `https://www.meinocontrole.com.br` |
| `CHECKOUT_URL_PROMO` | **Link de compra da oferta**, usado até o fim da oferta | `https://pay.cakto.com.br/LINK-OFERTA` |
| `CHECKOUT_URL` | **Link de compra normal**, usado depois do fim da oferta | `https://pay.cakto.com.br/LINK-NORMAL` |
| `NEXT_PUBLIC_PRECO_DE` | Preço normal (riscado durante a oferta, vigente depois) | `67` |
| `NEXT_PUBLIC_PRECO_POR` | Preço da oferta | `47` |
| `NEXT_PUBLIC_FIM_OFERTA` | Fim da oferta, horário de Brasília | `2026-11-30T23:59:59-03:00` |
| `NEXT_PUBLIC_EMPRESA` | Nome ou razão social (rodapé e política) | `Maria Souza ME` |
| `NEXT_PUBLIC_CNPJ` | CNPJ | `00.000.000/0001-00` |
| `NEXT_PUBLIC_EMAIL_SUPORTE` | E-mail de atendimento | `contato@meinocontrole.com.br` |
| `NEXT_PUBLIC_PLATAFORMA_PAGAMENTO` | Nome da plataforma na política de privacidade | `Kiwify` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (opcional) | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Pixel da Meta (opcional) | `123456789012345` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Verificação do Search Console por meta tag (opcional) | `abc123...` |

O arquivo `.env.example` tem todas elas com comentários.

## Link de compra: `/comprar`

Todos os botões apontam para **`seusite.com.br/comprar`**, que escolhe o link certo na hora do clique:

- **Até `NEXT_PUBLIC_FIM_OFERTA`** (padrão: 30/11/2026 às 23:59:59, horário de Brasília) → `CHECKOUT_URL_PROMO`
- **Depois disso** → `CHECKOUT_URL`

A página acompanha a virada sozinha, sem novo deploy: o "de/por", o selo de Black Friday e a contagem regressiva somem, e o preço passa a ser o `NEXT_PUBLIC_PRECO_DE`. Quem estiver com a página aberta à meia-noite vê a troca na hora; a versão que o Google lê é atualizada em até 10 minutos.

Se só um dos dois links estiver preenchido, ele é usado o tempo todo.

- Funciona com **Kiwify, Hotmart, Eduzz, Shopify, Mercado Pago** ou qualquer link `https://`.
- Para trocar de plataforma, basta alterar os links na Vercel e fazer o redeploy. Nenhum código muda.
- Os parâmetros de campanha são repassados ao checkout: `utm_*`, `src`, `sck`, `xcod`, `fbclid`, `gclid`, `ttclid`. Assim você sabe de qual post ou anúncio veio cada venda.
- Use `/comprar` direto na bio do Instagram, em e-mails e em anúncios. Ex.: `https://www.meinocontrole.com.br/comprar?utm_source=instagram&utm_medium=bio`
- Se nenhum link estiver preenchido, os botões levam para a seção de preço.

## SEO e indexação

Já incluído:

- Título, descrição e palavras-chave por página (Metadata API do Next.js)
- URL canônica, Open Graph e Twitter Card com imagem de compartilhamento (`app/opengraph-image.jpg`)
- `robots.txt` e `sitemap.xml` gerados automaticamente a partir de `NEXT_PUBLIC_SITE_URL`
- Dados estruturados (JSON-LD): Organização, Site, Produto com preço e Perguntas frequentes
- Favicon, ícone para celular e manifest
- Imagens otimizadas pelo `next/image` (WebP/AVIF, tamanhos responsivos) e fontes hospedadas no próprio site
- HTML semântico, títulos em hierarquia e textos alternativos nas imagens

Para aparecer no Google:

1. Acesse o [Google Search Console](https://search.google.com/search-console) e adicione o seu domínio.
2. Confirme a propriedade pelo DNS (recomendado) ou pela variável `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
3. Em **Sitemaps**, envie `sitemap.xml`.
4. Em **Inspeção de URL**, informe o endereço do site e clique em **Solicitar indexação**.

A primeira indexação costuma levar de alguns dias a algumas semanas.

## Medição e LGPD

Se `NEXT_PUBLIC_GA_ID` ou `NEXT_PUBLIC_META_PIXEL_ID` estiverem preenchidos, o site mostra um aviso de cookies e só carrega a medição depois que o visitante aceita. O clique em comprar é registrado como `begin_checkout` (Google) e `InitiateCheckout` (Meta). A política de privacidade fica em `/politica-de-privacidade`.

## Rodar no computador

Requer Node.js 18.18 ou superior.

```bash
cp .env.example .env.local   # preencha os valores
npm install
npm run dev                  # http://localhost:3000
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Textos das listas, módulos e perguntas frequentes | `lib/content.ts` |
| Demais textos da página | `app/page.tsx` |
| Visual (cores, espaçamentos, animações) | `app/globals.css` |
| Imagens dos módulos | `public/img/` |
| Imagem de compartilhamento | `app/opengraph-image.jpg` e `app/twitter-image.jpg` (1200 × 630) |
