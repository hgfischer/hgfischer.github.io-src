---
date: 2009-04-12T00:51:00
description: ""
tags:
- go
- desenvolvimento
title: cuda no mac os x
topics:
- Go
- Desenvolvimento
---

<a title="What is CUDA?" href="http://www.nvidia.com/object/cuda_what_is.html" target="_blank">CUDA</a> é uma arquitetura para computação paralela em GPUs da NVIDIA. Basicamente é um conjunto de ferramentas e uma linguagem C para programar as GPUs da NVIDIA.

Há suporte para Linux, Windows e Mac OS X, tanto em 32 bits como em 64 bits.

Para instalar no Mac OS X, segui os seguintes passos.
<h2>Requerimentos</h2>
<h3>Hardware</h3>
<ul>
	<li>Algum Mac com uma das placas de vídeo suportadas de acordo com este endereço: <a title="CUDA-Enabled GPU Products" href="http://www.nvidia.com/object/cuda_learn_products.html" target="_blank">http://www.nvidia.com/object/cuda_learn_products.html</a>. No meu caso é um MacBook Pro com a placa GeForce 8600M GT.</li>
</ul>
<h3>Software</h3>
<ul>
	<li>Xcode 3.1.2 (ou mais recente) - <a title="XCode" href="http://developer.apple.com/technology/xcode.html" target="_blank">http://developer.apple.com/technology/xcode.html</a></li>
</ul>
Baixe os seguintes itens no endereço: <a title="Get CUDA!" href="http://www.nvidia.com/object/cuda_get.html" target="_blank">http://www.nvidia.com/object/cuda_get.html</a>
<ul>
	<li>CUDA toolkit: CUDA Toolkit 2.1 for Mac OS X</li>
	<li>CUDA SDK: CUDA SDK 2.1 code samples for Mac OS X</li>
</ul>
<h2>Instalando</h2>
<ol>
	<li>Primeiro instale o Toolkit. Clique na opção <strong><em>Customized</em></strong> e certifique-se de que todas as opcões estão habilitadas:</li>
	<li><img class="aligncenter size-full wp-image-132" style="margin:10px;" title="cuda-toolkit" src="http://hgfischer.files.wordpress.com/2009/04/cuda-toolkit.png" alt="cuda-toolkit" width="496" height="352" />Reinicie seu computador, conforme a instalação do Toolkit solicitou;</li>
	<li>Instale o SDK</li>
	<li>Para compilar os exemplos que acompanham o SDK, é necessário adicionar as seguintes linhas no seu arquivo ~/.bash_profile. Normalmente este arquivo não existe, então é necessário criá-lo. Para isto utilize seu editor de texto puro preferido, coloque as linhas abaixo e salve no seu diretório <em>home</em> com o nome <em>.bash_profile</em>:
<pre>export PATH=/usr/local/cuda/bin:$PATH
export DYLD_LIBRARY_PATH=/usr/local/cuda/lib:$DYLD_LIBRARY_PATH</pre>
</li>
</ol>
<h2>Testando</h2>
Para compilar os exemplos do SDK, abra um Terminal e:
<pre>$ cd /Developer/CUDA
$ make
$ make dbg=1
$ make emu=1
$ make emu=1 dbg=1</pre>
As opções acima irão criar diretórios variados em /Developer/CUDA/bin/darwin/ com diversas versões dos binários de exemplo. Para deixar mais claro, <strong><em>dbg</em></strong> compila versões para debug e <strong><em>emu</em></strong> compila versões que rodam sob emulação na própria CPU. Embora nos leve a crer que seja possível executar estes exemplos sem uma GPU da NVIDIA, é um mero engano. Num teste realizado com um MacBook sem GPU NVIDIA, nem em modo emulado executou.
<h3>Benchmark</h3>
A seguir um pequeno benchmark comparando a uma simulação n-body com GPU e sem GPU (modo emulado):
<pre>$ cd /Developer/CUDA
$ bin/darwin/release/nbody -benchmark -n=1000
Run "nbody -benchmark -n=&lt;numBodies&gt;" to measure perfomance.

1000 bodies, total time for 100 iterations: <strong>47.264 ms</strong>
= 2.116 billion interactions per second
= <strong>42.316 GFLOP/s</strong> at 20 flops per interaction

$ bin/darwin/emurelease/nbody -benchmark -n=1000
Run "nbody -benchmark -n=&lt;numBodies&gt;" to measure perfomance.

1000 bodies, total time for 100 iterations: <strong>5305.616 ms</strong>
= 0.019 billion interactions per second
= <strong>0.377 GFLOP/s</strong> at 20 flops per interaction</pre>
Apesar do modo emulado provavelmente ser mais lento do que um código desenvolvido especialmente para CPUs, dá para se ter uma boa noção do poder de processamento das GPUs. Os resultados mostraram que a GPU foi cerca de <strong>112x mais rápida</strong> do que a CPU!
<h3>Eye Candy</h3>
Um pouco de "doce para os olhos". Aqui rodei o exemplo nbody e capturei sua tela:
<pre>$ cd /Developer/CUDA
$ bin/darwin/release/nbody</pre>
<p style="text-align:center;"><img class="aligncenter size-full wp-image-134" style="margin:10px;" title="cuda-nbody1" src="http://hgfischer.files.wordpress.com/2009/04/cuda-nbody1.png" alt="cuda-nbody1" width="504" height="351" /></p>

<p style="text-align:center;">
<p style="text-align:left;"></p>

<h2 style="text-align:left;">Referências</h2>
<ul>
	<li><a title="Getting started with CUDA 2.0" href="http://raymondtay.blogspot.com/2009/02/getting-started-with-cuda-20.html" target="_blank">http://raymondtay.blogspot.com/2009/02/getting-started-with-cuda-20.html</a></li>
	<li><a title="CUDA resources" href="http://raymondtay.blogspot.com/2009/02/cuda-resources.html" target="_blank">http://raymondtay.blogspot.com/2009/02/cuda-resources.html</a></li>
</ul>
