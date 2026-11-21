# npm Commands

This requires that you've installed Node.JS and NPM.
You need this for the development, but you don't need it
when deploying using Docker.

## Warning

You have to run ``npm install`` and ``npm run build`` and restart the server again
after running ``git pull``. otherwise you will keep using the old version.

## npm install

This install all dependencies.

## npm run build

This "compiles" the application.

## npm start

This runs all pending migrations and starts the server.

## npm run lint:fix

This fixes the causes of lint warnings (where possible). This is only needed
during the development.
