# Netrix PokeIdle Aux

**Auxiliar não oficial para o [pokeidle.io](https://pokeidle.io)** (extensão para Chrome e navegadores baseados em Chromium). Não é afiliado ao jogo.

Reúne numa extensão só: Radar do Mercado, onde caçar (/hunt), troca de hunt, rotina diária, XP Share, revenda e compra no Mercado em ouro, tudo com um cofre de orçamento, e a **Plateia** (assiste as lives com bônus da Twitch e da Kick por você). Nunca gasta Gema nem diamante.

## Instalar (uma vez só)

A extensão **não está na Chrome Web Store**, então a instalação é manual, pelo modo desenvolvedor. Leva 2 minutos e só se faz uma vez.

1. Baixe o zip do [último Release](../../releases/latest) (em *Assets*, clique em **Source code (zip)**).
2. **Extraia** o zip numa pasta que você não vai apagar nem mover (ex.: `Documentos/netrix-idleaux`). A pasta certa é a que tem o `manifest.json` dentro; se o zip criou uma pasta dentro de outra, use a de dentro.
3. No Chrome (ou Edge, Brave, Opera...), abra `chrome://extensions` e ligue o **Modo do desenvolvedor** (canto superior direito).
4. Clique em **Carregar sem compactação** e escolha a pasta do passo 2.
5. Logo depois uma aba abre sozinha, pedindo a pasta da extensão. Clique em **Escolher a pasta da extensão**, selecione **a mesma pasta** e confirme **Ver alterações / Salvar alterações** quando o Chrome pedir. Isso libera a atualização automática.

Dica: fixe a extensão na barra do navegador (ícone de quebra-cabeça) para achar o botão mais fácil.

## Como a atualização automática funciona

O Chrome não deixa uma extensão instalada por pasta trocar os próprios arquivos sem a sua permissão. Por isso o passo 5 existe: você autoriza **uma vez** que o Netrix PokeIdle Aux grave **só dentro da pasta dele**. Depois disso:

1. A cada 30 min (e ao abrir o navegador) a extensão consulta os [Releases](../../releases) deste repositório. Não envia nenhum dado seu.
2. Se há versão nova, baixa o zip do Release, confere que é o Netrix PokeIdle Aux e que a versão é mais nova, e grava os arquivos por cima da pasta autorizada (o `manifest.json` por último; se algo falhar no meio, a versão antiga continua valendo).
3. A extensão se recarrega sozinha e as abas do jogo recarregam junto.

Também dá para forçar pelo botão **Procurar atualização** no painel da extensão.

### Se algo pedir sua atenção

- **Abriu a aba "Atualização automática":** o Chrome esqueceu a permissão da pasta (acontece às vezes depois de reiniciar o navegador). Clique em **Permitir de novo**.
- **Mudou ou apagou a pasta:** a atualização para de funcionar. Mova de volta, ou instale de novo (passos acima) e escolha a nova pasta no passo 5.
- **Escolheu a pasta errada:** a página avisa se não achar o `manifest.json` do Netrix PokeIdle Aux. Escolha a pasta onde você carregou a extensão.
- **Prefere atualizar na mão:** baixe o zip do Release novo e extraia por cima da pasta, aceitando substituir os arquivos. A extensão percebe a troca em até 1 minuto e se recarrega. Se não recarregar, clique em ↻ no card dela em `chrome://extensions`.
- **Só funciona em navegadores Chromium** (Chrome, Edge, Brave, Opera...), com o modo desenvolvedor ligado. Se o Chrome mostrar o aviso "Desative as extensões do modo de desenvolvedor" ao abrir, é só dispensar; não desative a extensão.

## Publicar uma versão (quem mantém)

1. Aumente `version` no `manifest.json` e adicione a entrada no `changelog.json`.
2. `git push` na `main`: o workflow [release.yml](.github/workflows/release.yml) cria o Release `v<versão>`.

## Plateia (Twitch e Kick) já vem junto

O código da [Plateia](https://github.com/DredsGG/plateia) (v0.9.4, do **Dreds**, usado com a autorização dele) mora em `src/plateia/`. Não precisa instalar a Plateia separada: se você ainda tem ela instalada, **remova** (duas extensões pegando o mesmo baú e as mesmas lives em duplicidade). O Piloto avisa se achar as duas. Nesta versão a extensão passa a pedir acesso a `twitch.tv` e `kick.com`.

## Créditos

Baseado no trabalho de **Dreds** ([PokeIdle Piloto](https://github.com/DredsGG/pokeidle-piloto)). Mantido por [DevTungs](https://github.com/DevTungs).
