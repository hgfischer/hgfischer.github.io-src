---
title: Script para embutir legendas em arquivos MKV
description: Como embutir legendas em arquivos MKV
date: 2010-07-15T8:32:00
tags:
- bash
- programming
- script
- subtitles
- video
---

Já faz algum tempo que o VLC para Mac não carrega as legendas automaticamente. Nem a última versão 1.1.0 faz isso mais. 
E o Mkvtoolnix não é muito prático para utilizar com muitos arquivos, para juntar filmes e legendas. Foi por este 
motivo que resolvi fazer um pequeno script que utiliza o mkvmerge que acompanha o próprio Mkvtoolnix para automatizar 
a inclusão de legendas em filmes.

Ele está bem simples e é recomendado para aqueles que tem algum conhecimento de shell scripts. Ele pode ser facilmente 
utilizado em Linux também, possivelmente sem nenhuma necessidade de adaptação.

O padrão de funcionamento é o seguinte:

* O script deve estar no mesmo diretório dos arquivos MKV e SRT.

* Os arquivos MKV e suas respectivas legendas SRT devem ter o mesmo nome de arquivo (ignorando-se a extensão).

* Eu fiz o script para juntar legendas em português. Caso a legenda seja em outro idioma, ajuste o trecho do comando `--language 0:por` para o idioma correto. Para saber qual o código correto do idioma, utilize o comando `mkvmerge --list-languages`.


Com pouca adaptação é possível melhorar o script para rodar de qualquer diretório, ser mais inteligente em achar 
legendas, etc., mas o meu problema este aqui já foi suficiente para resolver.

```
#!/bin/bash

export IFS=$'\t\n'
for mkv in `ls -1 *.mkv`
do
	bname=`basename -s '.mkv' $mkv`
	srt=`echo "${bname}.srt"`
	newmkv=`echo "${bname}.MERGED.mkv"`

	mkvmerge -o "$newmkv" "$mkv" \
		--sub-charset 0:ISO-8859-1 --language 0:por --default-track 0:yes "$srt" \
		--track-order 0:1,0:2,1:0
		
	mv "$mkv" ~/.Trash/
	mv "$srt" ~/.Trash/
done
```

