---
date: 2009-06-29
description: ""
tags:
- go
- desenvolvimento
title: netatalk db version mismatch
topics:
- Go
- Desenvolvimento
---


Recentemente me deparei com um mal comportamento do meu "Time Capsule" feito em casa. Quando tentava acessar os compartilhamentos pelo Finder, ele não conseguia conectar. Nos logs apareciam erros como este:
<pre>cnid_open: dbenv-&gt;open (rw) of /Volumes/Storage/.AppleDB failed:
DB_VERSION_MISMATCH: Database environment version mismatch</pre>
Foi então que percebi que na última atualização do Gentoo, o BerkeleyDB havia sido atualizado. O que fiz então foi recompilar o netatalk com o comando abaixo:
<pre># emerge netatalk</pre>
E então remover os diretórios .AppleDB do storage:
<pre># find /Volumes/Storage -name '.AppleDB' -exec rm -rfv {} \;</pre>
Isto resolveu o problema.
