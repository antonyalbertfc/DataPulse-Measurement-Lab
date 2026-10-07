# Plano de testes / Test plan

## Matriz / Matrix

| Cenário / Scenario | Resultado esperado / Expected result |
| --- | --- |
| Primeiro acesso / First visit | Português, Analytics bloqueado / Portuguese, Analytics blocked |
| PT → EN → ES → PT | Todos os textos, rótulos e metadados traduzidos / Copy, labels and metadata translated |
| Trocar idioma com formulário preenchido / Switch with filled form | Valores e opções mantidos / Values and selections preserved |
| Recarregar após trocar idioma / Reload after language switch | Idioma restaurado / Language restored |
| Campos vazios / Empty fields | Nenhum sucesso; validação no idioma selecionado / No success; localized validation |
| E-mail inválido / Invalid email | Envio impedido / Submission prevented |
| Envio válido / Valid submission | Confirmação local traduzida / Translated local confirmation |
| Reiniciar / Reset | Campos limpos; idioma mantido / Cleared fields; language retained |
| WhatsApp | Diálogo traduzido, nenhuma mensagem externa / Translated dialog, no external message |
| Recusar Analytics / Reject Analytics | Sem GTM nem novos collect / No GTM or new collect requests |
| Aceitar Analytics / Accept Analytics | GTM carrega; coleta autorizada / GTM loads; collection allowed |
| Revogar / Revoke | Reload; novos envios bloqueados / Reload; new collection blocked |
| Armazenamento indisponível / Storage unavailable | Idioma funciona em memória; Analytics falha fechado / In-memory language; Analytics fails closed |
| Teclado / Keyboard | Seletor, campos e diálogos acessíveis / Accessible selector, fields and dialogs |
| Tela estreita / Narrow screen | Sem rolagem horizontal e controles utilizáveis / No horizontal overflow; usable controls |

## Evidências / Evidence

O usuário validou page_view, scroll, whatsapp_click e generate_lead no fluxo Web → Server → GA4, e confirmou recusa/reautorização de consentimento antes desta mudança de idiomas.
The user validated the Web → Server → GA4 flow and consent rejection/reauthorization before the language change.

A alteração de idiomas mantém IDs/classes e não muda as tags remotas. Isso reduz o risco de quebra, mas não substitui uma nova validação dos contêineres após publicação.
Localization preserves IDs/classes and does not change remote tags. This reduces regression risk but does not replace post-deployment validation.

## Como investigar / Troubleshooting

- Rede / Network: filtrar domain:igiimkju.sab.stape.io e inspecionar en na query ou no corpo do collect.
- GTM Web: selecionar o evento real de clique ou visibilidade, conferir tag e consentimento.
- GTM Server: conferir Client GA4, tag de encaminhamento e resposta do destino.
- GA4 DebugView: comparar a mesma ação e sessão.
- Limpar a lista Rede entre testes; Preserve log inclui tráfego anterior.
- Clean Network between cases; Preserve log can include earlier traffic.
- A mensagem visual de sucesso é simulada; HTTP 204 do GA4 não prova cadastro de lead.
- Simulated UI success and GA4 HTTP 204 do not prove lead persistence.

## Verificações locais / Local checks

```sh
node --check dist/app.js
node --check dist/i18n.js
node --check dist/tracking.js
node tests/i18n.test.cjs
```

## Verificação desta entrega / This delivery verification

- Catálogo completo nos três idiomas e cobertura dos textos HTML: 3 testes automatizados passaram.
- Navegador: PT → EN → ES; campos e opção selecionada preservados; sucesso e cookies em espanhol; idioma persistido após reload; campo obrigatório com mensagem em espanhol.
- WhatsApp demonstrativo em espanhol e navegação móvel em português verificados.
- Inspeção responsiva em 390 px e 820 px; anel decorativo ajustado para evitar transbordamento.
- Full three-language catalog and HTML coverage: 3 automated checks passed.
- Browser checks covered language switching with preserved form values, translated success/cookies/WhatsApp, persistence after reload and localized required-field validation.
- Mobile menu checked; decorative ring constrained after tablet overflow inspection.
- Nenhuma configuração remota GTM/GA4 foi alterada nesta entrega / No remote GTM/GA4 configuration was changed.

