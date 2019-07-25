# QA-Bot API [![Twitter](https://img.shields.io/twitter/url/https/github.com/jojo-tutor/react-error-handler.svg?style=social)](https://twitter.com/intent/tweet?text=ShoppingCartDnD:&url=https%3A%2F%2Fgithub.com%2Fjojo-tutor%2Freact-error-handler)

![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)

## About
A question and answer app where companies can filter candidates by inviting them to take the challenging tests. Candidates that took the exam will be able to secure certificate which can be verified online.

## Live (Rest API Documentation)
https://qa-bot-api.herokuapp.com/docs


## Run on Local
```sh
git clone https://github.com/jojo-tutor/qa-bot-api.git
cd qa-bot-api && yarn && yarn dev
```
## Important
Notes: For security purposes, please do not share your config files!<br>
This app will not work as intended if there are no config files.<br>
The files should be located at `shopping-cart-dnd/config/.env` in development.<br>
And at `shopping-cart-dnd/config/.env.production` in production.<br>
They both should look like this:
```env
#app
PORT=4001

#database
DB_HOST="mongo-db-url"
DB_NAME="db-name"
DB_USER="db-user"
DB_PASS="db-password"

#bcrypt
SALT_ROUNDS=10

#session - days
SESSION_MAX_AGE_IN_DAYS=7
SESSION_SECRET="session-secret"
TOKEN_LENGTH=15

#sendgrid
SENDGRID_API_KEY="sendgrid-api-key"
EMAIL_TEMPLATE="email-template-id-created-through-sendgrid"
SUPPORT_EMAIL="support@email.com"

#frontend
PORTAL_HOST="frontend-url"

#basic auth
AUTH_USER="basic-auth-user"
AUTH_PASSWORD="basic-auth-password"

#super user
SUPER_USER_EMAIL="super@admin.com"
SUPER_USER_PASSWORD="secret-password"
```

## Stack (MERN)
Mongo (Database)<br>
Express (Framework)<br>
React (Front-end)<br>
NodeJS (JS Runtime)<br>

## Other Tech
Passport (Authentication)<br>
Basic Auth (Authorization)<br>
PM2 (Production Process Manager)<br>
Winston (Logger)<br>
SendGrid (Email Delivery Platform)<br>
Swagger (API Documentation)<br>

## Authors
[Jojo E. Tutor](https://www.facebook.com/jojo-tutor "View Jojo's FB Profile")

## License
This project is licensed under the GNU GENERAL PUBLIC LICENSE - see the [LICENSE](LICENSE) file for details

Enjoy :)
