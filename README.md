# Manual de IA local · Windows 11

Este projeto ajuda a preparar o computador e a consultar os guias de **LocalGPT, Open WebUI e PrivateGPT**, com o processamento dos modelos no próprio computador. Comece por este ficheiro no navegador. Depois de preparar o Windows, poderá abrir o site do manual em **http://localhost:8080**.

O Docker Compose desta pasta inicia **apenas o manual**. Cada aplicação tem uma instalação independente. Para abrir o manual não precisa de Python, Node.js ou VS Code.

> **Estado dos guias:** existem materiais de referência, mas não uma instalação reproduzível confirmada para as três soluções. As lacunas estão identificadas como **«Por completar com a configuração testada»**. Não avance sobre um passo pendente. O manual não instala aplicações nem verifica automaticamente o computador.

## 1. Antes de começar

- Este percurso destina-se a **Windows 11**, com contentores Linux através de WSL 2. Verifique em **Definições → Sistema → Acerca de** a edição e o tipo de sistema e escolha os instaladores correspondentes.
- Precisa de internet para descarregar Git, WSL, Docker, o repositório e a imagem do manual. As aplicações também precisam de descarregar modelos e dependências antes de poderem funcionar sem internet.
- Confirme a compatibilidade do computador nos [requisitos atuais do Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements). Os requisitos do Docker não garantem capacidade para os modelos: a memória, o espaço e a placa gráfica das três soluções ainda precisam de validação.
- Precisa de autorização de administrador para ativar o WSL. Num computador gerido, peça ajuda ao responsável informático se não tiver essa autorização.
- Guarde o trabalho aberto antes de reiniciar. Reserve tempo para os downloads; a duração depende da ligação e do computador.

**Virtualização:** abra o Gestor de Tarefas com **Ctrl+Shift+Esc**, entre em **Desempenho → CPU** e procure **Virtualização**. Se indicar «Desativada», consulte as instruções do fabricante para o modelo exato do computador ou peça apoio informático. As opções de BIOS/UEFI variam; não altere opções ao acaso. Veja também a [resolução de problemas do WSL](https://learn.microsoft.com/en-us/windows/wsl/troubleshooting#installation-issues).

## 2. Abrir o PowerShell

O PowerShell é uma janela onde escreve instruções, chamadas comandos.

- **Normal:** abra Iniciar, escreva **PowerShell** e escolha **Windows PowerShell**.
- **Administrador:** procure da mesma forma, clique com o botão direito e escolha **Executar como administrador**. Confirme o pedido do Windows. A janela deverá indicar «Administrador» no título.

Copie apenas o texto dentro de cada bloco, cole na janela indicada e prima **Enter**. Aguarde até aparecer novamente a linha onde pode escrever. Não copie as três plicas que delimitam os blocos no ficheiro Markdown. Os comandos não devem ser escritos na barra do navegador nem no terminal Ubuntu. Execute um bloco de cada vez.

## 3. Instalar o Git

Abra a [página oficial do Git para Windows](https://git-scm.com/install/windows), descarregue o instalador adequado ao seu sistema e abra-o. Siga o assistente; se surgir a escolha de acesso pela linha de comandos, mantenha a opção que permite usar Git na linha de comandos e em software de terceiros. Autorize o instalador se o Windows pedir elevação.

**Feche e volte a abrir o PowerShell** para que reconheça o Git instalado.

**Onde:** PowerShell normal, em qualquer pasta. **Administrador:** não. **Resultado esperado:** uma linha começada por `git version`, seguida da versão instalada.

```powershell
git --version
```

Se o Git não for reconhecido, reabra o terminal. Se persistir, confirme a instalação antes de continuar.

## 4. Instalar e verificar o WSL 2

O WSL permite ao Docker usar um ambiente Linux dentro do Windows. Segundo o [guia oficial da Microsoft](https://learn.microsoft.com/en-us/windows/wsl/install), uma instalação nova pode ser feita assim:

**Onde:** PowerShell como administrador, em qualquer pasta. **Administrador:** sim. **Resultado esperado:** instalação dos componentes WSL e, por defeito, Ubuntu; pode ser pedido um reinício.

```powershell
wsl --install
```

**Reinicie o computador depois da instalação.** Se o Ubuntu abrir e pedir um nome de utilizador e uma palavra-passe, crie-os. Ao escrever a palavra-passe, não aparecem caracteres: é normal. Pode depois fechar essa janela e voltar ao PowerShell do Windows. Se o WSL já estiver instalado, verifique-o com os comandos abaixo; não é necessário reinstalá-lo.

**Onde:** PowerShell como administrador, em qualquer pasta. **Administrador:** use esta janela para a atualização. **Resultado esperado:** atualização concluída ou indicação de que já está atualizado. Reinicie se for solicitado.

```powershell
wsl --update
```

**Onde:** PowerShell normal, em qualquer pasta. **Administrador:** não. **Resultado esperado:** versões do WSL e do kernel; o Docker requer WSL 2.1.5 ou posterior na documentação consultada.

```powershell
wsl --version
```

**Onde:** PowerShell normal, em qualquer pasta. **Administrador:** não. **Resultado esperado:** informações gerais, incluindo a versão predefinida.

```powershell
wsl --status
```

**Onde:** PowerShell normal, em qualquer pasta. **Administrador:** não. **Resultado esperado:** distribuições instaladas; a coluna `VERSION` deve indicar `2` para a distribuição usada. `Stopped` significa apenas que está parada.

```powershell
wsl --list --verbose
```

A versão do programa WSL e a coluna `VERSION` das distribuições são coisas diferentes. Se encontrar uma distribuição em versão 1, siga a [conversão oficial para WSL 2](https://learn.microsoft.com/en-us/windows/wsl/basic-commands#set-wsl-version-to-1-or-2), usando o nome real apresentado e fazendo cópia dos dados antes. O Docker pode funcionar a partir do PowerShell sem uma distribuição pessoal instalada; não precisa de criar Ubuntu só para o Docker se já tiver WSL 2 operacional.

## 5. Instalar e abrir o Docker Desktop

1. Abra a [página oficial de instalação para Windows](https://docs.docker.com/desktop/setup/install/windows-install/). Descarregue o instalador adequado ao seu processador.
2. Abra o instalador e siga o assistente. A instalação por utilizador não exige administrador; a instalação para todos os utilizadores exige elevação. Escolha o backend **WSL 2** quando for apresentada essa opção.
3. Reinicie se o instalador pedir. Depois abra **Docker Desktop** no menu Iniciar: a instalação não o inicia necessariamente.
4. Leia as condições apresentadas e aceite-as se forem aplicáveis à sua utilização.
5. Em **Settings → General**, confirme **Use WSL 2 based engine**. Em sistemas onde está ativo por defeito, a opção pode não aparecer. Aplique as alterações. Veja a [configuração oficial do backend WSL 2](https://docs.docker.com/desktop/features/wsl/).
6. Aguarde até o Docker indicar que o motor está em execução. Use contentores Linux; se o menu disponibilizar **Switch to Linux containers**, selecione essa opção e aguarde.

Reabra o PowerShell após a instalação. Não precisa de ativar integração com Ubuntu para executar estes comandos no PowerShell.

## 6. Confirmar que o Docker está pronto

**Onde:** PowerShell normal, em qualquer pasta. **Administrador:** não. **Resultado esperado:** versão do cliente Docker. Isto, por si só, não confirma que o motor esteja a funcionar.

```powershell
docker --version
```

**Onde:** PowerShell normal, em qualquer pasta. **Administrador:** não. **Resultado esperado:** versão do Docker Compose, incluído no Docker Desktop.

```powershell
docker compose version
```

**Onde:** PowerShell normal, em qualquer pasta. **Administrador:** não. **Resultado esperado:** secções `Client` **e** `Server`, sem erro de ligação.

```powershell
docker version
```

Se aparecer apenas `Client` e um erro relativo ao motor, abra o Docker Desktop e aguarde. Não avance enquanto não aparecer também `Server`.

## 7. Descarregar este repositório

**O URL deste manual ainda não está configurado:** a pasta recebida não pertence a um repositório Git. Peça ao responsável o URL real de clonagem e substitua `URL_DO_REPOSITORIO` abaixo. Não use o URL do LocalGPT: é outro projeto. Não inclua palavras-passe ou tokens no comando; utilize o início de sessão pedido pelo Git, se necessário.

No Explorador de Ficheiros, escolha a pasta onde quer guardar o projeto. Clique com o botão direito numa área vazia e escolha **Abrir no Terminal**; confirme que está num separador PowerShell. Evite uma pasta que já tenha outra cópia do projeto.

**Onde:** PowerShell normal, na pasta escolhida para guardar a cópia. **Administrador:** não. **Resultado esperado:** descarga do repositório e criação de uma subpasta cujo nome é indicado pelo Git. **Substitua primeiro o marcador.**

```powershell
git clone "URL_DO_REPOSITORIO"
```

Não se assume um nome para a pasta criada. Abra-a no Explorador e procure `compose.yaml` junto de `README.md` e da pasta `html`. Se o repositório incluir uma pasta `manual`, entre nela. Ative **Ver → Mostrar → Extensões de nomes de ficheiros** se não vir as extensões. Na pasta que contém `compose.yaml`, escolha novamente **Abrir no Terminal** e um separador PowerShell.

**Onde:** PowerShell normal, na pasta do manual acabada de abrir. **Administrador:** não. **Resultado esperado:** o ficheiro `compose.yaml` é listado. Se não for encontrado, volte ao Explorador e escolha a pasta correta.

```powershell
Get-Item .\compose.yaml
```

## 8. Iniciar o manual

**Onde:** PowerShell normal, na pasta que contém o `compose.yaml` deste manual. **Administrador:** não. **Resultado esperado:** configuração aceite, sem mensagem de erro; este comando não inicia serviços.

```powershell
docker compose config --quiet
```

**Onde:** PowerShell normal, na mesma pasta. **Administrador:** não. **Resultado esperado:** download inicial da imagem Nginx e criação/arranque do serviço `manual`.

```powershell
docker compose up -d
```

**Aguarde pelo download inicial.** Não feche o terminal enquanto o comando estiver a trabalhar. Depois de terminar, pode fechar a janela: `-d` deixa o site em segundo plano.

**Onde:** PowerShell normal, na mesma pasta. **Administrador:** não. **Resultado esperado:** serviço `manual` em estado `Up`, com a porta `127.0.0.1:8080` encaminhada para `80`.

```powershell
docker compose ps
```

## 9. Abrir e usar

No navegador, escreva **http://localhost:8080** na barra de endereços. Use `http`, não `https`. Verá três cartões com a opção **Ver guia** e uma página **Ajuda**.

`localhost` significa este computador. O site está vinculado a `127.0.0.1`, pelo que não fica disponível a outros computadores da rede. A apresentação adapta-se a ecrãs pequenos, mas abrir esse endereço num telemóvel aponta para o próprio telemóvel.

O botão **Copiar** apenas coloca texto na área de transferência. Para executar uma instrução, tem de a colar no PowerShell indicado e premir Enter. Os downloads iniciais exigem internet; os ficheiros do manual, já descarregados, são servidos localmente sem CDNs.

## 10. Parar e voltar noutro dia

**Onde:** PowerShell normal, na pasta do `compose.yaml` deste manual. **Administrador:** não. **Resultado esperado:** serviço `manual` parado; o site deixa de responder e os ficheiros permanecem no disco.

```powershell
docker compose stop
```

Noutro dia, abra primeiro o **Docker Desktop** e aguarde pelo motor. No Explorador, volte à pasta deste manual e abra aí o PowerShell.

**Onde:** PowerShell normal, na pasta do `compose.yaml` deste manual. **Administrador:** não. **Resultado esperado:** serviço `manual` novamente em execução; volte a http://localhost:8080.

```powershell
docker compose up -d
```

Estes comandos controlam apenas o manual. As três aplicações têm comandos de paragem próprios nos respetivos guias.

## 11. Problemas de arranque

| O que aparece | O que fazer |
| --- | --- |
| `git` ou `docker` não reconhecido | Feche e reabra o PowerShell após instalar. Confirme que o programa está instalado. |
| `Cannot connect`, `dockerDesktopLinuxEngine` ou erro de pipe | Abra o Docker Desktop e aguarde. Repita a verificação do motor da secção 6. |
| WSL desatualizado | Faça a atualização da secção 4 e reinicie se for pedido. |
| Virtualização indisponível ou erro `0x80370102` | Verifique Desempenho → CPU no Gestor de Tarefas. Consulte o fabricante e a resolução de problemas oficial do WSL ligada acima. |
| `no configuration file provided` | Abra o PowerShell na pasta que contém o `compose.yaml` deste manual. |
| `port is already allocated`, `address already in use` ou acesso à porta recusado | A porta 8080 pode estar ocupada ou reservada. Identifique a aplicação com apoio informático e feche-a normalmente se for sua. Não termine processos desconhecidos. Mantenha a porta do manual em 8080. |
| Falha ao descarregar a imagem | Confirme internet, proxy/VPN e mensagens do Docker; tente novamente o arranque da secção 8 após corrigir a ligação. |
| Erro sobre contentores Windows ou plataforma incompatível | Use contentores Linux no Docker Desktop. |
| `403`, `404` ou página padrão do Nginx | Confirme que `html/index.html` está junto ao Compose na estrutura abaixo. Não mova apenas o `compose.yaml`. |
| Página não abre | Confirme endereço HTTP, motor ativo e estado do serviço. Consulte os registos abaixo. |

**Onde:** PowerShell normal, na pasta do `compose.yaml` deste manual. **Administrador:** não. **Resultado esperado:** últimas mensagens do Nginx, úteis para enviar ao responsável; não inicia nem repara o serviço.

```powershell
docker compose logs --tail 50 manual
```

## Estrutura e manutenção

```text
manual/
├── README.md
├── compose.yaml
├── VALIDACAO.md
└── html/
    ├── index.html
    ├── localgpt.html
    ├── openwebui.html
    ├── privategpt.html
    ├── ajuda.html
    └── assets/
        ├── css/style.css
        ├── js/main.js
        └── img/.gitkeep
```

HTML, CSS e JavaScript simples, sem build, backend ou bibliotecas externas. O Compose usa a [imagem oficial Nginx](https://hub.docker.com/_/nginx), com versão explícita `1.30.5-alpine`, e monta `html` apenas para leitura. A pasta de imagens está reservada, sem screenshots fictícios. O nome do projeto Compose é `manual-llm-local`.

### Proveniência e informação em falta

Inspeção em **25/09/2026**: a pasta `manual` estava vazia; os materiais abaixo estavam em pastas vizinhas e foram apenas lidos, não alterados nem incorporados como dependências. Os caminhos são referências para o autor, não ficheiros que o cliente tenha de possuir para abrir este site.

- `../LocalGPT/localGPT/`: Compose, documentação Docker, notas de correções e componentes da interface. Identificam o projeto PromtEngineer/localGPT, mas não um commit de entrega. O Compose atual difere do exemplo em modelos e armazenamento.
- `../Exemplo/TP1_IS_Entrega/README.md`: receitas e resultados declarados das três soluções; não constituem uma execução verificada nesta entrega.
- `../Exemplo/TP1_IS_Entrega/stacks/privategpt_settings-tp1.yaml`: contém modos base diferentes da receita Ollama. Não foi copiado para o manual: falta reconciliar o perfil efetivo estritamente local.

Para concluir os guias, fornecer:

| Solução | Dados necessários |
| --- | --- |
| Manual | URL real do repositório a publicar e localização de `manual` nesse repositório. |
| LocalGPT | Commit/pacote com as correções, configuração efetiva sem segredos, modelos definitivos, instalação Ollama e ligação contentor→Windows testadas, hardware, formatos/documentos e teste de indexação/pergunta. |
| Open WebUI | Versão fixa da imagem, comando/Compose testado com persistência e acesso local, configuração Ollama/embeddings, passos exatos da interface para Knowledge e contexto, teste após reinício. |
| PrivateGPT | Versão/imagem confirmada, perfil e ficheiro final exclusivamente local, montagem de configurações e dados, modelos, porta sem conflito com LocalGPT, sequência de ingestão e teste após reinício. |

Para todas: RAM, CPU/GPU, espaço, tempos observados e um documento de teste não confidencial com resultado esperado. Não envie chaves, palavras-passe ou documentos privados para preencher o manual.

### Fontes oficiais e validação

Os links oficiais de Git, Microsoft WSL, Docker Windows e backend WSL 2 nas secções acima foram consultados em **25/09/2026**. As instruções de preparação foram confrontadas com essas fontes. Isto não equivale a uma instalação de raiz executada neste computador. Veja [VALIDACAO.md](VALIDACAO.md) para os testes efetivamente realizados e as limitações.
