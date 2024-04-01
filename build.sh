git pull
docker stop crm-front
docker rm --force crm-front
docker rmi crm-front-image
docker build . -t crm-front-image
docker run -d -p 3000:80 --name crm-front crm-front-image
