#!/bin/bash

if [ $# -eq 0 ]; then
	echo "No arguments supplied"
else
	if [ $# -gt 3 ]; then
		echo "Max 3 arguments"
	else
		echo $*
	fi
fi
