# Emaús API para Railway

API inicial da plataforma Emaús, preparada para rodar em um serviço separado no Railway e usar o PostgreSQL do projeto `honest-gentleness`.

## Segurança

Nunca coloque senhas, `JWT_SECRET` ou `service_role` em arquivos públicos. Configure as variáveis privadas no Railway.

## Variáveis obrigatórias

- `DATABASE_URL`: referência ao PostgreSQL do Railway;
- `JWT_SECRET`: chave longa e aleatória;
- `CORS_ORIGIN`: `https://ruggineconsultoria-cyber.github.io`;
- `ADMIN_EMAIL` e `ADMIN_PASSWORD`;
- `PASTOR_EMAIL` e `PASTOR_PASSWORD`;
- `RECEPTION_EMAIL` e `RECEPTION_PASSWORD`.

A API cria as tabelas automaticamente na primeira inicialização, mantém a Bethesda, cria os três planos Emaús e registra auditoria das alterações. A senha do administrador é definida somente pelas variáveis privadas do Railway.

## Rotas principais

- `GET /health` — verificação do serviço;
- `POST /api/auth/login` — login;
- `GET /api/admin/summary` — resumo administrativo;
- `GET /api/admin/churches` — organizações;
- `PATCH /api/admin/churches/:id/status` — bloquear/liberar;
- `GET/PUT /api/admin/plans` — planos e preços;
- `GET/POST /api/admin/expenses` — gastos;
- `GET/POST /api/church/visitors` — visitantes e acolhimento;
- `GET /api/public/church?slug=bethesda` — página pública sem login;
- `GET/PUT /api/church/settings` — identidade e publicação da igreja;
- `GET/POST/PATCH/DELETE /api/church/members` — membros;
- `GET /api/church/events` e `POST /api/church/events/bulk` — agenda e recorrências;
- `GET/POST/PATCH/DELETE /api/church/leaders` — lideranças e cargos.

## Deploy

No Railway, crie um serviço separado chamado `emaus-api`, conecte-o ao diretório deste pacote e configure as variáveis acima. Não altere o serviço privado `glow-platform`.
