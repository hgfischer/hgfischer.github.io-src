---
title: Linux e Notebooks Samsung
description: Como controlar a ventoínha do seu notebook Samsung, no Linux
date: 2014-11-23T23:21:56
tags:
- linux
- hardware
- samsung
- kernel
- ubuntu
- trusty
---

Linux e Notebooks já deixaram de ser uma dicotomia, mas alguns problemas ainda surgem em pleno 2014. Fabricantes de
hardware não param de inovar e ao mesmo tempo a comunidade nem sempre consegue todas as informações necessárias para
implementar os drivers e módulos para o novo hardware no Kernel.

<!--more-->

Meu notebook Samsung NP550P5C-AD1BR é uma excelente máquina, mas tem um problema com aquecimento excessivo. A BIOS dele
não oferece opções para lidar com a configuração da ventoínha, nem minha instalação do Ubuntu 14.04 LTS que simplesmente
se recusa a detectar a ventoínha, mesmo utilizando o módulo `samsung-laptop` e o software `samsung-tools` que em teoria
deveriam funcionar.

Após muita pesquisa descobri que os notebooks Samsung possuem um problema relacionado ao uso da UEFI e que este problema
foi contornado em versões anteriores do Kernel, com um _patch_ do próprio Linus Torvalds. Uma outra alteração para estes
notebooks, fez com que o módulo de kernel `samsung-laptop` deixasse de funcionar caso o notebook esteja operando em modo 
UEFI ao invés do modo legado da BIOS.

Eu ainda tinha um problema com aquecimento e não estava vendo a BIOS do notebook ajustar adequadamente a velocidade da 
ventoínha para dissipar o calor. Por este motivo voltei atrás e reinstalei o Linux (obrigado Puppet!) sob o modo legado 
da BIOS, para conseguir utilizar o devido módulo do kernel e forçar uma velocidade maior da ventoínha.

Com isso, a temperatura média da CPU caiu de 80ºC para 50ºC!
