---
title: Time Capsule caseiro
date: 2009-04-30T12:45:00
tags:
- nas
- storage
- network-attached-storage
- time-capsule
- hardware
- atom
- barebone
- portuguese
---

Na atual modernidade, a maioria de nossas atividades são armazenadas de forma digital. São documentos, fotos, músicas, 
programas, etc, todos guardados num pequeno dispositivo. É muita responsabilidade para um dispositivo eletrônico que é 
sensível o bastante para parar de funcionar sem aviso prévio, e é o que acontece normalmente.

<!--more-->

Há algum tempo que eu mantenho em casa um pequeno servidor Linux para armazenar cópias dos arquivos mais importantes. 
No entanto era tudo muito simples e nada era automatizado. Por sorte eu não precisei utilizar o backup por conta de 
alguma falha de hardware. Por outro lado, como hoje eu utilizo notebook na maior parte do tempo, estou mais suscetível 
a falhas de hardware.

Antes de utilizar Mac eu nunca havia me interessado por softwares de backup para automatizar este processo. Nenhum deles 
me pareceu fácil de usar e confiável o bastante para funcionar quando mais se precisa deles. Foi aí então que eu conheci 
o Time Machine, que acompanha o Mac OS X Leopard. Além de ter uma interface muito simples, ele funciona muito bem para o 
dia-a-dia. No entanto ele só faz backup num dispositivo externo ligado ao computador (HD externo USB/Firewire) ou num 
dispositivo chamado de Time Capsule que é vendido pela Apple ao custo de US$ 499 para 1TB de espaço. E isto lá nos EUA. 
Ao trazer para cá um aparelho destes chega a ter seu custo proibitivo para muitas pessoas.

E eu só precisava de um servidor com mais espaço em disco, pois o que tinha não dava para fazer backup de todos os 
computadores daqui de casa. Com um pouco de tempo pude juntar as peças para montar o que será meu maior dispositivo de 
armazenamento pessoal que já tive até hoje.


# Hardware

A lista de peças:

* 1 Adaptador CF 2 IDE.
* 1 Cartão CF 8GB.
* 1 Placa mãe Intel D945GCLFBR.
* 1 2GB RAM Kingston DDR2 800Mhz.
* 2 HDs Seagate 1.5TB SATA2 32MB cache.
* Gabinete com fonte.
* Cabos IDE e SATA.

Um _storage_ que terá 50% mais espaço e mais confiabilidade do que o Time Capsule de 1TB por um valor ~30% menor.
Além disso, o Time Capsule de maior capacidade existente hoje possui apenas 1 HD interno de 1TB, ou seja, se este HD 
falhar, *todos os arquivos presentes nele serão perdidos*. Se quiser economizar e colocar apenas 1 HD também, este 
mesmo storage sairá bem mais barato (~55% menor), mas correrá o mesmo risco.

Apesar do Time Capsule ser um roteador WiFi e um mini switch Ethernet, não é este o propósito do meu próprio 
Time Capsule. Alias, ter todos estes componentes num produto único, só vai dar mais dor de cabeça quando apresentar 
alguma falha e você ficar sem storage e sem WiFi ao mesmo tempo. Ainda prefiro ter estas funções separadas, mesmo ao 
custo de mais espaço físico.

Além da vantagem de ter 1 HD a mais para espelhamento, montei o projeto de forma que o sistema operacional fique 
instalado no Compact Flash, facilitando upgrades futuros, gastando menos energia em stand-by, etc.

Desta pequena lista, vale a pena fazer uma menção honrosa à placa mãe. É uma placa de baixo custo da Intel, já com 
processador Intel Atom 230 embutido. Acredite se quiser, mas o processador só tem um dissipador de calor em cima. Quem 
está abaixo do cooler é o _northbridge_ da placa mãe. Seu desempenho é muito satisfatório para a finalidade e seu 
consumo de energia tão baixo que o conjunto todo (com HDs) não vai gastar mais do que 45W.

A única reclamação que deixo registrada é com a documentação que acompanha a placa mãe. Além de ser ruim de manusear, 
pois se trata de um imenso papel dobrado diversas vezes, contém alguns erros grosseiros como o encontrado na imagem 
abaixo, que podem atrapalhar e/ou atrasar a montagem, principalmente quando os cabos não possuem bons referenciais:

![Erro no manual da Intel D945GCLFBR](media/erro_manual.jpg)

Como já tinha um gabinete com fonte, resolvi aproveitá-lo. Ele não se parece nada com um NAS, mas certamente é o melhor 
no quesito dissipação de calor, justamente pelo espaço interno.

Seguem algumas fotos dos componentes:

![Adaptador CF2IDE e Compact Flash](media/adaptador_e_cf.jpg)

![Placa mãe e HDs](media/componentes.jpg)

![Intel D945GCLFBR](media/mb_atom.jpg)

![Placa mãe já montada num gabinete ATX](media/placa_no_gb.jpg)

Não irei entrar em detalhes sobre como montar as peças do hardware. Alias se pretende fazer o mesmo montando um 
dispositivo destes, é pré-requisito saber montar computadores, instalar Linux e utilizar pelo menos o _vim_.

Por enquanto é tudo. No próximo post irei documentar o processo de configuração do Linux para que se torne um 
NAS/Time Capsule.

**Atualização 02/08/2010**: Após ter algumas falhas estranhas com o CF, resolvi trocá-lo por uma HD IDE que estava 
sobrando aqui em casa. Hoje tenho 3 HDs no computador e configurei o tempo de sleep dos HDs de armazenamento para um 
valor baixo. Hoje também utilizo este computador para outras finalidades, como ver vídeos via DLNA com o PS3 Media 
Server, armazenar backups de CDs e DVDs, etc. Eu não tenho costume de deixá-lo ligado direto pois não faz sentido, 
mesmo gastando relativamente pouca energia.


# Software

Abaixo irei descrever brevemente o processo de configuração do NAS/Time Capsule caseiro. Caso queira mais informações 
a respeito de cada processo, verifique as referências no final deste artigo.

## Pré-requisitos
* É necessário saber utilizar Linux. Meu propósito aqui não é ensinar todas as tecnologias envolvidas, mas sim, mostrar 
como configurar o NAS para funcionar parcialmente como um "Time Capsule".
* Linux 2.6.28 ou mais recente.
* Netatalk 2.0.3 ou mais recente.
* Avahi 0.6.24 ou mais recente.


## Gentoo Linux

Normalmente utilizo Gentoo Linux em servidores. É uma distribuição muito bem projetada e organizada. Seu modelo de 
configuração e manutenção é bastante consistente e fácil de manter. O único ponto negativo a meu ver é a demora para 
instalar softwares pois estes devem ser compilados. Esta demora pode ser amenizada com o uso de 
[ccache na compilação](http://www.gentoo.org/doc/en/handbook/handbook-x86.xml?part=2&amp;chap=3#doc_chap3)


## Primeiros passos

* Instalar o Gentoo Linux. A instalação pode parecer complicada, pois por padrão é praticamente toda manual. Existe a 
opção de utilizar o instalador gráfico existente no LiveCD, mas por uma questão de gosto pessoal não o utilizo. Para 
saber mais veja o [Gentoo Install Docs](http://www.gentoo.org/doc/en/?catid=install). Instalei o Gentoo Linux inteiro 
no Compact Flash. Como o Compact Flash estava configurado para ser Master no canal IDE, durante toda a instalação ele 
foi acessado através do dispositivo `/dev/hda`.

* Já que o Compact Flash é um pouco lento para escrita, para otimizar a compilação de programas criei uma partição 
`tmpfs` para o diretório de compilação do `portage`. Meu `/etc/fstab` inclui a linha 
`shm  /var/tmp/portage  tmpfs  nodev,uid=250,gid=250  0 0`.

* Configurei o _kernel_ apropriado para a placa _D945GCLF_ incluindo alguns acessórios USB que pretendo utilizar no 
futuro (bluetooth e webcam).


### Configuração do RAID

A placa mãe que utilizei não possui recursos de RAID via hardware, portanto fiz RAID-1 via software com o próprio 
Linux e `mdadm`. Para configurar o RAID, faça o seguinte:

* Instale o mdadm no Gentoo: `emerge mdadm`

* Crie apenas uma partição em cada um dos HDs de 1.5TB com o tamanho máximo possível. Normalmente eu utilizo o `cfdisk`
para fazer isto:
```
cfdisk /dev/sdb
cfdisk /dev/sdc
```

* Configure o RAID-1 (espelhamento) com mdadm:
```
mdadm --create --verbose /dev/md0 --level=1 --raid-devices=2 /dev/sdb1 /dev/sdc1
```

* A combinação de _kernel_ e `mdadm` que utilizei faz a detecção automática do RAID durante o boot. Isto faz com que não 
seja necessário nenhum outro passo de configuração do RAID, além do mencionado acima.

* Recomendo aguardar o término da reconstrução do RAID-1. Com o hardware que utilizei, a reconstrução levou cerca de 3 
horas para terminar. Para saber o estado da reconstrução, monitore o arquivo `/proc/mdstat`.

* Formate a partição do RAID-1 com seu sistema de arquivos preferido. Eu utilizei ext3 neste momento, mas pretendo migrar 
para ext4 após algumas versões novas de kernel: `mke2fs -j /dev/md0`.

* Crie o ponto de montagem de sua partição de armazenamento. Eu utilizei um padrão semelhante ao do Mac OS X, criando 
em /Volumes/Storage: `mkdir -p /Volumes/Storage`.

* Configure o `/etc/fstab` para montar automaticamente a partição de armazenamento. A linha do meu fstab ficou conforme 
o exemplo abaixo, já com algumas opções de otimização: `/dev/md0  /Volumes/Storage  ext3  noatime  0 0`

* Neste ponto recomendo um reboot do servidor, para que seja um teste se as partições serão montadas como esperado.


## Netatalk

O Netatalk implementa o protocolo [AFP](http://en.wikipedia.org/wiki/Apple_Filing_Protocol) que é um protocolo de rede 
que oferece serviços de tranferência de arquivos para o Mac OS X. Para aqueles que não estão acostumados com o AFP, ele 
serve o mesmo propósito que o protocolo SMB da plataforma Windows e o protocolo NFS da plataforma Unix.

Mas então porque não utilizar SMB ou NFS para o Time Capsule? Em teoria todos estes deverão funcionar, no entanto a 
utilização de AFP trará algumas vantagens futuras, quando o Netatalk 2.1 for lançado.

A atual versão do Netatalk (2.0.3) implementa a espeficação do AFP 3.1. O Mac OS X Leopard implementa o AFP 3.2. 
Apesar da [diferença ser pequena](http://lists.apple.com/archives/filesystem-dev/2008/Apr/msg00031.html), é o suficiente 
para complicar um pouco a configuração desde Time Capsule caseiro. O AFP 3.2 implementa alguns comandos internos novos 
que só serão implementados na versão 2.1 do Netatalk. Segundo algumas listas de discussões estas funções já foram 
implementadas no código fonte da árvore HEAD do desenvolvimento do Netatalk. Se quiser arriscar esta versão, será 
necessário baixar o código através do CVS.

Apesar desta incompatibilidade, é possível utilizar perfeitamente o Netatalk 2.0.x como servidor AFP para o Time Machine. 
As únicas ressalvas são:

* O primeiro backup do Time Machine exige uma intervenção manual para criar uma imagem sparsebundle. Quando chegar a 
hora irei mostrar como se faz.

* Não deixe o disco encher. Alguns rumores espalhados por fóruns na Internet advertem que se o disco encher o backup 
se auto destruirá. Mais informações 
[aqui](http://episteme.arstechnica.com/eve/forums/a/tpc/f/942005082731/m/370002065931?r=782005065931#782005065931).
Futuramente pretendo adotar uma das soluções encontradas para evitar este problema e caso consiga, documentarei neste 
blog.


### Instalação e Configuração

* Instale o netatalk no Gentoo: `emerge netatalk`

* Crie o usuário `guest` que será utilizado sempre que algum Mac tentar conectar no servidor sem utilizar usuário e 
senha. Este passo não é obrigatório, mas é interessante deixar alguns compartilhamentos acessíveis para visitas, como 
por exemplo o diretório de Downloads ou de Músicas: `useradd -d /Volumes/Storage/Guest -m -g users -s /bin/false guest`

* Adicione a linha abaixo no `/etc/netatalk/afpd.conf`. Esta é a única linha de configuração no arquivo. As demais 
linhas do arquivo são apenas comentários: 
`- -transall -uamlist uams_randnum.so,uams_dhx.so,uams_guest.so -nosavepassword -advertise_ssh -guestname "guest"`

* Altere as linhas abaixo do arquivo `/etc/netatalk/netatalk.conf` conforme exemplificado:
```
ATALKD_RUN=no
PAPD_RUN=no
CNID_METAD_RUN=yes
AFPD_RUN=yes
TIMELORD_RUN=no
A2BOOT_RUN=no
AFPD_GUEST=guest
```

* Crie os usuários que terão seu diretório home no storage, bem como o diretório de seus backups do Time Machine:
```
$ useradd -d /Volumes/Storage/Herbert -m -g users -s /bin/false herbert
$ passwd herbert
$ mkdir ~herbert/.TimeMachine/
```

* Configure os compartilhamentos do Netatalk no arquivo `/etc/netatalk/AppleVolumes.default`. A primeira linha 
configura o compartilhamento do diretório home de cada usuário. Dependendo de qual usuário utilizar na autenticação 
via Finder, aparecerá seu respectivo home. A segunda linha configura o diretório .TimeMachine que será utilizado como 
raiz para os backups:
```
~/ "$u" allow:herbert cnidscheme:cdb options:usedots,upriv
~/.TimeMachine "$u TimeMachine" allow:herbert,fulano cnidscheme:cdb options:usedots,upriv
```

* (opcional) Configure outros compartilhamentos, como Downloads, um diretório Shared (compartilhado) para troca de 
arquivos, etc:
```
/Volumes/Storage/Downloads $b allow:herbert,fulano,ciclano,guest cnidscheme:cdb options:usedots,upriv
/Volumes/Storage/Shared $b allow:herbert,fulano,guest cnidscheme:cdb options:usedots,upriv
```

* Execute o netatalk e configure-o para inicializar automaticamente no boot:
```
$ /etc/init.d/atalk start
$ rc-update add atalk default
```

Neste ponto já é possível acessar os compartilhamentos via rede, mas somente através do `Command-K` no Finder 
(ou menu Go -> Connect to Server...).


## Avahi

Avahi é um daemon de descoberta de serviços de rede e fará com que o servidor apareça automáticamente no Finder. Para 
instalá-lo, siga os passos descritos abaixo:

* Habilite opções de compilação do avahi:
`echo net-dns/avahi howl-compat mdnsresponder-compat dbus >> /etc/portage/package.use`

* Compile o avahi: `emerge avahi`

* Crie o arquivo `/etc/avahi/services/afpd.service` e coloque o conteúdo abaixo:
```
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
```

* Execute o avahi e configure-o para executar automaticamente na inicialização do servidor: 
```
$ /etc/init.d/avahi-daemon start
$ rc-update add avahi-daemon default
```

Pronto! Em alguns instantes o Finder de seu Mac deverá exibir o servidor na lista do menu lateral esquerdo.


## Sugestões

Caso queira utilizar este storage com Windows, recomendo a instalação do Samba e sua configuração de forma que permita 
acessar os compartilhamentos da mesma forma que o Netatalk foi configurado.


# Time Machine

Agora irei descrever processo de configuração do Time Machine para utilizar o Time Capsule caseiro. É aqui que entram 
os inconvenientes do Time Capsule caseiro. Ele não funciona exatamente como o Time Capsule original e por isto é 
necessário fazer alguns passos a mais para que cumpra seu propósito.

O Time Machine por padrão só utiliza dispositivos de armazenamento conectados localmente (via USB ou Firewire) ou o 
Time Capsule. É necessário configurar uma opção escondida nele para que possibilite a escolha de outros dispositivos 
como armazenamento dos backups. Para fazer isto, abra um Terminal e execute o comando abaixo. É necessário repetir este 
comando em todos os Macs que for utilizar o servidor de Time Capsule caseiro:

```
defaults write com.apple.systempreferences TMShowUnsupportedNetworkVolumes 1
```

Deixe um Terminal aberto e uma conexão SSH aberta direta com o servidor. Fique no diretório ~usuario/.TimeMachine que 
mais tarde será utilizado pelo Time Machine para gravar a imagem do backup:

```
$ ssh root@Atomix
# cd ~herbert/.TimeMachine</pre>
```

Com o Finder, conecte no compartilhamento apropriado do Time Machine para seu usuário. Lembre-se de que o usuário e a 
senha são os mesmos que foram criados no servidor Linux e cadastrados na configuração do Netatalk. Veja na foto abaixo 
qual é o compartilhamento que eu acessei:

![É necessário conectar no compartilhamento antes de configurar o Time Machine pela primeira vez](media/finder-connect-tm.png)

Agora abra o _System Preferences_, escolha a opção _Time Machine_ e clique no botão _Change Disk_. Uma lista com os 
dispositivos aceitos aparecerá. Se seguiu o artigo 2 conforme descrito, dentre elas deverá aparecer um item com o nome 
do usuário que está acessando o servidor seguido da palavra TimeCapsule e o nome do servidor entre parênteses, conforme 
a imagem abaixo. Após a seleção clique em _Use for Backup_:

![Selecione o compartilhamento apropriado para o Time Machine de seu usuário](media/tm-select-share.png)

Agora o Time Machine tentará efetuar a inicialização. Enquanto ele inicializa, no terminal SSH que está conectado no 
servidor, fique listando o conteúdo do diretório ~usuario/.TimeMachine até que apareça um arquivo/diretório com a 
extensão _.sparsebundle_. Copie o nome do arquivo para um editor de texto e remova o _.tmp_ que faz parte do nome, como 
no exemplo abaixo:

`Silver Surfer_0a1e5ba8b8c1.tmp.sparsebundle` se torna `Silver Surfer_0a1e5ba8b8c1.sparsebundle`

Este será o nome do arquivo da imagem que deverá ser criada manualmente, pois o Time Machine não conseguirá criá-la 
automaticamente e acusará um erro. O nome é composto do nome do Mac que fará seus backups remotos, seguido pelo 
endereço MAC de sua placa de rede e a extensão do arquivo.

Lembra quando mencionei os problemas de compatibilidade do AFP 3.2 e o Netatalk 2.0.3 previamente? Então. É disso que 
eu estava falando. ;-)

Para criar a imagem sparsebundle abra o _Disk Utility_, clique em _New Image_ e utilize como nome de arquivo em 
_Save As_ o nome da imagem sparsebundle sem o _.tmp_ que foi gerado anteriormente. Salve a imagem no Desktop em 
_Where_. Em _Volume Name_ coloque algo como "Backup of NomeDoComputador". Em _Volume Size_, recomendo colocar um 
tamanho que seja no mínimo 2x o tamanho do HD do Mac. Em _Volume Format_ utilize _Mac OS Extended (Journaled)_. Em 
_Encryption_ utilize _none_. Em _Partitions_ utilize _Single partition - Apple Partition Map_, e em _Image Format_ 
utilize _sparse bundle disk image_. Utilize a imagem abaixo como referência:

![Crie a imagem sparsebundle com o Disk Utility](media/create-sparsebundle-image.png)

Após preencher tudo, clique em _Create_. Um arquivo sparsebundle será criado em seu Desktop e imediatamente será 
montado no Finder. Desmonte a imagem "Backup of NomeDoComputador" e mova o arquivo sparsebundle criado para o servidor 
no compartilhamento do TimeMachine para o usuário em questão. No meu caso ele ficou dentro do compartilhamento 
"herbert TimeMachine".

Pronto. Agora o Time Machine conseguirá efetuar os backups automaticamente. O primeiro backup geralmente é o maior 
deles e demora um bocado dependendo da conexão entre seu Mac e o servidor. Recomendo fazer o primeiro backup através 
de uma conexão Ethernet Gigabit. Os próximos backups, quanto mais próximos uns dos outros, menor será a quantidade de 
informações a ser transferida e, portanto, serão mais rápidas.

O Time Machine tenta fazer backups automáticos em períodos curtos. O servidor deverá estar ligado para isto. Caso não 
esteja o Time Machine ignora e não faz nenhum backup. Ele só irá reclamar se passar mais do que 7 dias do último backup.

Não é necessário montar os compartilhamentos de rede para o Time Machine funcionar. Ele mesmo detecta tudo e 
monta/desmonta o que for preciso. ;-)

Recomendo deixar a opção "Show Time Machine status in the menu bar" habilitada. Desta forma um ícone, que lembra o 
símbolo de uma marca de cerveja nacional, ficará no menu do Mac. Quando o Time Machine estiver trabalhando, este ícone 
ficará girando. Através dele também é possível saber a data e hora do último backup, bem como forçar o Time Machine 
para fazer os backups. Também é possível entrar no Time Machine para recuperar arquivos quando necessário.

Por enquanto é só. Futuramente pretendo escrever sobre atualizações do Netatalk, e talvez até experimentar utilizar um 
Hackintosh ao invés de Linux como servidor de Time Machine.


## Referências

* http://www.kremalicious.com/2008/06/ubuntu-as-mac-file-server-and-time-machine-volume/
* http://episteme.arstechnica.com/eve/forums/a/tpc/f/942005082731/m/370002065931?r=782005065931#782005065931
* http://en.gentoo-wiki.com/wiki/RAID/Software
* http://www.gentoo-wiki.info/HOWTO_Share_Directories_via_AFP
* http://en.gentoo-wiki.com/wiki/Share_Directories_using_AFP
* http://en.wikipedia.org/wiki/Apple_Filing_Protocol
