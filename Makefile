start:
	yarn build && pm2 serve dist --spa --port 8080