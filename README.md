# Como iniciar o programa

foi utilizado linux na realização da webapp

## instalar node js e npm

* sudo apt-get install curl python-software-properties

* curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -

* sudo apt-get install nodejs



## Instalar o mongoDB

* sudo apt install mongodb

+ cd ..

- sudo mkdir -p data/lib

- sudo chmod -R 775 data

- sudo touch /etc/systemd/system/mongodb.service

- sudo nano /etc/systemd/system/mongodb.service
```
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target

[Service]
User=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
```
+ sudo service mongodb start

e deve funcionar :sunglasses:

# em caso de erro ao iniciar

- sudo chmod 0755 /data/db

- sudo chown -R 498:496 /data/db

- sudo chmod -R go+w /data/db

- sudo service mongodb stop

- sudo mongod

## Instalar o nondemon

- npm run paw

## correr o programa

- npm run paw

![alt text](https://i.imgur.com/hguyOjZ.jpg)
