# Manual de IA local · Windows 11

Guias de **LocalGPT, Open WebUI e PrivateGPT**, com modelos locais. Os passos abaixo abrem o site do manual em **http://localhost:18080**; cada aplicação é instalada depois, pelo respetivo guia.

> As etapas ainda não validadas estão assinaladas nos guias como **«Por completar com a configuração testada»**.

## 1. Antes de começar

Precisa de **Windows 11**, internet para os downloads e acesso de administrador para instalar o WSL.

No **Gestor de Tarefas → Desempenho → CPU**, confirme **Virtualização: Ativada**. Se estiver desativada, consulte as instruções do fabricante do computador.

## 2. Abrir o PowerShell

- **Normal:** Iniciar → escrever **PowerShell** → abrir.
- **Administrador:** botão direito em PowerShell → **Executar como administrador** → confirmar.

**Por defeito, os comandos são executados no PowerShell normal, sem administrador, em qualquer pasta.** As exceções estão indicadas. Cole um comando de cada vez, prima **Enter** e aguarde que termine.

## 3. Instalar o Git

```powershell
winget install --id Git.Git -e --source winget
```

Se forem apresentados termos, leia-os e confirme se concordar. Autorize a instalação se o Windows pedir. **Resultado:** Git instalado.

**Feche e reabra o PowerShell**, depois confirme:

```powershell
git --version
```

Deve aparecer `git version` seguido da versão.

## 4. Instalar o WSL 2

Abra o **PowerShell como administrador** e execute:

```powershell
wsl --install
```

**Resultado:** instalação do WSL e, por defeito, Ubuntu. **Guarde o trabalho e reinicie o computador.**

Se o Ubuntu pedir um utilizador e uma palavra-passe, crie-os. A palavra-passe não aparece enquanto escreve; é normal. Depois feche essa janela.

Volte ao **PowerShell como administrador** para atualizar:

```powershell
wsl --update
```

**Resultado:** WSL atualizado ou já na versão mais recente. Reinicie se for pedido.

Abra agora o **PowerShell normal** e verifique:

```powershell
wsl --version
wsl --list --verbose
```

O primeiro mostra a versão do WSL; o segundo deve mostrar `2` na coluna `VERSION` do Ubuntu. `Stopped` é normal. Se já tinha WSL instalado, basta atualizar e verificar.

## 5. Instalar o Docker Desktop

```powershell
winget install --id Docker.DockerDesktop -e --source winget
```

**Resultado:** Docker Desktop instalado. Confirme os pedidos de instalação e reinicie se for solicitado.

1. Abra **Docker Desktop** pelo menu Iniciar e aceite os termos se concordar.
2. Se for perguntado, escolha **WSL 2**. Em **Settings → General**, confirme **Use WSL 2 based engine**; a opção pode estar ativa por defeito e não aparecer.
3. Use contentores Linux: se aparecer **Switch to Linux containers** no menu do Docker, selecione.
4. **Aguarde pelo motor em execução** e reabra o PowerShell.

## 6. Confirmar o Docker

```powershell
docker version
docker compose version
```

O primeiro deve mostrar **Client e Server**, sem erro. O segundo mostra a versão do Compose. Se faltar `Server`, abra o Docker Desktop e aguarde antes de continuar.

## 7. Clonar o repositório

No Explorador, abra a pasta onde quer guardar o projeto. Botão direito numa zona vazia → **Abrir no Terminal** → separador PowerShell **normal**.

```powershell
git clone https://github.com/Estvexx/Manual_IA.git
cd .\Manual_IA
```

**Resultado:** o primeiro comando descarrega o projeto para `Manual_IA`; o segundo entra nessa pasta, onde está o `compose.yaml`. Se o Git pedir autenticação, siga o início de sessão apresentado.

## 8. Iniciar o manual

No **PowerShell normal, dentro de `Manual_IA`**, execute:

```powershell
docker compose up -d
```

**Resultado:** imagem descarregada e serviço `manual` iniciado. **Aguarde pelo download inicial.** Quando terminar, confirme na mesma janela:

```powershell
docker compose ps
```

Deve aparecer o serviço `manual` em estado **Up**, com a porta `127.0.0.1:18080`. Pode fechar o terminal.

## 9. Abrir o manual

Abra **http://localhost:18080** no navegador e escolha **Ver guia** na solução pretendida.

O endereço funciona apenas neste computador. O botão **Copiar** copia o comando; para o executar, cole-o no PowerShell indicado e prima Enter.

## 10. Parar e voltar noutro dia

No **PowerShell normal, na pasta `Manual_IA`**, pare o site:

```powershell
docker compose stop
```

**Resultado:** site parado, sem apagar os ficheiros.

Noutro dia, abra **Docker Desktop**, aguarde pelo motor e abra o PowerShell normal na mesma pasta. Execute:

```powershell
docker compose up -d
```

**Resultado:** site novamente disponível em **http://localhost:18080**.

## 11. Se algo falhar

| Problema                          | Solução                                                                                                                                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `winget` não reconhecido          | Instale ou atualize **Instalador de Aplicações / App Installer** na Microsoft Store e reabra o PowerShell.                                                 |
| `git` ou `docker` não reconhecido | Reabra o PowerShell depois da instalação.                                                                                                                  |
| Erro de ligação ao Docker         | Abra Docker Desktop e aguarde pelo motor.                                                                                                                  |
| Erro de WSL ou virtualização      | Reveja os passos 1 e 4; consulte a [ajuda oficial do WSL](https://learn.microsoft.com/en-us/windows/wsl/troubleshooting#installation-issues) se persistir. |
| `no configuration file provided`  | Abra o terminal na pasta que contém `compose.yaml`.                                                                                                        |
| Porta 18080 ocupada                | Feche normalmente a aplicação que usa essa porta, se a reconhecer; caso contrário, peça apoio.                                                             |
| Falha no download                 | Verifique internet, proxy/VPN e repita o arranque.                                                                                                         |
| Página não abre ou mostra erro    | Confirme o endereço HTTP, o Docker ativo e a presença de `html/index.html` no projeto.                                                                     |

Para consultar o erro, no **PowerShell normal, na pasta `Manual_IA`**:

```powershell
docker compose logs --tail 50 manual
```

**Resultado:** últimas mensagens do serviço, para ajudar a identificar o problema.

---

**Fontes consultadas em 25/09/2026:** [Git](https://git-scm.com/install/windows), [WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/), [pacote Docker no catálogo WinGet](https://github.com/microsoft/winget-pkgs/tree/master/manifests/d/Docker/DockerDesktop), [WSL](https://learn.microsoft.com/en-us/windows/wsl/install), [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) e [backend WSL 2](https://docs.docker.com/desktop/features/wsl/).
