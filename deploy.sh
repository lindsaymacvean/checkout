#! /bin/bash

if [ "$#" -lt 1 ];
  then
    echo "You need a commit message"
    exit 1
fi

git add -A
git commit -m "$1" 
git push origin master

if [[ $2 == "deploy" ]]; then
ssh ubuntu@longbackclothing.com << EOF
  cd /var/www/html/misssexylegs
  git pull origin master
  sudo chown -R ubuntu:www-data .
EOF
fi
