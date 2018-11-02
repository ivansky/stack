# Stackoverflow Search Angular


## Agenda

 1. [Prerequisites](#pre)
 2. [Configuration](#config)
 3. [Development](#dev)
 4. [Production](#prod)
 5. [TODO](#todo)

## <a name="pre"></a> Prerequisites
To develop and build for prod you should use **Docker**.

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

To run front, auth and api services just run _docker-compose_.

It will build containers and instantly run it.
```shell
docker-compose up
```

Navigate to `http://localhost:3030/` and develop.

To re-build it just add `--build` at the end of command.

## <a name="prod"></a> Production
Build images
```shell
docker-compose -f docker-compose.prod.yml build
```

Run `ng build` to build the project. 
The build artifacts will be stored in the `dist/` directory. 
Use the `--prod` flag for a production build.

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
