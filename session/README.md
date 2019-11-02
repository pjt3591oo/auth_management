# session management 

* file
* mysql
* redis

[여기](https://blog.naver.com/pjt3591oo/221695855740)에서 자세한 설정을 볼 수 있습니다.

## dependencie modules install

```bash
$ npm i # or npm install, yarn
```

## file

```bash
$ node file_storage.js
```

session directory will create after server running

[접속](127.0.0.1:3000)

## mysql

* docker container running

```bash
$ docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password --name mysql_test mysql:5.7
```

* server running

```bash
$ node mysql.js
```

sessions database will need to create before server running

[접속](127.0.0.1:3000)

## redis

* docker container running

```bash
$ docker run --name redis_test -d -p 6379:6379 redis
```

* server running

```bash
$ node redis.js
```

[접속](127.0.0.1:3000)
