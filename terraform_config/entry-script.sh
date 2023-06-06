#!/bin/bash 
sudo apt update -y
sudo apt upgrade -y
sudo apt install docker -y 
sudo systemctl start docker 
sudo usermod -aG docker root 
docker run -p 8080:80 nginx