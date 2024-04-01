git pull
docker stop crm-front
docker rm --force front
docker rmi front-image
docker build . -t front-image
docker run -d -p 8080:80 --name front front-image
