---
title: CUDA no Mac OS X
description: Como instalar o SDK CUDA no Mac
date: 2009-04-12T00:51:00
tags:
- mac-os-x
- parallel-computing
- c-language
- programming
---

[CUDA](http://www.nvidia.com/object/cuda_what_is.html) é uma arquitetura para computação paralela em GPUs da NVIDIA. 
Basicamente é um conjunto de ferramentas e uma linguagem C para programar as GPUs da NVIDIA.

<!--more-->

Há suporte para Linux, Windows e Mac OS X, tanto em 32 bits como em 64 bits.

Para instalar no Mac OS X, segui os seguintes passos.

## Requerimentos

### Hardware

* Algum Mac com uma das placas de vídeo suportadas de acordo com 
  [esta lista](http://www.nvidia.com/object/cuda_learn_products.html). No meu caso é um MacBook Pro com a placa 
  GeForce 8600M GT.

### Software

* Xcode 3.1.2 (ou mais recente) [aqui](http://developer.apple.com/technology/xcode.html)
* CUDA toolkit: CUDA Toolkit 2.1 for Mac OS X [aqui](http://www.nvidia.com/object/cuda_get.html)
* CUDA SDK: CUDA SDK 2.1 code samples for Mac OS X [aqui](http://www.nvidia.com/object/cuda_get.html)

## Instalando

* Primeiro instale o Toolkit. Clique na opção *Customized* e certifique-se de que todas as opcões estejam habilitadas 
conforme a imagem abaixo: ![Install CUDA 2.1](media/cuda-toolkit.png)
* Reinicie seu computador, conforme a instalação do Toolkit solicitou
* Instale o SDK
* Para compilar os exemplos que acompanham o SDK, é necessário adicionar as seguintes linhas no seu arquivo 
`~/.bash_profile`. Normalmente este arquivo não existe, então é necessário criá-lo. Para isto utilize seu editor de 
texto puro preferido, coloque as linhas abaixo e salve no seu diretório `$HOME` com o nome `.bash_profile`:
```
export PATH=/usr/local/cuda/bin:$PATH
export DYLD_LIBRARY_PATH=/usr/local/cuda/lib:$DYLD_LIBRARY_PATH
```

## Testando

Para compilar os exemplos do SDK, abra um Terminal e:

```
$ cd /Developer/CUDA
$ make
$ make dbg=1
$ make emu=1
$ make emu=1 dbg=1
```

As opções acima irão criar diretórios variados em `/Developer/CUDA/bin/darwin/` com diversas versões dos binários de 
exemplo. Para deixar mais claro, `dbg` compila versões para debug e `emu` compila versões que rodam sob emulação na 
própria CPU. Embora nos leve a crer que seja possível executar estes exemplos sem uma GPU da NVIDIA, é um mero engano. 
Num teste realizado com um MacBook sem GPU NVIDIA, nem em modo emulado executou.

### Benchmark

A seguir um pequeno benchmark comparando a uma simulação n-body com GPU e sem GPU (modo emulado):

```
$ cd /Developer/CUDA
$ bin/darwin/release/nbody -benchmark -n=1000

Run "nbody -benchmark -n=<numBodies>" to measure perfomance.

1000 bodies, total time for 100 iterations: 47.264 ms
= 2.116 billion interactions per second
= 42.316 GFLOP/s at 20 flops per interaction

$ bin/darwin/emurelease/nbody -benchmark -n=1000
Run "nbody -benchmark -n=<numBodies>" to measure perfomance.

1000 bodies, total time for 100 iterations: 5305.616 ms
= 0.019 billion interactions per second
= 0.377 GFLOP/s at 20 flops per interaction
```

Apesar do modo emulado provavelmente ser mais lento do que um código desenvolvido especialmente para CPUs, dá para se 
ter uma boa noção do poder de processamento das GPUs. Os resultados mostraram que a GPU foi cerca de **112x** mais 
rápida do que a CPU!

### Eye Candy

Um pouco de _doce para os olhos_. Aqui rodei o exemplo nbody e capturei sua tela:

```
$ cd /Developer/CUDA
$ bin/darwin/release/nbody
```

![Eye candy](http://hgfischer.files.wordpress.com/2009/04/cuda-nbody1.png)

## Referências

* [Getting Started with Cuda 2.0](http://raymondtay.blogspot.com/2009/02/getting-started-with-cuda-20.html)
* [CUDA Resources](http://raymondtay.blogspot.com/2009/02/cuda-resources.html)
