# [Template] Marketing Cloud Journey Builder Activity

![Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fyusrimathews%2Fmc-journey-activity%2Fmain%2Fpackage.json&query=%24.version&label=version&color=bright)
![License](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fyusrimathews%2Fmc-journey-activity%2Fmain%2Fpackage.json&query=%24.license&label=license)

> This repository is designed to help you kickstart development of custom activities for Salesforce Marketing Cloud Journey Builder.

## Overview
Salesforce Marketing Cloud is a powerful marketing automation platform. One of its key features is Journey Builder which enables businesses to build, automate, and optimise customer journeys.

Custom Journey Builder activities provide an opportunity to extend the functionality of Journey Builder by integrating your product's features or custom actions into the marketing automation process.

## Project Setup
### Script Commands:
Install project dependencies:
```
npm install
```

Run the Express server locally:
```
npm run serve
```

Debug the Vue app front-end:
```
npm run dev
```

Start the Express server:
```
npm start
```

### Environment Variables:
| Variable | Description | Required | Default or Sample |
|---|---|---|---|
| NODE_ENV | Environment identifier used for conditional logic. | ❌ | local |
| NODE_VERSION | Required depending on hosting. | 🤔 | 18.15.0 |
| PORT | Express server port. | ❌ | 8081 |
| VUE_APP_URL | Express server URL. | ✅ | http://localhost:8081/ |
| VUE_APP_TITLE | Journey Builder activity name. | ✅ | Custom Activity |
| SFMC_MID |  Business Unit MID(s) where the Installed Packaged is enabled. | ✅ | 500042165 |
| SFMC_TENANT |  Business Unit Tenant Subdomain(s). | ✅ | mcvnkblwyrzgidx3m-u2qpk-tsfh |
| SFMC_CLIENT |  Installed Package Client ID(s). | ✅ | zp9hxgqo84e2nyz26rpkp3m9 |
| SFMC_SECRET |  Installed Package Secret Key(s). | ✅ | xqYZXcBhJ39sLmPxRvVkdGqR |
| SFMC_LOG_DE |  Data Extension External Key(s). Shared Data Extensions can be used across MID's in the same enterprise. | ✅ | A2E9F753-6D1C-4B8F-A1CD-9C408BF2E7A0 |
| JB_TIMEOUT | Milliseconds before each rest activity in the journey times out. Must be from 1000 to 100000 milliseconds. | ❌ | 20000 |
| JB_RETRY_COUNT | Times to retry each rest activity in the journey after the rest activity times out. Must be from 0 to 5. | ❌ | 0 |
| JB_RETRY_DELAY | Milliseconds before each rest activity in the journey is retried. Must be from 0 to 10000 milliseconds. | ❌ | 1000 |
| JB_CONCURRENT_REQUESTS | How many rest activities to run in parallel. Must be from 1 to 10. | ❌ | 5 |
| TREBLLE_PROJECT | Treblle Project ID.  | ❌ | pQr3XsT4uV5wYz6 |
| TREBLLE_KEY | Treblle API Key. | ❌ | gA3wMzxRQpLsYb1eXsNhFd2VoTkQUZkf |
