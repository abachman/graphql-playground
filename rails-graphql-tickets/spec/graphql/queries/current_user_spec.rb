require 'rails_helper'

module Queries
  RSpec.describe 'query current_user', type: :request do
    def query
      <<~GQL
        query {
          currentUser {
            id
            email
          }
        }
      GQL
    end

    describe '.resolve' do
      let!(:user) { create(:user) }

      it 'returns user when signed in' do
        post '/graphql',
             params: {
               query: query,
             },
             headers: authentication_header(user)
        expect(response).to be_successful

        json = JSON.parse(response.body)
        data = json['data']['currentUser']

        expect(data).to_not be_nil
        expect(data['id']).to eq(user.id.to_s)
      end

      it 'returns nothing when not signed in' do
        post '/graphql', params: { query: query }
        expect(response).to be_successful

        json = JSON.parse(response.body)
        data = json['data']['currentUser']

        expect(data).to be_nil
      end
    end
  end
end
