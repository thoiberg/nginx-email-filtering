# Nginx Email Filtering example

This repo demonstrates using nginx's JS module to filter out email addresses in that appear in the query string. Super useful for GDPR!

## Prerequisites

1. Docker

## Using this repo

build the docker container
```
$ docker build . -t test-nginx
```

Run it (I picked 3500 because I didn't have any conflicts on that port, feel free to change it)
```
$ docker run -p 3500:80 test-nginx
```

Go to that address in your browser with an email in the query string (alternatively you can use cURL, it doesn't matter as long as the endpoint is requested):
```zsh
curl http://localhost:3500/\?user\=cat%40boy.com\&purchase_id\=1234
```

In the logs from the docker container you should see something like:
```
172.17.0.1 - - [06/Jul/2020:02:59:46 +0000] "GET /index.html?user=[EMAIL FILTERED]&purchase_id=1234 HTTP/1.1" 200 80 "-" "curl/7.64.1" "-"
```

### Getting an interactive Docker session

Get the container ID for TTYing into it
```
$ docker ps | grep test-nginx | cut -d " " -f 1
```

shell into the container (if needed for debug purposes)
```
$ docker exec -it 0bc721d1d6d8 bash
```