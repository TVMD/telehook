# Telehook

## Overview

Telehook is a template for  to use telegram chat bot using telegram webhooks and serverless function in [Netlify](https://docs.netlify.com/functions/overview/).
You will need create an accout in [Netlify](https://docs.netlify.com/functions/overview/) for deployment.
You also need to create a chatbot in telegram using [botfather](https://telegram.me/BotFather), then get BOT_KEY for your bot.

I created and ini that the bot will reply to query for crypto pricing that using [CoinMarketCap API](https://coinmarketcap.com/api/documentation/v1/#).
You can use this project as a template to create more webhook base chatbot in other platform and host it easyly in Netlify for free.

## Demo
Chat with my bot or add it to your group in telegram: @yakoolbot
![image](https://user-images.githubusercontent.com/15843661/219942915-5743364f-3b80-4882-b50b-85429534dd4d.png)



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

# Codebase structure:
- Basically everything you need is inside dir src/netlify/functions/
Each ts file you had there will be deployed as a serverless fucntion run with timeout 10s in [Netlify](https://docs.netlify.com/functions/overview/) after you deploy
- This is an Hello-word in Vite+React because Netlify doesnt allow us to create Serverless function without any web project
 I take advange of that serverless to create on demain low cost webhook to receive update from telegram and send back message

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

P/s: 
 
