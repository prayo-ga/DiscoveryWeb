#!/bin/bash

ls | wc -w | sed "s/ //g"
