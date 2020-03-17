echo
echo Creating databases

docker-compose up -d postgres
sleep 5

docker-compose exec postgres psql -U postgres -c 'CREATE DATABASE rationing;'

docker-compose exec postgres psql -U postgres -d rationing -c 'GRANT USAGE ON SCHEMA public TO postgres;'
docker-compose exec postgres psql -U postgres -c 'GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;'
docker-compose exec postgres psql -U postgres -c 'GRANT CONNECT ON DATABASE rationing TO postgres;'