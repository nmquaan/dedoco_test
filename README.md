# Dedoco API – User Authentication & Authorization, Create document signing request

## Project setup
```
npm install
```

## Run mongoDB on docker
```
docker-compose up
```

### Run
```
node server.js
```

### Endpoints
```
==Register user==
curl --location --request POST 'http://localhost:8080/api/v1/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "ktoq18r1nr@thejoker.com",
    "fullName": "Quan Nguyen MQ",
    "phoneNumber": "+6570162891",
    "password": "wDqgyWMIZzpYV1ifX3KgITskZtcyJB4B"
}'
==============
 ==Login user==
curl --location --request POST 'http://localhost:8080/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "ktoq18r1nr@thejoker5.com",
    "password": "wDqgyWMIZzpYV1ifX3KgITskZtcyJB4B"
}'
==============
 ==User create document to sign request==
curl --location --request POST 'http://localhost:8080/api/v1/documents' \
--header 'x-access-token: access-token' \
--header 'Content-Type: application/json' \
--data-raw '{
        "documentName": "Demo document Name",
        "originalURL": "https://www.fleetster.net/legal/standard-terms-and-conditions.pdf",
        "tagSignatureLocation": "Bottom,Right",
        "signers": [
            {
                "email": "0w8lcn5uht@privacy-mail.top",
                "name": "Fake name"
            }
        ]
    }'
==============
 ==Singer sign document ==
curl --location --request POST 'http://localhost:8080/api/v1/documents/sign' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTQyOTQ0YzExMGEwZjNiNmZjNTczYyIsImlhdCI6MTYyNTU2NTUxNCwiZXhwIjoxNjI1NjUxOTE0fQ.t3srMxEz61CVgFs2vsx_5_N3ukPnkbuW997GZMNLS5M' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "0w8lcn5uht@privacy-mail.top",
    "signKey": "vd6swy3ojf99tgjai9ghhk",
    "signedURL": "https://www.fleetster.net/legal/standard-terms-and-conditions.pdf",
    "documentId": "60e432da588a2af596e8a435"
}'
==============

```

### Code level improvements
- Using queue systems handle job send mail to users and singer (Example: bullJS (https://github.com/OptimalBits/bull#readme))
- Setup rate limiting
### Setup improvements

- Setup production environment by Kubernetes and Terraform for infrastructure as code
- Setup a centralised logging system
- Using Sentry Application Monitoring and Error Tracking Software
