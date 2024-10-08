pm2-start:
	yarn build && pm2 start ecosystem.config.cjs
pm2-restart:
	yarn build && pm2 restart wf-platform-fe