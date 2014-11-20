---
date: 2009-11-02T11:41
description: ""
tags:
- go
- desenvolvimento
title: separadores no bash
topics:
- Go
- Desenvolvimento
---

Quantas vezes já foi obrigado a refazer um script em outra linguagem quando se deparou com um <em>for</em> que recebia valores com espaços e não sabia como resolver isto diretamente no Bash?

Eu mesmo já fiz isto algumas vezes. Mesmo quando sabia que era possível consertar o problema no próprio Bash eu acabava partindo para o novo script pois encontrava um pouco de dificuldade de encontrar documentação sobre isto. O manual do Bash não ajuda muito na forma correta de se configurar a variável IFS.

IFS (Internal Field Separator) é uma variável que permite configurar quais são os caracteres que o Bash considera serem separadores de campos. E é com o IFS que o loop for sabe separar os itens dentro de uma string ou dentre várias linhas.

O IFS padrão é configurado para separar campos com espaços, tabulações e linhas.

Para alterar o valor do IFS para não separar campos com espaços, basta utilizar o comando abaixo:

[code lang="bash"]
export IFS=$'\t\n'
[/code]

Agora quando quiser efetuar alguma tarefa numa lista de arquivos que tem espaços em seu nome, não terá problemas. Veja o exemplo:

[code lang="bash"]
export IFS=$'\t\n'
for f in `ls -1`
do
    echo $f
done
[/code]
