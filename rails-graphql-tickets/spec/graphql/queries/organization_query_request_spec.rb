require 'rails_helper'

module Queries
  RSpec.describe 'query organizations', type: :request do
    def list_query
      <<~GQL
          query {
            organizations {
              name
              id
            }
          }
        GQL
    end

    it 'returns organizations' do
      org_1 = create(:organization)
      org_2 = create(:organization)

      post '/graphql', params: { query: list_query }
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

    def show_query(id:)
      <<~GQL
        query($id: ID!) {
          organization(id: $id) {
            name
            id
          }
        }
      GQL
    end

    it 'returns an organization' do
      org_1 = create(:organization)

      post '/graphql',
           params: {
             query: show_query(id: org_1.id),
             variables: {
               id: org_1.id,
             },
           }
      expect(response).to be_successful

      json = JSON.parse(response.body)
      data = json['data']['organization']

      expect(data['id']).to eq(org_1.id.to_s)
    end
  end
end
