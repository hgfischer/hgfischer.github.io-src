---
title: ImageMagick bindings for Go
description: ImageMagick bindings for Go (a.k.a. golang)
date: 2013-08-10T15:13:00
tags:
- computer-graphics
- golang
- programming
---

A few months ago I've spent some days developing my first cgo binding and the chosen library was 
[ImageMagick's MagickWand](http://www.imagemagick.org/script/magick-wand.php).

It was an interesting experience. It's relatively very easy to do such thing in Go. I'm still not using this binding in 
production and I hope someone can try it. I took care to port some examples from C to Go also, so that should be easier
to start using it. And since ImageMagick is a huge library I was not able to test every function through the binding.

* [Github](https://github.com/gographics/imagick)
* [Documentation](https://gowalker.org/github.com/gographics/imagick/imagick)
