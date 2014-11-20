---
title: Eclipse theme under Ubuntu
date: 2011-10-29T11:41
tags:
- ubuntu
- eclipse
- gtk
- theme
- unity
- english
---

Looks like there are a lot of complaints about Eclipse look-and-feel under Ubuntu Unity (10.10 and 11.04). The main 
problem is that there are a few inconsistencies with default Eclipse coloring and Ubuntu system colors. Some interface 
objects have low color contrast, like tooltips and selection lists.

I've found a few solutions on the web to this problem, but none solved the whole problem. Some suggested to edit a file 
and force a color only to tooltips but this is counter-productive because tooltips are not the only object with color 
problems in this situation.

So, if you don't mind having to change all colors in your Ubuntu, I've found out a simple solution to the problem. 
Install gtk-chtheme, open it and choose a theme that works better with Unity theme. I've found out that the Human theme 
works very well.

	$ sudo apt-get install gtk-chtheme
	$ gtk-chtheme

See ya!
