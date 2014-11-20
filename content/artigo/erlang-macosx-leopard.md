---
title: Erlang no Mac OS X Leopard
date: 2009-04-04T18:03:00-02:00
tags:
- erlang
- mac-os-x
- portuguese
- programming
---

[Erlang](http://pt.wikipedia.org/wiki/Erlang_\(linguagem_de_programa%C3%A7%C3%A3o\)) é uma 
[linguagem de programação funcional](http://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_funcional) criada pela Ericsson 
em 1987 que tem foco em concorrência, sistemas distribuídos e tolerância a falhas. Ultimamente vêm se tornando muito 
conhecida graças a seus recursos de concorrência e a [necessidade por tais facilidades](http://www.ddj.com/architect/184405990).

<!--more-->

Para prosseguir com meus breves estudos de Erlang, resolvi instalá-lo no Mac. Considerei instalá-lo em uma máquina 
virtual VMware ou Parallels, mas isso envolveria a aquisição destes softwares. Além disso eu não estaria aproveitando 
100% do hardware para testar a capacidade do Erlang, sendo assim, preferi instalá-lo diretamente no _host_.

Bom, vamos ao que interessa.


## Requisitos

* Source do Erlang, encontrado [aqui](http://erlang.org/download.html). Utilizei a versão R13A (17 Março 2009). 
  É recomendado também efetuar o download da documentação em formato _man_;
* Apple Xcode 3, encontrado em [aqui](http://developer.apple.com/technology/xcode.html)


## Compilar e instalar

Criei uma pasta dentro do `$HOME` e deixei lá dentro tudo o que precisei para compilar o Erlang.

Os comandos abaixo estão de acordo com as versões que utilizei. Caso utilize uma versão diferente, faça as devidas 
alterações nos nomes de arquivos e diretórios. Caso descubra alguma particularidade da versão, fique à vontade para 
comentar no final deste artigo.

```
$ tar xvzf otp_src_R13A.tar.gz
$ cd otp_src_R13A
$ ./configure --enable-hipe --enable-smp-support --enable-threads
$ make
$ sudo make install
```

Para testar o Erlang:

```
$ erl
```

Você verá algo assim:

```
Erlang R13A (erts-5.7)
[source][/source]
[smp:2:2] [rq:2] [async-threads:0] [hipe] [kernel-poll:false] Eshell V5.7 (abort with ^G) 1>
```

Para sair pressione `Ctrl-C`, escolha a opção *a* e pressione *ENTER*.

```
BREAK: (a)bort (c)ontinue (p)roc info (i)nfo (l)oaded
       (v)ersion (k)ill (D)b-tables (d)istribution
```

O caminho padrão de instalação é /usr/local. Caso queira utilizar outro prefixo, é necessário utilizar a 
opção `--prefix` no comando configure.


## Documentação

Para instalar a documentação em formato _man_, utilize o seguinte comando:

```
$ sudo tar xvzf otp_doc_man_R13A.tar.gz -C /usr/local/share
```

Para testar a documentação:

```
$ man erl
```


## Testando

Para testar se o básico está funcionando, crie um arquivo chamado hello.erl com o código abaixo.

```
-module(hello).
-export([hello_werld/0]).

hello_werld()->
	io:format("Hello WErld ~n").
```

Para compilar e executar o teste:

```
$ erl -compile hello
$ erl -noshell -s hello hello_werld -s init stop
```

Pronto! Já pode dominar o mundo Pink!
