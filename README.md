# monzo-web

> Web interface for monzo

# Register new OAuth client with monzo

First thing we need to do is get our login credentials that will allow Monzo web to talk to Monzo's servers and fetch things like your balance and transactions.

To do this, we need to log in to the developer site.
1. First, visit https://developers.monzo.com and click `Sign in with your Monzo account`.
2. It'll take you to a login page for Monzo, click `Authorize` where you can enter the email you use to log in to Monzo.
3. Once you've entered your email address you'll get an email, click the button in the email.
4. That link will log you into the developer site (remember these instructions for later, as we'll log into Monzo web the same way)

Now that we're logged in, we can create our credentials. There are three distict credentials, they are the **client id**, which is used to identify the application itself, the **client secret**, which acts as a password of sorts and should be kept secure as you would a password, finally there's the redirect URI, this is a link that tells Monzo where to send you back to after you've logged in, in this case it will be sending you back to Monzo web.

1. Click `Clients` in the menu bar
2. Click `New OAuth client`
3. Enter a name, like `Monzo web`
4. Enter a redirect URL, which we'll put as `http://localhost:3000/fallback`
5. Add a description, as Monzo require it
6. Set the confidentiality to `Confidential`
7. Click `Submit`
8. Click on the client you've just created
9. You've now got credentials to use with Monzo web!




## Build Setup

Make sure you have Node.js [installed](https://nodejs.org/en/download/) 

Now that we have the `clientId` and the `clientSecret` set up a `.env` file

I set up an `.env-example` replace the `clientID` and `clientSecret` then rename the file to `.env`

download/clone the project and then run the following `commands`

``` bash
#  install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
