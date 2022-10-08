.PHONY: install-dev backend-start frontend-start pip-compile reset-db seed-db delete-db

install-dev:
	@echo "Setting environment variables\n"
	@cp .env moni-moni/server/.env
	@cp .env moni-moni/client/.env
	@echo "\nInstalling backend dependencies\n"
	@pip install -r moni-moni/server/requirements.txt
	@echo "\nInstalling frontend dependencies\n"
	@cd moni-moni/client && npm install && cd ../..

backend-start:
	@cp .env moni-moni/server/.env
	@python moni-moni/server/manage.py runserver

migrate:
	@python moni-moni/server/manage.py makemigrations
	@python moni-moni/server/manage.py migratemigrate

frontend-start:
	@cp .env moni-moni/client/.env
	@cd moni-moni/client && npm start

pip-compile:
	@pip-compile -v moni-moni/server/requirements.in

delete-db:
	@bash . .env
	@python scripts/delete_db.py

seed-db:
	@bash scripts/seed.sh
