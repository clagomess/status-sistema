#!/usr/bin/env bash

DATE_DEPLOY=`TZ=America/Sao_Paulo date +'%d-%m-%Y %H:%M'`

# VALIDACOES
if [ -z "$GIT_COMMIT" ]; then
	echo "GIT_COMMIT Vazio"
	exit 1
fi

GIT_COMMIT=`echo $GIT_COMMIT | cut -c 1-7`
GIT_TAG=`git describe --tags --abbrev=0 | sed 's/v//g'`

sed -i -- "s/0.0.0/$GIT_TAG/g" src/index.html
sed -i -- "s/##date##/$DATE_DEPLOY/g" src/index.html
sed -i -- "s/##commit##/$GIT_COMMIT/g" src/index.html
