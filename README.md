# Stackoverflow Search Angular


## Agenda

 1. [Stack](#stack)
 2. [Prerequisites](#pre)
 3. [Configuration](#config)
 4. [Development](#dev)
 5. [Production](#prod)
 6. [TODO](#todo)

## <a name="stack"></a> Stack
 - Angular 6
   + NGRX Store
   + NGRX Effects
   + Material
   + Animations
   + Forms
 - NodeJS
 - MongoDB
 - Nginx
 - Docker

## <a name="pre"></a> Prerequisites
To develop and build for prod you should use **Docker** (includes compose).

Install docker on [Mac][docker-for-mac] or [Windows][docker-for-windows].


## <a name="config"></a> Configuration

You should configure OAuth

 1. [Register you Stack App][oauth-register]
 2. You should copy `server/.env` file from `server/.env.example`
 3. Replace environment variables
    ```
    STACKEXCHANGE_CLIENT_ID = #client_id#
    STACKEXCHANGE_CLIENT_SECRET = #secret_token#
    STACKEXCHANGE_APPS_KEY = #app_key#
    ```
 4. Go to the [next step](#dev) below.

## <a name="dev"></a> Development

You won't be able run application until ENV configuration isn't created.

To run front, auth and api services just run _docker-compose_.

It will build containers and instantly run it.
```shell
docker-compose up
```

Navigate to `http://localhost:3030/` and develop.

To re-build it just add `--build` at the end of command.

## <a name="prod"></a> Production

You won't be able run application until ENV configuration isn't created.

Build and Run application 
```shell
docker-compose -f docker-compose.prod.yml up
```
Navigate to `http://localhost:8081/`.

To re-build it just add `--build` at the end of command.

## <a name="todo"></a> TODO
- ~~Tags~~
- ~~Page transitions (animations)~~
- ~~Accessibility~~
- Profile
- Change password
- Change name

[oauth-register]: https://stackapps.com/apps/oauth/register
[docker-for-mac]: https://store.docker.com/editions/community/docker-ce-desktop-mac
[docker-for-windows]: https://store.docker.com/editions/community/docker-ce-desktop-windows
