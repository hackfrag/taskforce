#!/bin/bash
clear

echo "=> creating Taskforce.tar.gz"

cd src
tar xfz Taskforce.tar.gz *
mv Taskforce.tar.gz ../build/