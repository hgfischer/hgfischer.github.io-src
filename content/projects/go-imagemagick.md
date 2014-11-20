---
title: ImageMagick bindings for Go
date: 2013-08-10T15:13:00
tags:
- computer-graphics
- english
- golang
- programming
---

A few months ago I've spent some days developing my first cgo binding and the chosen library was 
[ImageMagick's MagickWand](http://www.imagemagick.org/script/magick-wand.php).

It was an interesting experience. It's relatively very easy to do such thing in Go. I'm still not using this binding in 
production and I hope someone can try it. I took care to port some examples from C to Go also, so that should be easier
to start using it. And since ImageMagick is a huge library I was not able to test every function through the binding.

[go get it!](https://github.com/gographics/imagick)
