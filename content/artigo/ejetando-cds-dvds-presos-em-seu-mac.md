---
date: 2010-01-09T12:04
description: ""
tags:
- go
- desenvolvimento
title: ejetando cds dvds presos em seu mac
topics:
- Go
- Desenvolvimento
---

Eventualmente CDs e DVDs (mídias) danificados ficam presos no drive de um Mac e este não consegue ejetá-los.

Isto acontece porque o Mac OS X fica tentando ler as mídias e não consegue. Enquanto ele ficar tentando, ele não ejeta a mídia. Já me ocorreram algumas vezes, principalmente após uma sessão de gravação mal sucedida por conta de mídia de baixa qualidade ou riscada.

Fuçando na interwebs encontrei os comandos abaixo que podem ser utilizados para resolver este problema, sem precisar reiniciar o Mac.

Abra o Terminal e digite os comandos a seguir:

[code]
$ drutil open
$ drutil eject
[/code]

Após alguns segundos a mídia será cuspida para fora do drive. ;-)

Se esta dica não funcionar tente estas:

* Option + Eject
* Shift + Command + E
* F12 + Eject no boot, após a música de boot
