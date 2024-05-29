## wf-platform-fe

### RUN DEV 

## Installation

Clone .env.example to .env file
```
cp .env.example .env
```

### Node module install
```bash
$ npm install
```

### Authentication only
This setting mainly use for Authentication module. The rest of feature will not work. If you want fully feature, you can ignore this step
On .env file, change the value of VITE_AUTH_API_ENDPOINT to your locally url. 

```bash
$ VITE_AUTH_API_ENDPOINT=http://localhost:3002
```

## Running the app

```bash
# development (default port 3003)
$ npm run dev

# product mode (default port: 8080)
$ make pm2-start
```
