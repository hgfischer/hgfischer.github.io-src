---
title: Barra de Status no GNU Screen
date: 2009-04-08T22:29:00
tags:
- linux
- shell
- screen
- portuguese
---

[GNU Screen](http://www.gnu.org/software/screen/) é um gerenciador de terminais virtuais para a linha de comando. Seu 
uso em geral agiliza a administração remota de servidores pelo simples fato de ser necessário abrir apenas uma conexão 
SSH e através desta se pode ter vários terminais virtuais.

Uma outra vantagem em utilizar o GNU Screen, é deixar o gerenciador e retomá-lo sempre que precisar. Isso significa que 
você pode desconectar do servidor e deixar o gerenciador aberto com todas as "janelas" e processos rodando. Não só traz 
um benefício proposital, mas também pode salvar seu dia caso não tenha uma conexão estável com o servidor remoto.

Por estas e outras razões eu sempre utilizo GNU Screen quando possível (quando está instalado no servidor remoto).

No entanto por padrão ele não é muito amigável pois não exibe nenhuma informação na tela, sendo necessário utilizar 
atalhos de teclado para ver quais janelas estão abertas.

Após muito procurar, e isso já faz um bom tempo, consegui criar uma configuração padrão, para meus Screen. Esta exibe 
uma barra de informações na parte inferior da tela.

A configuração abaixo pode ser colocada no `/etc/screenrc` ou no `~/.screenrc`. Dependendo de onde colocar, ela valerá 
para todo o sistema ou somente para o usuário corrente, respectivamente.

	vbell off
	hardstatus off
	backtick 1 1200 1200 whoami
	caption always "%{= cW} %c | %l | %-Lw%{= bW}%65> [%n] %t %f* %{-}%+Lw%<"

A partir deste exemplo, você pode personalizar sua barra de status da forma que quiser. São dezenas de opções que ao 
invés de citar aqui, recomendo que leia no manual do próprio screen (`man screen`).

Veja como ficou:

![captura de tela do terminal rodando screen](/media/screen.png)

Observe que no rodapé do terminal encontra-se várias informações: Relógio, Load Average e a lista de janelas. A janela 
atual aparece destacada em azul.
