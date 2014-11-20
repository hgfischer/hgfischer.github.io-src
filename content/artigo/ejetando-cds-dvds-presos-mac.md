---
title: Ejetando CDS e DVDS presos em seu Mac
date: 2010-01-09T12:04:00
tags:
- macosx
- cds
- dvds
- portuguese
---

Eventualmente CDs e DVDs danificados ficam presos no drive de um Mac e este não consegue ejetá-los.

<!--more-->

Isto acontece porque o Mac OS X fica tentando ler as mídias e não consegue. Enquanto ele ficar tentando, ele não ejeta 
a mídia. Este problema já me ocorreu algumas vezes, principalmente após uma sessão de gravação mal sucedida por conta 
de mídia de baixa qualidade ou riscada.

Fuçando na interwebs encontrei os comandos abaixo que podem ser utilizados para resolver este problema, sem precisar 
reiniciar o Mac.

Abra o Terminal e digite os comandos a seguir:

```
$ drutil open
$ drutil eject
```

Se após alguns segundos a mídia não for ejetada com sucesso, tente as seguintes combinações de teclas de atalho:

* `Option + Eject`
* `Shift + Command + E`

Se mesmo assim ainda não funcionar, tente pressionar `ESC + Eject` logo após a música de boot, após reinicializar o Mac.

E se mesmo assim nada funcionar, desculpe, mas é melhor procurar um profissional.
