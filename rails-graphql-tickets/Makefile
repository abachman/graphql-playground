.PHONY: help bundle test

APP=rails

default: help

logs: #: Tails the logs for the $(APP) (tail -f log/development.log)
	docker-compose logs -f $(APP)

build: #: rebuild app console
	docker-compose build $(APP)

routes: #: Rails routes (rake routes)
	docker-compose run --rm $(APP) bundle exec rails routes

test: #: Run the tests
	docker-compose run -e RAILS_ENV=test --rm $(APP) bundle exec rspec

bundle: #: Installs gems via down, command, up
	docker-compose down $(APP)
	docker-compose run $(APP) bundle install
	docker-compose up -d $(APP)

console: #: Start a rails console
	docker-compose run --rm $(APP) bundle exec rails console

c: console

bash: #: Start a bash shell
	docker-compose run --rm $(APP) bash

dbsetup: #: run db:migrate
	docker-compose run --rm $(APP) bundle exec rails db:drop db:create db:schema:load db:seed

dbmigrate: #: run db:migrate
	docker-compose run --rm $(APP) bundle exec rails db:migrate
	docker-compose run --rm -e RAILS_ENV=test $(APP) bundle exec rails db:migrate

dbcreate: #: Create the database
	docker-compose run --rm $(APP) bundle exec rails db:create db:schema:load

dbseed: #: Seed the database
	docker-compose run --rm $(APP) bundle exec rails db:seed

dbdrop: #: Drop the database
	docker-compose run --rm $(APP) bundle exec rails db:drop

help: #: Show help topics
	@grep "#:" Makefile* | grep -v "@grep" | sort | sed "s/\([A-Za-z_ -]*\):.*#\(.*\)/$$(tput setaf 3)\1$$(tput sgr0)\2/g"
