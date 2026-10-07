# Manutenção / Maintenance

## Português

### Alterar conteúdo e traduções
O HTML contém o texto-base em português e continua utilizável se a tradução não carregar. dist/i18n.js contém um catálogo explícito: texto-base → pt-BR, en, es. Ao alterar um texto no HTML, atualize a chave correspondente e suas traduções. O catálogo é carregado antes do controle de consentimento e da interface.

A tradução altera nós de texto e atributos acessíveis, sem substituir elementos. Isso preserva referências de eventos, conteúdo digitado, IDs, classes e acionadores. Não use innerHTML para reconstruir o formulário ao trocar idioma. Textos com quebras de linha podem ter entradas separadas. Nomes de marca e termos técnicos podem permanecer iguais.

O padrão é português; uma escolha válida em datapulse.language prevalece no próximo acesso. O idioma não muda o consentimento. Armazenamento indisponível não impede a troca na sessão atual. html.lang, título, descrição, placeholders, rótulos acessíveis e mensagens de validação acompanham o idioma.

### Alterar mensuração
1. Documente o nome e significado do evento antes de implementá-lo.
2. Revise acionadores no contêiner Web e encaminhamento no Server.
3. Não use texto traduzido como seletor. Prefira IDs/classes estáveis.
4. Valide consentimento, duplicidade, destino e parâmetros.
5. Exporte versões sanitizadas dos contêineres quando forem incluídas no repo.
6. Publique os contêineres e registre a versão real, sem inventar evidências.

Não há medição automática de page_language personalizado. O parâmetro language padrão do GA4 não deve ser interpretado como a opção deste seletor. Caso necessário, planeje um parâmetro próprio posteriormente.

### Publicação
Para hospedagem estática, publique apenas dist. Caminhos de recursos são relativos e permitem servir o projeto sob /nome-do-repositorio/. Não existe backend nem etapa de build.

GitHub Pages pode publicar por workflow ou por pasta suportada de uma branch. dist não é selecionável diretamente como pasta de branch: use um workflow para publicar dist, ou coloque o conteúdo em /docs ou na raiz de uma branch dedicada. O workflow .github/workflows/pages.yml valida e publica dist a cada push em main. Ative Settings → Pages → Source: GitHub Actions no repositório antes da primeira implantação. Um workflow preparado não confirma que o site já está publicado.

Após publicar: testar HTTPS, três idiomas, recursos sem 404, consentimento e destino Stape. Atualizar o endereço do fluxo Web no GA4 e revisar regras dependentes de hostname, caso existam. Verificar requisitos vigentes da hospedagem antes de configurar a conta.

### Retomar o projeto
Leia os dois READMEs, ROADMAP e CHANGELOG. Confira a versão publicada real dos contêineres: alterações na interface das plataformas não aparecem automaticamente no Git. Registre problema, critério de aceite e evidência de validação em cada melhoria. Não exponha nomes, e-mails, cookies identificáveis ou tokens em prints públicos.

## English

### Content and translations
The HTML is the Portuguese baseline and remains usable if localization fails. dist/i18n.js maps source copy to pt-BR, en and es. When editing HTML copy, update its matching catalog key and translations. Localization runs before consent and UI initialization.

Translation updates text nodes and accessible attributes in place, preserving entered values, listeners, IDs, classes and triggers. Do not rebuild forms with innerHTML on language changes. Text separated by line breaks may use separate entries. Brand names and technical terms may stay unchanged.

Portuguese is the default; a valid datapulse.language preference is restored on future visits. Language does not grant consent. Switching still works in memory when storage is unavailable. Document language, title, description, placeholders, accessible labels and validation messages follow the selected language.

### Measurement changes
Define event semantics, review Web triggers and Server forwarding, use stable selectors instead of translated text, test consent and duplication, export sanitized container versions when available, and document actual published versions and evidence.

No custom page_language event parameter is implemented. GA4's default language parameter is not a reliable representation of this selector. Plan a separate parameter if needed.

### Deployment
Publish dist as static files. Relative asset paths support project subdirectories. There is no build step or application backend.

For GitHub Pages, use a workflow that uploads dist, or copy its contents to /docs or the root of a dedicated publishing branch. Branch-source settings cannot directly select dist. The .github/workflows/pages.yml workflow validates and publishes dist on each push to main. Enable Settings → Pages → Source: GitHub Actions before the first deployment. A configured workflow is not proof of a live site.

After deployment, verify HTTPS, all languages, missing assets, consent and Stape routing. Update the GA4 Web stream URL and review hostname-dependent rules, if any. Confirm current hosting requirements before setup.

### Returning to the project
Read the README, roadmap and changelog, then inspect the actual published container versions. Remote platform changes do not automatically appear in Git. Record the problem, acceptance criteria and validation evidence for each improvement. Remove personal information and tokens from public screenshots.

