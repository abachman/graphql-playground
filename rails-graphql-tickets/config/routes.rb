Rails.application.routes.draw { post '/graphql', to: 'graphql#execute' }
