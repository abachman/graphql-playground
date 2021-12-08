# syntax=docker/dockerfile:1
FROM ruby:2.7.3
RUN apt-get update -qq && apt-get install -y postgresql-client

ENV APP_HOME /rails
WORKDIR ${APP_HOME}
ADD Gemfile* ${APP_HOME}/

ENV BUNDLE_GEMFILE=$APP_HOME/Gemfile \
  BUNDLE_JOBS=2 \
  BUNDLE_PATH=/bundle
RUN bundle install

COPY bin/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3001

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3001"]
