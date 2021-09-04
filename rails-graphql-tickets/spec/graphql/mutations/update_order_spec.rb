require 'rails_helper'

module Mutations
  RSpec.describe SignInUser, type: :request do
    describe '.resolve' do
      let(:user) { create(:user) }
      let(:organization) { create(:organization) }
      let(:customer) do
        create(:customer, user: user, organizations: [organization])
      end
      let(:receipt) { create(:receipt, customer: customer) }
      let(:production) { create(:production, organization: organization) }
      let(:performance) { create(:performance, production: production) }
      let(:ticket_type) { create(:ticket_type, production: production) }

      def query
        @query ||= fixture_file_read('update_order.gql')
      end

      it 'creates a receipt with tickets' do
        post '/graphql',
             params: {
               query: query,
               variables: {
                 receiptId: receipt.id,
                 update: {
                   ticketTypeQuantities: [
                     { ticketTypeId: ticket_type.id, quantity: 2 },
                   ],
                   performanceId: performance.id,
                 },
               },
             }.to_json,
             headers:
               { 'Content-Type' => 'application/json' }.merge(
                 authentication_header(user),
               )

        json = JSON.parse(response.body)
        data = json['data']['updateOrder']

        expect(data).to have_key('receipt')
        expect(data['receipt']['tickets'].size).to eq(2)
      end
    end
  end
end
