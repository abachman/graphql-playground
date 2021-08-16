.PHONY: help bundle

APP=rails

default: help

logs: #: Tails the logs for the $(APP) (tail -f log/development.log)
	docker-compose logs -f $(APP)

routes: #: Rails routes (rake routes)
	docker-compose run --rm $(APP) bundle exec rails routes

test: #: Run the tests
	docker-compose run --rm $(APP) bundle exec rspec

bundle: #: Installs gems, docker-compose down must be run before
	docker-compose run --rm $(APP) bundle install

console: #: Start a rails console
	docker-compose run --rm $(APP) bundle exec rails console

bash: #: Start a bash shell
	docker-compose run --rm $(APP) bash

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