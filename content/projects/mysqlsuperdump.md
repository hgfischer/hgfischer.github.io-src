---
title: MySQL Super Dump
description: Software to create secure database dumps from MySQL, made in Go (a.k.a. golang)
date: 2013-08-10T15:19:00
tags:
- golang
- mysql
- security
- database
---

The following text is fiction based on a true story, but it can happen with lots of development teams over the world:

 > Once upon a time there was a development team that liked to use dumps from the production database in their 
 > development environments to have the same content and behavior of the production system in their machines.
 > To avoid security problems, the system administrator created a script to dump the production database, import in a 
 > temporary database, then replace all sensitive data, like salts, passwords, customer names, emails, etc, for fake 
 > data, then export a dump of this temporary database to a file that is the dump developers would use.
 > However this script was taking more time to run, day by day, and each day it was using more resources from the 
 > server to run, until it exploded!

Based on this true story I've decided to make a program to solve this problem. The first version was made in Python 2.7 
in a few hours, but I got trapped in text encoding problems of Python and MySQLdb library. So I've decided to rewrite 
it using Go.

* [Github](https://github.com/hgfischer/mysqlsuperdump)
