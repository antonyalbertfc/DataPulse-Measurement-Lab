# Consentimento — laboratório DataPulse

Implementação básica para as tags atuais de GA4, em dist/tracking.js.

- GTM-5VQ4GMBG só é inserido quando Analytics foi autorizado.
- Sem escolha, recusa, escolha inválida ou expirada: GTM não carrega.
- Consent default denied é enfileirado antes de qualquer carregamento; com autorização, analytics_storage recebe granted. Publicidade permanece denied.
- Preferência necessária em localStorage (datapulse.consent.v1), validade de 180 dias.
- Salvar recarrega a página, limpa o formulário simulado e não reproduz interações anteriores ao aceite.
- Revogar desabilita a propriedade GA4 antes do reload e remove cookies Analytics acessíveis no domínio e caminho raiz. Não remove dados já enviados nem cookies de outros domínios.
- Preferências podem ser reabertas pelo rodapé; outras abas recarregam ao receber a alteração.
- Fonte externa Google Fonts removida para evitar essa conexão anterior à escolha.
- Não há categoria de marketing ativa. Antes de adicionar tags de mídia, implementar autorização separada e bloqueios correspondentes nos contêineres Web e Server. Consent Mode sozinho não impede toda tag de disparar.

Validação realizada no navegador local:
1. Sem escolha: somente app.js e tracking.js, sem script GTM.
2. Recusa: preferência persistida e GTM ausente.
3. Personalizar e permitir Analytics: scripts GTM e Google tag presentes.
4. Revogar: reload e GTM/Google tag ausentes novamente.
5. Painel revisado em viewport estreito.

Validação complementar no navegador do aluno:
- Fora do Preview, abrir Rede antes de carregar uma sessão nova.
- Sem aceite e após recusa, verificar ausência de gtm.js e requisições collect para Stape/Google.
- Aceitar e conferir consentimento Analytics granted, publicidade denied, e chegada dos eventos.
- Revogar no rodapé e confirmar que novas interações não geram collect.
- Requisições anteriores à revogação podem continuar visíveis em Preserve log; limpar a lista para avaliar novas requisições.

A alteração é nos arquivos locais; nenhum contêiner remoto foi editado nesta etapa.

