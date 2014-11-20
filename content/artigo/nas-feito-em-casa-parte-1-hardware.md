---
date: 2009-04-30T12:45
description: ""
tags:
- go
- desenvolvimento
title: nas feito em casa parte 1 hardware
topics:
- Go
- Desenvolvimento
---

Na atual modernidade, a maioria de nossas atividades são armazenadas de forma digital. São documentos, fotos, músicas, programas, etc, todos guardados num pequeno dispositivo. É muita responsabilidade para um dispositivo eletrônico que é sensível o bastante para parar de funcionar sem aviso prévio, e é o que acontece normalmente.

Já fazia algum tempo que eu mantinha em casa um pequeno servidor Linux para armazenar cópias dos arquivos mais importantes. No entanto era tudo muito simples e nada era automatizado. Por sorte eu não precisei utilizar o backup por conta de alguma falha de hardware. Por outro lado, como hoje eu utilizo notebook na maior parte do tempo, estou mais suscetível a falhas de hardware.

Antes de utilizar Mac eu nunca havia me interessado por softwares de backup para automatizar este processo. Nenhum deles me pareceu confiável o bastante para funcionar quando mais se precisa deles. Foi aí então que eu conheci o Time Machine, que acompanha o Mac OS X Leopard. Além de ter uma interface muito simples, ele funciona muito bem para o dia-a-dia. No entanto ele só faz backup num dispositivo externo ligado ao computador (HD externo USB/Firewire) ou num dispositivo chamado de Time Capsule que é vendido pela Apple ao custo de US$ 499 para 1TB de espaço. E isto lá nos EUA. Ao trazer para cá um aparelho destes chega a ter seu custo proibitivo para muitas pessoas.

E eu só precisava de um servidor com mais espaço em disco, pois o que tinha não dava para fazer backup de todos os computadores daqui de casa. Com um pouco de tempo pude juntar as peças para montar o que será meu maior dispositivo de armazenamento pessoal que já tive até hoje.

A lista de compras:
<ul>
	<li>1x <a title="Adaptador CF 2 IDE na DealExtreme" href="http://www.dealextreme.com/details.dx/sku.711" target="_blank">Adaptador Compact Flash para IDE</a> reaproveitado</li>
	<li>1x <a title="Cartão CF 8GB na DealExtreme" href="http://www.dealextreme.com/details.dx/sku.11298" target="_blank">Cartão Compact Flash de 8GB</a> reaproveitado</li>
	<li>1x Placa mãe Intel D945GCLFBR</li>
	<li>1x 2GB RAM Kingston DDR2 800Mhz</li>
	<li>2x HDs Seagate 1.5TB SATA2 32MB cache</li>
	<li>Gabinete reaproveitado</li>
	<li>Cabos IDE e SATA reaproveitados</li>
</ul>
TOTAL: Um storage que terá 50% mais espaço e mais confiabilidade do que o Time Capsule de 1TB por um valor ~30% menor.

<strong>OBS.: O Time Capsule de maior capacidade existente hoje possui apenas 1 HD interno de 1TB, ou seja, se este HD falhar, <em>vai tudo para a cucuia</em>. Se quiser economizar e colocar apenas 1 HD também, este mesmo storage sairá bem mais barato (~55% menor), mas correrá o mesmo risco.</strong>

Apesar do Time Capsule ser um roteador Wifi e um mini switch Ethernet, não é este o propósito do meu próprio Time Capsule. Alias, ter todos estes componentes num produto único, só vai dar mais dores de cabeça quando apresentar alguma falha e você ficar sem storage e sem wifi ao mesmo tempo. Eu ainda prefiro ter estas funções separadas, mesmo ao custo de mais espaço físico.

Além da vantagem de ter 1 HD a mais para espelhamento, montei o projeto de forma que o sistema operacional fique instalado no Compact Flash, facilitando upgrades futuros, gastando menos energia em stand-by, etc.

Desta pequena-grande lista, vale a pena fazer uma menção honrosa à placa mãe. É uma placa de baixo custo da Intel, já com processador Intel Atom 230 embutido. Acredite se quiser, mas o processador só tem um dissipador de calor em cima. Quem está abaixo do cooler é o <em>northbridge</em> da placa mãe. Seu desempenho é muito satisfatório para a finalidade e seu consumo de energia tão baixo que o conjunto todo (com HDs) não vai gastar mais do que 45W.

A única reclamação que deixo registrada é com a documentação que acompanha a placa mãe. Além de ser ruim de manusear, pois se trata de um imenso papel dobrado diversas vezes, contém alguns erros grosseiros como o encontrado na imagem abaixo, que podem atrapalhar e/ou atrasar a montagem, principalmente quando os cabos não possuem bons referenciais:

[caption id="attachment_156" align="aligncenter" width="500" caption="Erro no manual da Intel D945GCLFBR"]<img class="size-full wp-image-156" title="Erro no manual da Intel D945GCLFBR" src="http://hgfischer.files.wordpress.com/2009/04/erro_manual.jpg" alt="Erro no manual da Intel D945GCLFBR" width="500" height="369" />[/caption]

Como já tinha um gabinete com fonte, resolvi aproveitá-lo. Ele não se parece nada com um NAS, mas certamente é o melhor no quesito dissipação de calor, justamente pelo espaço interno.

Seguem algumas fotos dos componentes:

[caption id="attachment_152" align="aligncenter" width="300" caption="Adaptador CF2IDE e Compact Flash"]<img class="size-full wp-image-152" title="Adaptador CF2IDE e Compact=" src="http://hgfischer.files.wordpress.com/2009/04/adaptador_e_cf.jpg" alt="Adaptador CF2IDE e Compact=" width="300" height="131" />[/caption]

[caption id="attachment_153" align="aligncenter" width="450" caption="Placa mãe e HDs"]<img class="size-full wp-image-153" title="MB e HDs" src="http://hgfischer.files.wordpress.com/2009/04/componentes.jpg" alt="Placa mãe e HDs" width="450" height="418" />[/caption]

[caption id="attachment_154" align="aligncenter" width="400" caption="Intel D945GCLFBR"]<img class="size-full wp-image-154" title="Intel D945GCLFBR" src="http://hgfischer.files.wordpress.com/2009/04/mb_atom.jpg" alt="Intel D945GCLFBR" width="400" height="404" />[/caption]

[caption id="attachment_155" align="aligncenter" width="600" caption="Placa mãe já montada num gabinete ATX"]<img class="size-full wp-image-155" title="placa mãe montada no gabinete" src="http://hgfischer.files.wordpress.com/2009/04/placa_no_gb.jpg" alt="Placa mãe já montada num gabinete ATX" width="600" height="450" />[/caption]

Não irei entrar em detalhes sobre como montar as peças do hardware. Alias se pretende fazer o mesmo montando um dispositivo destes, é pré-requisito saber montar computadores, instalar Linux e utilizar pelo menos o <em>vim</em>.

Por enquanto é tudo. No próximo post irei documentar o processo de configuração do Linux para que se torne um NAS / Time Capsule.

<strong>Atualização 02/08/2010</strong>: Após ter algumas falhas estranhas com o CF, resolvi trocá-lo por uma HD IDE que estava sobrando aqui em casa. Hoje tenho 3 HDs no computador e configurei o tempo de sleep dos HDs de armazenamento para um valor baixo. Hoje eu também utilizo este computador com outras finalidades, como ver vídeos via DLNA com o PS3 Media Server, armazenar backups de CDs e DVDs, etc. Eu não tenho costume de deixá-lo ligado direto pois não faz sentido, mesmo gastando relativamente pouca energia.
