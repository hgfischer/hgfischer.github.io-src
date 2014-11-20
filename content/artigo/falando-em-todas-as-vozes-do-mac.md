---
date: 2009-06-30
description: ""
tags:
- go
- desenvolvimento
title: falando em todas as vozes do mac
topics:
- Go
- Desenvolvimento
---

Quem já não perdeu um bom tempo fuçando no sintetizador de voz do Mac OS X?

Pra facilitar a vida de quem quer ver como é o sintetizador falar uma determinada frase com todos os timbres de voz eu fiz o script abaixo. É só colocar num arquivo <em>plain-text</em>, dar permissão de execução e rodar o comando com qualquer coisa como parâmetro que ele sairá falando.

[code lang="bash"]
#!/bin/bash
for i in `ls -1 /System/Library/Speech/Voices/`
do
 voice=`echo $i | cut -d. -f1 | sed 's/\([a-z]\)\([A-Z]\)/\1 \2/g'`
 echo &quot;$voice is saying \&quot;$@\&quot;&quot;
 say -v &quot;$voice&quot; &quot;$@&quot;
done
[/code]

Exemplo de execução:
<pre>$ ./falatudo.sh Hello World</pre>
