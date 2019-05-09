docker volume create some-volume

copy .env-sample to .env and edit values

docker-compose up -d

docker-compose exec analyzer gulp hotspot-analysis --dateFrom=2018-01-01

visit http://localhost:3000 to see reports
