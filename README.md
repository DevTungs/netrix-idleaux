# Netrix IdleAux

**Auxiliar não oficial para o [pokeidle.io](https://pokeidle.io)** (extensão para Chrome e navegadores baseados em Chromium). Não é afiliado ao jogo.

Reúne numa extensão só: Radar do Mercado, onde caçar (/hunt), troca de hunt, rotina diária, XP Share, revenda e compra no Mercado em ouro, tudo com um cofre de orçamento. Nunca gasta Gema nem diamante.

## Instalar (uma vez só)

1. Baixe o zip do [último Release](../../releases/latest) ("Source code (zip)") e extraia numa pasta que você não vai apagar.
2. Abra `chrome://extensions`, ligue o **Modo do desenvolvedor** e clique em **Carregar sem compactação**; escolha a pasta extraída.
3. Uma aba abre sozinha pedindo a pasta da extensão: escolha **a mesma pasta** e permita o acesso. É isso.

## Atualização automática

A extensão confere os [Releases](../../releases) a cada 30 min. Se tem versão nova, baixa o código do Release, grava por cima da pasta autorizada e se recarrega sozinha. Se o Chrome pedir a permissão da pasta de novo (acontece às vezes depois de reiniciar o navegador), uma aba abre para você clicar em **Permitir de novo**.

## Publicar uma versão (quem mantém)

1. Aumente `version` no `manifest.json` e adicione a entrada no `changelog.json`.
2. `git push` na `main`: o workflow [release.yml](.github/workflows/release.yml) cria o Release `v<versão>`.

## Créditos

Baseado no trabalho de **Dreds** ([PokeIdle Piloto](https://github.com/DredsGG/pokeidle-piloto)). Mantido por [DevTungs](https://github.com/DevTungs).
