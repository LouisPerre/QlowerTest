## How to install ##

Run `docker-compose up -d --build` to build the container

After that we need to execute the migration and start the server:
```bash
docker exec -it qlower_django bash
python /usr/src/app/manage.py migrate
python /usr/src/app/manage.py 0.0.0.0:8000
```

There we go, you go to `http://localhost:3000/` to see the React Front.