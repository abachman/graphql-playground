require 'rails_helper'

module Mutations
  RSpec.describe SignInUser, type: :request do
    def query
      <<~GQL
        mutation($productionId: ID!, $performance: PerformanceInput!) {
          createPerformance(
            productionId: $productionId,
            performance: $performance
          ) {
            performance {
              id
              name
              showtimeAt
            }
            production {
              id
              title
            }
          }
        }
      GQL
    end

    let(:author) { create(:user) }
    let(:other_author) { create(:user) }

    describe '.resolve' do
      it 'creates a performance' do
        sign_in(author)

        production = create(:production, organization: author.organization)

        expect {
          post '/graphql',
               params: {
                 query: query,
                 variables: {
                   productionId: production.id,
                   performance: {
                     name: 'Some Night',
                     showtimeAt: '2023-03-20T12:00:00Z',
                   },
                 },
               }
          expect(response).to be_successful
        }.to change(Performance, :count).by(1)

        json = JSON.parse(response.body)
        data = json['data']['createPerformance']

        expect(data).to have_key('performance')
        expect(data).to have_key('production')
      end
    end

    it 'prevents cross-organization performance creation' do
      sign_in(author)

      production = create(:production, organization: other_author.organization)

      post '/graphql',
           params: {
             query: query,
             variables: {
               productionId: production.id,
               performance: {
                 name: 'Some Night',
                 showtimeAt: '2023-03-20T12:00:00Z',
               },
             },
           }

      json = JSON.parse(response.body)

      puts "[test] received #{json}"
      data = json['errors']
      expect(data).to be_present

      expect(data[0]['message']).to eq('failed to find production')
    end
  end
end
