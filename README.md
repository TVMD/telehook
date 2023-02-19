# Telehook

## Overview

Telehook is a template for  to use telegram chat bot using telegram webhooks and serverless function in Netlify.
You will need create an accout in netlify for deployment.
You also need to create a chatbot in telegram using botfather, then get BOT_KEY for your bot.

I created and ini that the bot will reply to query for crypto pricing that using CoinMarketCap API.
You can use this project as a template to create more webhook base chatbot in other platform and host it easyly in Netlify for free.


## Installation

To install depedencies for Telehook, run the following command:

```
yarn install
```


## Development

To run Telehook in development mode, run the following command:

```
netlify dev --tartgetPort 8888
```


This will start a local development server and allow you to test your bot locally.

## Deployment

To deploy Telehook to production, run the following command:

```
netlify deploy --prod
```

This will deploy your bot to Netlify and make it accessible to the public.

## Environment Variables

Telehook requires the following environment variables to be set in a .env file:

- `BOT_TOKEN`: The token for your Telegram bot.
- `CMC_KEY`: The token for your CoinMarketCap API key.

