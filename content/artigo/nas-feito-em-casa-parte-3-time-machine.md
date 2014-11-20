---
date: 2009-05-03
description: ""
tags:
- go
- desenvolvimento
title: nas feito em casa parte 3 time machine
topics:
- Go
- Desenvolvimento
---

No <a title="NAS feito em casa, parte 1 - o hardware" href="http://hgfischer.com.br/2009/04/nas-feito-em-casa-parte-1-o-hardware/" target="_blank">primeiro artigo</a> da série descrevi o hardware desde Time Capsule feito em casa. No <a title="NAS feito em casa, parte 2 - o software" href="http://hgfischer.com.br/2009/05/nas-feito-em-casa-parte-2-o-software/" target="_blank">segundo artigo</a> da série descrevi o processo de instalação e configuração do servidor.

Neste artigo irei descrever o processo de configuração do Time Machine para utilizar o Time Capsule de pobre. É aqui que entram os inconvenientes do Time Capsule feito em casa. Ele não funciona exatamente como o Time Capsule original e por isto é necessário fazer alguns passos a mais para que cumpra seu propósito.
<h2>Time Machine</h2>
O Time Machine por padrão só utiliza dispositivos de armazenamento conectados localmente (via USB ou Firewire) ou o Time Capsule. É necessário configurar uma opção escondida nele para que possibilite a escolha de outros dispositivos como armazenamento dos backups. Para fazer isto, abra um Terminal e execute o comando abaixo. É necessário repetir este comando em todos os Macs que for utilizar o servidor de Time Capsule feito em casa:
<pre>defaults write com.apple.systempreferences TMShowUnsupportedNetworkVolumes 1</pre>
Deixe um Terminal aberto e uma conexão SSH aberta direta com o servidor. Fique no diretório ~usuario/.TimeMachine que mais tarde será utilizado pelo Time Machine para gravar a imagem do backup.
<pre>$ ssh root@Atomix
# cd ~herbert/.TimeMachine</pre>
Com o Finder, conecte no compartilhamento apropriado do Time Machine para seu usuário. Lembre-se de que o usuário e a senha são os mesmos que foram criados no servidor Linux e cadastrados na configuração do Netatalk. Veja na foto abaixo qual é o compartilhamento que eu acessei:

[caption id="attachment_182" align="aligncenter" width="600" caption="É necessário conectar no compartilhamento antes de configurar o Time Machine pela primeira vez"]<img class="size-full wp-image-182" title="finder-connect-tm" src="http://hgfischer.files.wordpress.com/2009/05/finder-connect-tm.png" alt="É necessário conectar no compartilhamento antes de configurar o Time Machine pela primeira vez" width="600" height="278" />[/caption]

Agora abra o <em><strong>System Preferences</strong></em>, escolha a opção <em><strong>Time Machine</strong></em> e clique no botão <em><strong>Change Disk</strong></em>. Uma lista com os dispositivos aceitos aparecerá. Se seguiu o artigo 2 conforme descrito, dentre elas deverá aparecer um item com o nome do usuário que está acessando o servidor seguido da palavra TimeCapsule e o nome do servidor entre parênteses, conforme a imagem abaixo. Após a seleção clique em <em><strong>Use for Backup</strong></em>:

[caption id="attachment_185" align="aligncenter" width="480" caption="Selecione o compartilhamento apropriado para o Time Machine de seu usuário"]<img class="size-full wp-image-185" title="tm-select-share" src="http://hgfischer.files.wordpress.com/2009/05/tm-select-share.png" alt="Selecione o compartilhamento apropriado para o Time Machine de seu usuário" width="480" height="273" />[/caption]

Agora o Time Machine tentará efetuar a inicialização. Enquanto ele inicializa, no terminal SSH que está conectado no servidor, fique listando o conteúdo do diretório ~usuario/.TimeMachine até que apareça um arquivo/diretório com a extensão<strong><em> .sparsebundle</em></strong>. Copie o nome do arquivo para um editor de texto e remova o <em><strong>.tmp</strong></em> que faz parte do nome, como no exemplo abaixo:
<pre>Silver Surfer_0a1e5ba8b8c1.tmp.sparsebundle</pre>
... se torna ...
<pre>Silver Surfer_0a1e5ba8b8c1.sparsebundle</pre>
Este será o nome do arquivo da imagem que deverá ser criada manualmente, pois o Time Machine não conseguirá criá-la automaticamente e acusará um erro. O nome é composto do nome do Mac que fará seus backups remotos, seguido pelo endereço MAC de sua placa de rede e a extensão do arquivo.

Lembra quando mencionei os problemas de compatibilidade do AFP 3.2 e o Netatalk 2.0.3 no artigo 2? Então. É disso que eu estava falando. ;-)

Para criar a imagem sparsebundle abra o <em><strong>Disk Utility</strong></em>, clique em <strong><em>New Image</em></strong> e utilize como nome de arquivo em <em><strong>Sabe As </strong></em>o nome da imagem sparsebundle sem o<strong><em> .tmp</em></strong> que foi gerado anteriormente. Salve a imagem no Desktop em <em><strong>Where</strong></em>. Em <em><strong>Volume Name</strong></em> coloque algo como "Backup of NomeDoComputador". Em <strong><em>Volume Size</em></strong>, recomendo colocar um tamanho que seja no mínimo 2x o tamanho do HD do Mac. Em <em><strong>Volume Format</strong></em> utilize <strong>Mac OS Extended (Journaled)</strong>. Em <em><strong>Encryption</strong></em> utilize <em><strong>none</strong></em>. Em <strong>Partitions</strong> utilize <strong><em>Single partition - Apple Partition Map</em></strong>, e em <strong><em>Image Format</em></strong> utilize <strong><em>sparse bundle disk image</em></strong>. Utilize a imagem abaixo como referência.

[caption id="attachment_186" align="aligncenter" width="466" caption="Crie a imagem sparsebundle com o Disk Utility"]<img class="size-full wp-image-186" title="create-sparsebundle-image" src="http://hgfischer.files.wordpress.com/2009/05/create-sparsebundle-image.png" alt="Crie a imagem sparsebundle com o Disk Utility" width="466" height="332" />[/caption]

Após preencher tudo, clique em Create. Um arquivo sparsebundle será criado em seu Desktop e imediatamente será montado no Finder. Desmonte a imagem "Backup of NomeDoComputador" e mova o arquivo sparsebundle criado para o servidor no compartilhamento do TimeMachine para o usuário em questão. No meu caso ele ficou dentro do compartilhamento "herbert TimeMachine".

Pronto. Agora o Time Machine conseguirá efetuar os backups automaticamente. O primeiro backup geralmente é o maior deles e demora um bocado dependendo da conexão entre seu Mac e o servidor. Eu recomendo fazer o primeiro backup através de uma conexão Ethernet Gigabit. Os próximos backups, quanto mais próximos uns dos outros, menor será a quantidade de informações a ser transferida e, portanto, serão mais rápidas.

O Time Machine tenta fazer backups automáticos em períodos curtos. O servidor deverá estar ligado para isto. Caso não esteja o Time Machine ignora e não faz nenhum backup. Ele só irá reclamar se passar mais do que 7 dias do último backup.

Não é necessário montar os compartilhamentos de rede para o Time Machine funcionar. Ele mesmo detecta tudo e monta/desmonta o que for preciso. ;-)

Recomendo deixar a opção "Show Time Machine status in the menu bar" habilitada. Desta forma um ícone que lembra o símbolo da Skol ficará no menu do Mac. Quando o Time Machine estiver trabalhando, este ícone ficará girando. Através dele também é possível saber a data e hora do último backup, bem como forçar o Time Machine para fazer os backups. Também é possível entrar no Time Machine para recuperar arquivos quando necessário.

Por enquanto é só. Futuramente pretendo escrever sobre atualizações do Netatalk, e talvez até experimentar utilizar um Hackintosh ao invés de Linux como servidor de Time Machine.
