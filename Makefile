start:
	yarn build && pm2 start dist --spa --port 8080