# Emaús — Plataforma da Igreja

Protótipo navegável da Emaús, uma plataforma web/PWA para gestão de visitantes, comunicação, agenda e lideranças. A igreja demonstrada neste protótipo é a Bethesda.

## Como visualizar

Sirva esta pasta com qualquer servidor HTTP local. Exemplo:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Abra `http://localhost:4173`.

## Escopo demonstrado

- Dashboard com indicadores interativos, atividade e próximos eventos; ao clicar em cada indicador o pastor abre seus detalhes;
- Cadastro de visitantes com alerta simulado ao pastor;
- Cadastro de família/grupo com todos os nomes;
- Aba Acolhimento disponível para todos os acessos cadastrados na recepção, com mensagem agrupada por família, casal, amigos ou visitante individual;
- Página própria da recepção em `/recepcao.html` (e `/recepcao/` quando a pasta for preservada), com login demonstrativo e cadastro de visitantes, famílias e casais;
- Classificação de chegada: sozinho, com amigos, em casal ou família;
- Filtros e resumo por forma de chegada para os pastores;
- Modo Púlpito com letras grandes, grupos por forma de chegada e todos os nomes prontos para leitura;
- Preparação automática de um aviso com os nomes dos visitantes para os pastores anunciarem à igreja;
- Marcação dos visitantes já apresentados, evitando repetição no próximo culto;
- Central de comunicação com envio e agendamento;
- Agenda da igreja;
- Gestão de lideranças;
- Configurações da igreja, canais e gestão multi-igreja;
- Personalização por igreja de nome, logo, cores, tema claro/escuro e fonte;
- Permissão separada entre pastor da igreja, equipe de recepção e administrador da plataforma;
- Acessos individuais de recepção com login, senha definida no cadastro e redefinição demonstrativa;
- Backup automático a cada alteração salva, com até 30 versões recentes mantidas no navegador;
- PWA com manifesto e service worker.

O protótipo demonstra dois níveis de acesso: `Pastor da igreja` administra somente a organização ativa (incluindo nome e logo); `Administrador da plataforma` fica responsável por cadastrar igrejas, planos e organizações. Os dados do protótipo são salvos no `localStorage` do navegador. As integrações reais de WhatsApp oficial, push, autenticação, banco de dados, isolamento multi-tenant e cobrança SaaS ainda precisam ser conectadas na etapa de desenvolvimento do produto.


## Acesso demonstrativo da recepção

- Login: `mariana@bethesda.com.br`
- Senha: `123456`

Ao criar um novo acesso em “Acessos da recepção”, o pastor define a senha que será usada para entrar em `recepcao.html`.
