require 'rails_helper'

module Mutations
  RSpec.describe SignInUser, type: :request do
    describe '.resolve' do
      def query
        <<~GQL
          mutation {
            createOrder {
              receipt {
                id

                customer {
                  id
                  name
                  email
                  user {
                    id
                    name
                    email
                  }
                }
              }
            }
          }
        GQL
      end

      let(:performance) { create(:performance) }
      let(:user) { create(:user) }

      it 'creates an empty receipt' do
        post '/graphql',
             params: {
               query: query,
             },
             headers: authentication_header(user)

        json = JSON.parse(response.body)

        # see json
        data = json['data']['createOrder']

        expect(data).to have_key('receipt')
      end
    end
  end
end
