# Deploy no Vercel

Este documento explica, passo a passo, como implantar o projeto `aprendendo-ingles` no Vercel.

## Resumo

- O projeto é uma SPA criada com Vite (React).
- O build produz os arquivos estáticos em `dist/` (comando `npm run build`).
- Já existe `vercel.json` na raiz que usa `@vercel/static-build` e faz o rewrite de todas as rotas para `index.html`.
- `vite.config.js` foi ajustado para usar `process.env.VERCEL ? '/' : '/aprendendo-ingles/'` como `base`.

## Passos rápidos (GUI)

1. Faça push das alterações para o repositório (já feito neste repositório).
2. Acesse https://vercel.com e faça login.
3. Clique em "New Project" e importe o repositório `PaesLeandro/aprendendo-ingles`.
4. Durante a configuração o Vercel normalmente detecta Vite automaticamente. Confirme os campos se necessário:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Finalize a importação; o Vercel iniciará o build e deploy automaticamente.
6. Após o deploy, acesse a URL fornecida pelo Vercel para validar a aplicação.

## Passos via CLI (opcional)

1. Instale a CLI do Vercel (se desejar):
   ```powershell
   npm i -g vercel
   ```
2. No diretório do projeto, rode:
   ```powershell
   vercel login    # autentica sua conta
   vercel          # inicia o deploy interativo
   ```
3. Quando solicitado, confirme o build command e output directory se necessário. A CLI também respeita o `vercel.json`.

## Variáveis e ambiente

- Não é necessário adicionar variáveis de ambiente específicas apenas para o deploy root; o `process.env.VERCEL` é fornecido pelo ambiente do Vercel automaticamente.
- Se no futuro você precisar de chaves (APIs, serviços), adicione-as no painel do projeto em Settings → Environment Variables.

## Notas técnicas e troubleshooting

- SPA: O `vercel.json` já contém uma rota que redireciona tudo para `/index.html`, então navegação no cliente deve funcionar.
- Base do Vite: se você preferir sempre usar a raiz (`/`) e não precisa mais do GitHub Pages, remova a lógica condicional em `vite.config.js` e deixe `base: '/'`.
- Se o build falhar no Vercel, verifique o log do build (Vercel → Deploys → View Build Logs). Erros comuns: dependências nativas faltando, versões de Node incompatíveis. Por padrão Vercel usa uma versão atual do Node.js; você pode fixar a versão no arquivo `package.json` ou no painel do Vercel.

## Como reverter

- Para desfazer as alterações locais basta reverter o commit via git (`git revert <commit>` ou `git checkout -- <arquivo>`). No Vercel, cada push/merge gera um novo deploy; basta promover um deploy anterior se quiser voltar.

## Contato

Se quiser, posso também:

- Adicionar um badge no `README.md` com a URL do deploy.
- Remover a compatibilidade com GitHub Pages (simplificar `vite.config.js`).

---

Arquivo gerado automaticamente pelo assistente.
