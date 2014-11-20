---
title: Extraíndo arquivos de um RPM
date: 2010-11-03T11:03:00
tags:
- rpm
- redhat
- sysadm
- devops
- portuguese
---

Já me deparei com situações em que precisava de algum arquivo existente dentro de um RPM mas não queria instalá-lo. 

<!--more-->

A solução é extrair o conteúdo do RPM, só que o comando RPM não tem nenhuma opção padrão para fazer isto. É necessário 
então utilizar outras ferramentas.

Para fazer isto, basta utilizar o comando abaixo, substituindo o "arquivo.rpm" pelo nome do seu arquivo RPM:

```
$ rpm2cpio arquivo.rpm | cpio -vdim
```
