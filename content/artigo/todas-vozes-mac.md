---
title: Todas as vozes do Mac
date: 2009-06-30
tags:
- say
- text-to-speech
- tts
- macosx
- portuguese
---

Quem já não perdeu um bom tempo fuçando no sintetizador de voz do Mac OS X?

<!--more-->

Pra facilitar a vida de quem quer ver como é o sintetizador falar uma determinada frase com todos os timbres de voz, 
fiz o script abaixo. É só colocar num arquivo _plain-text_, dar permissão de execução e rodar o comando com qualquer 
coisa como parâmetro que ele sairá falando.

```
#!/bin/bash
for i in `ls -1 /System/Library/Speech/Voices/`
do
    voice=`echo $i | cut -d. -f1 | sed 's/\([a-z]\)\([A-Z]\)/\1 \2/g'`
    echo &quot;$voice is saying \&quot;$@\&quot;&quot;
    say -v &quot;$voice&quot; &quot;$@&quot;
done
```

Exemplo de execução:

```
$ ./falatudo.sh Hello World
```
