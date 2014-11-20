---
date: 2009-05-03
description: ""
tags:
- go
- desenvolvimento
title: nas feito em casa parte 2 software
topics:
- Go
- Desenvolvimento
---

No <a title="NAS feito em casa, parte 1 - o Hardware" href="http://hgfischer.com.br/2009/04/nas-feito-em-casa-parte-1-o-hardware/" target="_blank">primeiro artigo</a> sobre este assunto eu mencionei a lista de componentes de hardware. Neste artigo irei descrever brevemente o processo de configuração do NAS/Time Capsule de pobre. Caso queira mais informações a respeito de cada processo, verifique as referências no final deste artigo.
<h2>Gentoo Linux</h2>
Preferencialmente utilizo normalmente Gentoo Linux para servidores. É uma distribuição muito bem projetada e organizada. Seu modelo de configuração e manutenção é bastante consistente e fácil de manter. O único ponto negativo a meu ver é a demora para instalar softwares pois estes devem ser compilados. Esta demora pode ser amenizada com o uso de <a title="ccache on portage compilations" href="http://www.gentoo.org/doc/en/handbook/handbook-x86.xml?part=2&amp;chap=3#doc_chap3" target="_blank">ccache no portage</a>.
<h2>Pré-requisitos</h2>
<ol>
	<li>É necessário saber utilizar Linux. Meu propósito aqui não é ensinar todas as tecnologias envolvidas, mas sim, mostrar como configurar o NAS para funcionar parcialmente como um "Time Capsule";</li>
	<li>Linux 2.6.28 ou mais recente. Não testei com versões inferiores;</li>
	<li>Netatalk 2.0.3 ou mais recente. Não testei com versões inferiores;</li>
	<li>Avahi 0.6.24 ou mais recente. Não testei com versões inferiores;</li>
</ol>
<h2>Primeiros passos</h2>
<ol>
	<li>Instalar o Gentoo Linux. A instalação pode parecer complicada, pois por padrão é praticamente toda manual. Existe a opção de utilizar o instalador gráfico existente no LiveCD, mas por uma questão de gosto pessoal eu não utilizo. Para saber mais <a title="Gentoo Install Docs" href="http://www.gentoo.org/doc/en/?catid=install" target="_blank">veja aqui</a>. Eu instalei o Gentoo Linux inteiro no Compact Flash. Como o Compact Flash estava configurado para ser Master no canal IDE, durante toda a instalação ele foi acessado através do dispositivo /dev/hda.</li>
	<li>Já que o Compact Flash é um pouco lento para escrita, para otimizar a compilação de programas criei uma partição <strong><em>tmpfs</em></strong> para o diretório de compilação do <em>portage</em>. Meu <em>fstab</em> inclui a linha abaixo:
<ol>
	<li><em>shm            /var/tmp/portage    tmpfs    nodev,uid=250,gid=250    0 0</em></li>
</ol>
</li>
	<li>Configurei o <strong><em>kernel</em></strong> apropriado para a placa <strong>D945GCLF</strong> incluindo alguns acessórios USB que pretendo utilizar no futuro (bluetooth e webcam). Se estiver utilizando a mesma placa e quiser poupar tempo, <a title="config.gz" href="/content/2009/05/config.gz" target="_self">baixe aqui</a> a configuração pronta do kernel 2.6.28 para a placa mãe Intel D945GCLF. Para utilizar a configuração, é só descompactar com <em><strong>gunzip</strong></em> e movê-la para o arquivo <em><strong>.config</strong></em> dentro do diretório de código fonte de seu kernel atual (/usr/src/linux) e prosseguir com a compilação e instalação do kernel. Se estiver utilizando um kernel mais recente, não tem problema, é só utilizar o comando <em><strong>make oldconfig</strong></em> e responder as questões que estiverem faltando configurar.
<ol>
	<li><strong>ATENÇÃO</strong>: A configuração de kernel que utilizo não tem habilitado o uso de dispositivos IDE, o que faz com que o Compact Flash seja acessado através do dispositivo /dev/sda ao invés de /dev/hda. Considere isto quando for editar o arquivo /etc/fstab e quando for configurar o Grub.</li>
</ol>
</li>
</ol>
<h3>Configuração do RAID</h3>
A placa mãe que utilizei não possui recursos de RAID via hardware, portanto fiz RAID-1 via software com o próprio Linux e <strong>mdadm</strong>. Para configurar o RAID, faça o seguinte:
<ol>
	<li>Instale o mdadm no Gentoo
<ol>
	<li>
<pre>emerge mdadm</pre>
</li>
</ol>
</li>
	<li>Crie apenas uma partição em cada um dos HDs de 1.5TB com o tamanho máximo possível. Normalmente eu utilizo o <em>cfdisk</em> para fazer isto:
<ol>
	<li>
<pre>cfdisk /dev/sdb</pre>
</li>
	<li>
<pre>cfdisk /dev/sdc</pre>
</li>
</ol>
</li>
	<li>Configure o RAID-1 (espelhamento) com mdadm:
<ol>
	<li>
<pre>mdadm --create --verbose /dev/md0 --level=1 \
    --raid-devices=2 /dev/sdb1 /dev/sdc1</pre>
</li>
	<li>A combinação de kernel e mdadm que utilizei faz a detecção automática do RAID durante o boot. Isto faz com que não seja necessário nenhum outro passo de configuração do RAID, além do mencionado acima;</li>
	<li>Recomendo aguardar o término da reconstrução do RAID-1. Com o hardware que utilizei, a reconstrução levou cerca de 3 horas para terminar. Para saber o estado da reconstrução, monitore o arquivo /proc/mdstat;</li>
</ol>
</li>
	<li>Formate a partição do RAID-1 com seu sistema de arquivos preferido. Eu utilizei ext3 neste momento, mas pretendo migrar para ext4 após algumas versões novas de kernel. ;-)
<ol>
	<li>
<pre>mke2fs -j /dev/md0</pre>
</li>
</ol>
</li>
	<li>Crie o ponto de montagem de sua partição de armazenamento. Eu utilizei um padrão semelhante ao do Mac OS X, criando em /Volumes/Storage:
<ol>
	<li>
<pre>mkdir -p /Volumes/Storage</pre>
</li>
</ol>
</li>
	<li>Configure o /etc/fstab para montar automaticamente a partição de armazenamento. A linha do meu fstab ficou conforme o exemplo abaixo, já com algumas opções de otimização:
<ol>
	<li>
<pre>/dev/md0  /Volumes/Storage   ext3   noatime   0 0</pre>
</li>
</ol>
</li>
	<li>Neste ponto recomendo um reboot do servidor, para que seja um teste se as partições serão montadas como esperado<em>.</em></li>
</ol>
<h2>Netatalk</h2>
O Netatalk implementa o protocolo AFP (<a title="Apple Filing Protocol on Wikipedia" href="http://en.wikipedia.org/wiki/Apple_Filing_Protocol" target="_blank"><em>Apple Filing Protocol</em></a>) que é um protocolo de rede que oferece serviços de tranferência de arquivos para o Mac OS X. Para aqueles que não estão acostumados com o AFP, ele serve o mesmo propósito que o protocolo SMB da plataforma Windows e o protocolo NFS da plataforma Unix.

Mas então porque não utilizar SMB ou NFS para o Time Capsule? Em teoria todos estes deverão funcionar, no entanto a utilização de AFP trará algumas vantagens futuras, quando o Netatalk 2.1 for lançado.
<h3>Compatibilidade do Netatalk com Mac OS X Leopard</h3>
A atual versão do Netatalk (2.0.3) implementa a espeficação do AFP 3.1. O Mac OS X Leopard implementa o AFP 3.2. Apesar da <a title="Mais detalhes sobre a diferença do AFP 3.1 para o AFP 3.2" href="http://lists.apple.com/archives/filesystem-dev/2008/Apr/msg00031.html" target="_blank">diferença ser pequena</a>, é o suficiente para complicar um pouco a configuração desde Time Capsule de pobre. O AFP 3.2 implementa alguns comandos internos novos que só serão implementados na versão 2.1 do Netatalk. Segundo algumas listas de discussões estas funções já foram implementadas no código fonte da árvore HEAD do desenvolvimento do Netatalk. Se quiser arriscar esta versão, será necessário baixar o código através do CVS.

Apesar desta incompatibilidade, é possível utilizar perfeitamente o Netatalk 2.0.x como servidor AFP para o Time Machine. As únicas ressalvas são:
<ol>
	<li>O primeiro backup do Time Machine exige uma intervenção manual para criar uma imagem sparsebundle. Quando chegar a hora irei mostrar como se faz;</li>
	<li>Não deixe o disco encher. Alguns rumores espalhados por fóruns na Internet advertem que se o disco encher o backup se auto destruirá. Mais informações <a href="http://episteme.arstechnica.com/eve/forums/a/tpc/f/942005082731/m/370002065931?r=782005065931#782005065931" target="_blank">aqui</a>. Futuramente pretendo adotar uma das soluções encontradas para evitar este problema e caso consiga, documentarei neste blog.</li>
</ol>
<h3>Instalação e Configuração</h3>
<ol>
	<li>Instale o netatalk no Gentoo:
<ol>
	<li>
<pre>emerge netatalk</pre>
</li>
</ol>
</li>
	<li>Crie o usuário <em>guest</em> que será utilizado sempre que algum Mac tentar conectar no servidor sem utilizar usuário e senha. Este passo não é obrigatório, mas é interessante deixar alguns compartilhamentos acessíveis para visitas, como por exemplo o diretório de Downloads ou de Músicas:
<ol>
	<li>
<pre>useradd -d /Volumes/Storage/Guest -m -g users -s /bin/false guest</pre>
</li>
</ol>
</li>
	<li>Adicione a linha abaixo no /etc/netatalk/afpd.conf. Esta é a única linha de configuração no arquivo. As demais linhas do arquivo são apenas comentários:
<ol>
	<li>
<pre><span style="font-family:'courier new', courier;">- -transall -uamlist uams_randnum.so,uams_dhx.so,uams_guest.so
    -nosavepassword -advertise_ssh -guestname "guest"</span></pre>
</li>
</ol>
</li>
	<li>Altere as linhas abaixo do arquivo /etc/netatalk/netatalk.conf conforme exemplificado:
<ol>
	<li>
<pre>ATALKD_RUN=no</pre>
</li>
	<li>
<pre>PAPD_RUN=no</pre>
</li>
	<li>
<pre>CNID_METAD_RUN=yes</pre>
</li>
	<li>
<pre>AFPD_RUN=yes</pre>
</li>
	<li>
<pre>TIMELORD_RUN=no</pre>
</li>
	<li>
<pre>A2BOOT_RUN=no</pre>
</li>
	<li>
<pre>AFPD_GUEST=guest</pre>
</li>
</ol>
</li>
	<li>Crie os usuários que terão seu diretório home no storage, bem como o diretório de seus backups do Time Machine:
<ol>
	<li>
<pre>useradd -d /Volumes/Storage/Herbert -m -g users -s /bin/false herbert</pre>
</li>
	<li>
<pre>passwd herbert</pre>
</li>
	<li>
<pre>mkdir ~herbert/.TimeMachine/</pre>
</li>
</ol>
</li>
	<li>Configure os compartilhamentos do Netatalk no arquivo /etc/netatalk/AppleVolumes.default. A primeira linha configura o compartilhamento do diretório home de cada usuário. Dependendo de qual usuário utilizar na autenticação via Finder, aparecerá seu respectivo home. A segunda linha configura o diretório .TimeMachine que será utilizado como raiz para os backups:
<ol>
	<li>
<pre><span style="font-family:courier new;">~/ "$u" allow:herbert cnidscheme:cdb options:usedots,upriv</span></pre>
</li>
	<li>
<pre><span style="font-family:courier new;">~/.TimeMachine "$u TimeMachine" allow:herbert,fulano
    cnidscheme:cdb options:usedots,upriv</span></pre>
</li>
</ol>
</li>
	<li>(opcional) Configure outros compartilhamentos, como Downloads, um diretório Shared (compartilhado) para troca de arquivos, etc:
<ol>
	<li>
<pre><span style="font-family:courier new;">/Volumes/Storage/Downloads $b allow:herbert,fulano,ciclano,guest</span><span style="font-family:courier new;">
    cnidscheme:cdb options:usedots,upriv</span></pre>
</li>
	<li>
<pre><span style="font-family:courier new;">/Volumes/Storage/Shared $b allow:herbert,fulano,guest
    cnidscheme:cdb options:usedots,upriv</span></pre>
</li>
</ol>
</li>
	<li>Execute o netatalk e configure-o para inicializar automaticamente no boot:
<ol>
	<li>
<pre>/etc/init.d/atalk start</pre>
</li>
	<li>
<pre>rc-update add atalk default</pre>
</li>
</ol>
</li>
</ol>
Neste ponto já é possível acessar os compartilhamentos via rede, mas somente através do Command-K no Finder (ou menu Go -&gt; Connect to Server...).
<h2>Avahi</h2>
Avahi é um daemon de descoberta de serviços de rede e fará com que o servidor apareça automáticamente no Finder. Para instalá-lo, siga os passos descritos abaixo:
<ol>
	<li>Habilite opções de compilação do avahi:
<ol>
	<li>
<pre>echo net-dns/avahi howl-compat mdnsresponder-compat dbus \
    &gt;&gt; /etc/portage/package.use</pre>
</li>
</ol>
</li>
	<li>Compile o avahi:
<ol>
	<li>
<pre>emerge avahi</pre>
</li>
</ol>
</li>
	<li>Crie o arquivo /etc/avahi/services/afpd.service e coloque o conteúdo abaixo:
<ol>
	<li> [code lang="xml"]
<?xml version="1.0" standalone='no'?>
<!DOCTYPE service-group SYSTEM "avahi-service.dtd">
<service-group>
	<name replace-wildcards="yes">%h</name>
	<service>
		<type>_afpovertcp._tcp</type>
		<port>548</port>
	</service>
	<service>
		<type>_device-info._tcp</type>
		<port>0</port>
		<txt-record>model=AirPort</txt-record>
	</service>
</service-group>
[/code]</li>
</ol>
</li>
	<li>Execute o avahi e configure-o para executar automaticamente na inicialização do servidor:
<ol>
	<li>
<pre>/etc/init.d/avahi-daemon start</pre>
</li>
	<li>
<pre>rc-update add avahi-daemon default</pre>
</li>
</ol>
</li>
</ol>
Pronto! Em alguns instantes o Finder de seu Mac deverá exibir o servidor na lista do menu lateral esquerdo. :-)
<h2>Sugestões</h2>
Caso queira utilizar este storage com Windows, recomendo a instalação do Samba e sua configuração de forma que permita acessar os compartilhamentos da mesma forma que o Netatalk foi configurado.
<h2>Em seguida...</h2>
No próximo artigo desta série irei descrever o processo para configurar o Time Machine de forma que consiga utilizar o servidor para efetuar seus backups.
<h2>Referências</h2>
<a href="http://www.kremalicious.com/2008/06/ubuntu-as-mac-file-server-and-time-machine-volume/" target="_blank">http://www.kremalicious.com/2008/06/ubuntu-as-mac-file-server-and-time-machine-volume/</a>

<a href="http://episteme.arstechnica.com/eve/forums/a/tpc/f/942005082731/m/370002065931?r=782005065931#782005065931" target="_blank">http://episteme.arstechnica.com/eve/forums/a/tpc/f/942005082731/m/370002065931?r=782005065931#782005065931</a>

<a href="http://en.gentoo-wiki.com/wiki/RAID/Software" target="_blank">http://en.gentoo-wiki.com/wiki/RAID/Software</a>

<a href="http://www.gentoo-wiki.info/HOWTO_Share_Directories_via_AFP" target="_blank">http://www.gentoo-wiki.info/HOWTO_Share_Directories_via_AFP</a>

<a href="http://en.gentoo-wiki.com/wiki/Share_Directories_using_AFP" target="_blank">http://en.gentoo-wiki.com/wiki/Share_Directories_using_AFP</a>

<a href="http://en.wikipedia.org/wiki/Apple_Filing_Protocol" target="_blank">http://en.wikipedia.org/wiki/Apple_Filing_Protocol</a>
<ol> <em></em></ol>
