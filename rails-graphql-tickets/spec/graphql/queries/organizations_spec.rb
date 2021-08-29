require 'rails_helper'

module Mutations
  RSpec.describe 'query organizations', type: :request do
    def query
      <<~GQL
        query {
          organizations {
            name
            id
          }
        }
      GQL
    end

    describe '.resolve' do
      it 'returns organizations' do
        org_1 = create(:organization)
        org_2 = create(:organization)

        post '/graphql', params: { query: query }
        expect(response).to be_successful

        json = JSON.parse(response.body)
        data = json['data']['organizations']

        expect(
          data.select { |org| org['id'].to_s == org_1.id.to_s },
        ).to be_present
        expect(
          data.select { |org| org['id'].to_s == org_2.id.to_s },
        ).to be_present
      end
    end
  end
end
