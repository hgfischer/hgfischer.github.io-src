---
title: Manage multiple GOPATH dirs with ease
description: How to use bash to manage multiple GOPATHs
date: 2015-02-05T21:26:44
tags:
- golang
- gopath
- linux
- shell
- bash
---

Usually I have only one GOPATH in my machine and thats most Gophers out there recommend. However, sometimes we just 
need to work on different projects with different versions of the same dependency, and it is out of question to update 
them. We just don't want to break something that is working, or mess with it.

The quick solution is to point GOPATH to somewhere else, but everytime we have to swap the project we are working on, 
we need to change it again.

So I just came up with a simple solution that works on command line shell with Bash, and can be adapted to other 
shells. Since I am a vim user, this should work well. I do not recommend this method for Sublime Text users or just any 
other IDE that uses its own method for setting GOPATH. It will not work unless you load the Editor/IDE from the same
command line shell and it do not have its own way to setup GOPATH.

The solution is simple. Just include the following snippet in your `~/.bashrc` (or `~/.bash_profile`) and reload your 
shell environment with `source ~/.bashrc`. This snippet will create a shell function that will override the builtin 
command `cd` with a customized one that scans the entered directory, and every other above, for a file named `.gopath`.

	cd () {
		builtin cd "$@"
		cdir=$PWD
		while [ "$cdir" != "/" ]; do
			if [ -e "$cdir/.gopath" ]; then
				export GOPATH=$cdir
				break
			fi
			cdir=$(dirname "$cdir")
		done
	}

Now you just need to create a `.gopath` file in every directory you want as your GOPATH and every time you enter this 
directory, the redefined `cd` function will set the GOPATH of your current environment to this directory.

For example, let us create two directories, `A` and `B`, both with a subdirectory `src` to fully illustrate the solution.

	$ go env GOPATH
	/home/user/Go

	$ mkdir -p ~/A/src && touch ~/A/.gopath
	$ mkdir -p ~/B/src && touch ~/B/.gopath

	$ cd ~/A/src
	$ go env GOPATH
	/home/user/A

	$ cd ~/B/src
	$ go env GOPATH
	/home/user/B

Ok, but now I want my old GOPATH back again...
	
	$ cd /home/user/Go
	$ go env GOPATH
	/home/user/B

Oops... We just need to touch .gopath here!!

	$ touch /home/user/Go/.gopath
	$ cd .
	$ go env GOPATH
	/home/user/Go

That's it! Simple GOPATH management without external dependencies (eg. direnv)!
