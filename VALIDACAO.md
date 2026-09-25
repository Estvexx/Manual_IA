# Validação do manual

Data: **25/09/2026**. Este registo refere-se ao site de documentação. Não certifica a instalação das três aplicações nem o funcionamento dos respetivos modelos.

## Verificações realizadas

| Verificação | Resultado |
| --- | --- |
| Inspeção prévia | A pasta `manual` estava vazia e não pertencia a um repositório Git. Foram lidos materiais nas pastas vizinhas LocalGPT e Exemplo, sem os modificar. |
| Fontes oficiais | Consultadas as páginas de Git para Windows, instalação e comandos WSL, Docker Desktop para Windows e backend WSL 2, ligadas no README. Consultadas também as referências Nginx, Ollama, Open WebUI e PrivateGPT indicadas no site. |
| Ficheiros e ligações | Cinco páginas HTML; 98 referências locais a páginas, fragmentos e recursos verificadas. Sem destinos em falta nem identificadores HTML duplicados. As ligações externas não foram todas testadas automaticamente. |
| Estrutura das páginas | Idioma `pt-PT`, um título principal por página, cinco ligações de navegação comuns e botões de cópia em todos os blocos de comandos. Os guias têm nove secções e índices correspondentes. |
| Apresentação responsiva | Chrome sem janela, larguras de 1440, 390 e 320 píxeis: 15 combinações página/largura sem transbordo horizontal. Inspeção visual das capturas da página inicial em computador e do guia LocalGPT em formato móvel. Trata-se de emulação no navegador, não de testes num telemóvel físico. |
| Área de transferência | Os 16 botões copiaram o texto exato de cada comando. Uma ativação adicional por Enter também copiou corretamente: 17 verificações de sucesso. |
| Cópia recusada | Recusa simulada da API de área de transferência: o comando foi selecionado e apareceu a instrução para usar Ctrl+C, com região de estado acessível. |
| Teclado | A primeira tabulação alcançou «Saltar para o conteúdo». Botão de cópia ativado por Enter, com foco mantido e contorno visível. Não foi realizada uma auditoria completa com leitor de ecrã. |
| Sem JavaScript | Navegação e comandos continuaram visíveis na página Ajuda, sem botões de cópia inativos. |
| Erros JavaScript | Nenhuma exceção de execução durante o ensaio final. |
| Docker Compose | Configuração aceite pelo Docker Compose v5.5.1. A saída normalizada confirmou um único serviço `manual`, imagem `nginx:1.30.5-alpine`, porta publicada apenas em `127.0.0.1` e montagem de HTML apenas para leitura. |
| HTTP do conteúdo | As cinco páginas responderam com HTTP 200 através de um servidor estático temporário de teste em `127.0.0.1:18080`. Este teste verifica o conteúdo; não valida o Nginx. |

O servidor temporário e o navegador foram encerrados no fim. As ferramentas de teste não são necessárias para utilizar o manual; não há dependências de Node.js, Python ou ferramentas de build no projeto entregue.

## Verificação impedida pelo ambiente

**Atualização da porta do manual:** a configuração passou para `127.0.0.1:18080:80`. A alteração foi aceite por `docker compose config --quiet` e confirmada na saída normalizada do Compose. README e referências do site foram atualizados. Não foi repetido o teste de arranque/HTTP do Nginx nesta alteração; o ensaio HTTP temporário descrito acima é independente.

Foi tentado o arranque pelo Compose do manual. O cliente Docker estava instalado, mas a ligação ao motor Linux falhou porque o pipe `dockerDesktopLinuxEngine` não estava disponível. Por isso:

- Não foi possível confirmar o download da imagem nem o arranque do Nginx.
- Não foi obtida uma resposta HTTP do serviço Compose em `http://localhost:18080`.
- Os testes HTTP e de navegador acima usaram o servidor temporário, não o Docker.

Para concluir esta verificação, abra Docker Desktop, aguarde pelo motor e siga as secções 6, 8 e 9 do README. Confirme o serviço em execução e a página inicial em `http://localhost:18080`; depois siga a paragem e o novo arranque da secção 10.

## Guias que precisam de informação adicional

- **LocalGPT:** commit/pacote com as correções locais, modelos e configuração efetiva, capacidade do hardware, ligação ao Ollama, indexação e primeira pergunta testadas. Os comandos documentados da cópia existente não foram executados nesta entrega.
- **Open WebUI:** versão fixa da imagem, instalação com persistência, modelos e embeddings locais, sequência exata de Knowledge/contexto e teste após reinício. A receita com etiqueta `main` não foi apresentada como instalação final.
- **PrivateGPT:** reconciliação do ficheiro base com o perfil exclusivamente local, versão/imagem, armazenamento, porta sem conflito, ingestão e teste após reinício. Não foi publicada uma configuração final presumida.
- **Repositório do manual:** URL de clonagem ainda por fornecer; o README contém um marcador explícito.

Nenhuma destas aplicações foi instalada, modificada ou executada durante a criação do manual. As etapas em falta estão assinaladas no site como **«Por completar com a configuração testada»**.
