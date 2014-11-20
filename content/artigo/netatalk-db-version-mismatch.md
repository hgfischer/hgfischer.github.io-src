---
title: Netatalk DB_VERSION_MISMATCH
date: 2009-06-29
tags:
- storage
- time-capsule
- time-machine
- berkeleydb
- netatalk
- macosx
- gentoo
- linux
- portuguese
---


Recentemente me deparei com um mal comportamento do meu "Time Capsule" caseiro. Quando tentava acessar os 
compartilhamentos pelo Finder, ele não conseguia conectar. 

<!--more-->

Nos logs apareciam erros como este:

```
cnid_open: dbenv->open (rw) of /Volumes/Storage/.AppleDB failed:
DB_VERSION_MISMATCH: Database environment version mismatch
```

Foi então que percebi que na última atualização do Gentoo, o BerkeleyDB havia sido atualizado. O que fiz então foi 
recompilar o netatalk com o comando `emerge netatalk` e depois remover os diretórios .AppleDB do storage:

```
# find /Volumes/Storage -name '.AppleDB' -exec rm -rfv {} \;
```

Isto resolveu o problema.
