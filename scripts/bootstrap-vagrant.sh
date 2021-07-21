#! /bin/bash
# turn off apt errors "dpkg-preconfigure: unable to re-open stdin: No such file or directory"
export DEBIAN_FRONTEND=noninteractive
#make sure we have up to date versions of git and curl
# apt-get install git
# apt-get install curl
#install nodejs 12
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
#install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
#INSTALLING PACKAGES
apt-get update
apt-get install -y \
  nodejs \
  yarn
  
# installing vue-cli
npm install -g @vue/cli

rm -rf node_modules && yarn install

echo "cd /vagrant" >> /home/vagrant/.bashrc
