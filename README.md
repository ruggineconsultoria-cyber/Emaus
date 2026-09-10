# Emaús — Plataforma da Igreja

A Emaús é uma plataforma multi-igreja para acolhimento, visitantes, comunicação, agenda e administração central. A Bethesda continua cadastrada como a primeira igreja da plataforma.

## Produção atual

- Frontend: GitHub Pages;
- API: Railway;
- Banco: PostgreSQL no projeto Railway `honest-gentleness`;
- API pública: `https://attractive-spontaneity-production-0af5.up.railway.app`;
- Verificação: `GET /health`;
- Service worker: `emaus-shell-v32`.

As senhas e chaves ficam somente nas variáveis privadas do Railway. Nunca coloque credenciais em arquivos do GitHub.

## Acessos de produção

- Administrador da plataforma: e-mail configurado em `ADMIN_EMAIL` e senha configurada em `ADMIN_PASSWORD`, em `/admin.html`;
- Pastor da Bethesda: e-mail configurado em `PASTOR_EMAIL` e senha configurada em `PASTOR_PASSWORD`, na página principal;
- Recepção: e-mail configurado em `RECEPTION_EMAIL` e senha configurada em `RECEPTION_PASSWORD`, em `/recepcao.html`.

As senhas não são documentadas neste arquivo.

## Oferta comercial mantida

- 30 dias grátis;
- Essencial: R$ 49,90/mês, até 100 pessoas ativas e 5 acessos;
- Cuidado: R$ 99,90/mês, até 300 pessoas ativas e 12 acessos;
- Rede: R$ 179,90/mês, até 800 pessoas ativas e 25 acessos;
- primeiras 40 igrejas com preço congelado por 12 meses;
- nenhuma cobrança adicional;
- nenhum sistema de créditos.

## Desenvolvimento

A API usa Node.js, Express e PostgreSQL. `server.js`, `schema.sql` e `package.json` na raiz são usados pelo Railway. O banco cria as tabelas e mantém a Bethesda na primeira inicialização.

O frontend usa `api-config.js` apenas para o endereço público da API. Não inclua senhas nesse arquivo.
