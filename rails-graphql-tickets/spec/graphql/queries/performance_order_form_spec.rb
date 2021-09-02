require 'rails_helper'

module Queries
  RSpec.describe 'query performance_order_form', type: :request do
    def query
      <<~GQL
        query($id: ID!) {
          performanceOrderForm(id: $id) {
            production { id title }
            performance { id }
            ticketTypes { id name priceInCents }
          }
        }
      GQL
    end

    describe '.resolve' do
      let(:user) { create(:user) }
      let(:performance) { create(:performance) }

      it 'returns a performance order form' do
        post '/graphql',
             params: {
               query: query,
               variables: {
                 id: performance.id,
               },
             },
             headers: authentication_header(user)

        expect(response).to be_successful

        json = JSON.parse(response.body)

        # see json
        data = json['data']['performanceOrderForm']

        expect(data).to_not be_nil

        %w[production performance ticketTypes].each do |key|
          expect(data).to have_key(key)
        end
      end

      it "returns nothing when performance doesn't exist" do
        post '/graphql', params: { query: query, variables: { id: 999_999 } }
        expect(response).to be_successful

        json = JSON.parse(response.body)
        data = json['data']['performanceOrderForm']

        expect(data).to be_nil
      end
    end
  end
end
