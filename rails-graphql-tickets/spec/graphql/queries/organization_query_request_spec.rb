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

    def show_query
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
             query: show_query,
             variables: {
               id: org_1.id,
             },
           }
      expect(response).to be_successful

      json = JSON.parse(response.body)
      data = json['data']['organization']

      expect(data['id']).to eq(org_1.id.to_s)
    end

    context 'customers' do
      let(:organization) { create(:organization) }
      let!(:customers) { create_list(:customer, 20, organizations: [organization]) }

      describe 'plain connection' do
        def customers_query
          <<~GQL
            query($id: ID!, $cursor: String) {
              organization(id: $id) {
                __typename
                id
                name
                customers(after: $cursor) {
                  totalCount
                  pageInfo {
                    hasPreviousPage
                    hasNextPage
                    startCursor
                    endCursor
                  }
                  edges {
                    cursor
                    node {
                      __typename
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

        def do_request(after: nil)
          post '/graphql',
              params: {
                query: customers_query,
                variables: {
                  id: organization.id,
                  cursor: after
                },
              }
          expect(response).to be_successful

          json = JSON.parse(response.body)

          if json.nil?
            see response.body
            raise 'unexpected error response'
          end

          if json['errors']
            see json
            raise 'unexpected error response'
          end

          data = json['data']['organization']

          # if after
          #   puts "AFTER #{after}"
          # end
          # see data

          data
        end

        it 'returns paginated customers' do
          seen = {}

          collect = ->(edges) do
            edges.each {|customer_edge|
              id = customer_edge['node']['id']
              expect(seen).to_not have_key(id)
              seen[id] = true
            }
          end

          data = do_request
          collect.call(data['customers']['edges'])

          data = do_request(after: data['customers']['pageInfo']['endCursor'])
          collect.call(data['customers']['edges'])

          data = do_request(after: data['customers']['pageInfo']['endCursor'])
          collect.call(data['customers']['edges'])

          data = do_request(after: data['customers']['pageInfo']['endCursor'])
          collect.call(data['customers']['edges'])

          data = do_request(after: data['customers']['pageInfo']['endCursor'])
          collect.call(data['customers']['edges'])

          customers.each do |customer|
            expect(seen).to have_key(customer.id.to_s)
          end
        end
      end

      describe 'wrapped connection search string' do
        def customers_query
          <<~GQL
            query($id: ID!, $cursor: String, $input: CustomerSearchInput!) {
              organization(id: $id) {
                __typename
                id
                name
                customerSearch(input: $input) {
                  customers(after: $cursor) {
                    pageInfo {
                      hasPreviousPage
                      hasNextPage
                      startCursor
                      endCursor
                    }
                    edges {
                      cursor
                      node {
                        __typename
                        id
                        name
                        email
                      }
                    }
                  }
                }
              }
            }
          GQL
        end

        def do_request(after: nil)
          post '/graphql',
              params: {
                query: customers_query,
                variables: {
                  id: organization.id,
                  cursor: after,
                  input: { query: '@' }
                },
              }
          expect(response).to be_successful

          json = JSON.parse(response.body)

          if json['errors']
            see json
            fail 'unexpected error response'
          end

          data = json['data']['organization']
        end

        it 'returns paginated customers' do
          seen = {}

          collect = lambda do |edges|
            edges.each do |customer_edge|
              id = customer_edge['node']['id']
              expect(seen).to_not have_key(id)
              seen[id] = true
            end
          end

          data = do_request
          collect.call(data['customerSearch']['customers']['edges'])

          data = do_request(after: data['customerSearch']['customers']['pageInfo']['endCursor'])
          collect.call(data['customerSearch']['customers']['edges'])

          data = do_request(after: data['customerSearch']['customers']['pageInfo']['endCursor'])
          collect.call(data['customerSearch']['customers']['edges'])

          data = do_request(after: data['customerSearch']['customers']['pageInfo']['endCursor'])
          collect.call(data['customerSearch']['customers']['edges'])

          data = do_request(after: data['customerSearch']['customers']['pageInfo']['endCursor'])
          collect.call(data['customerSearch']['customers']['edges'])

          customers.each do |customer|
            expect(seen).to have_key(customer.id.to_s)
          end
        end
      end

      describe 'wrapped connection id list' do
        let(:customer_ids) { customers.map(&:id) }

        def customers_query
          <<~GQL
            query($id: ID!, $cursor: String, $input: CustomerSearchInput!) {
              organization(id: $id) {
                __typename
                id
                name
                customerSearch(input: $input) {
                  customersById(after: $cursor) {
                    pageInfo {
                      hasPreviousPage
                      hasNextPage
                      startCursor
                      endCursor
                    }
                    edges {
                      cursor
                      node {
                        __typename
                        id
                        name
                        email
                      }
                    }
                  }
                }
              }
            }
          GQL
        end

        def do_request(after: nil)
          post '/graphql',
               params: {
                 query: customers_query,
                 variables: {
                   id: organization.id,
                   cursor: after,
                   input: { ids: customer_ids }
                 }
               }
          expect(response).to be_successful

          json = JSON.parse(response.body)

          if json['errors']
            see json
            raise 'unexpected error response'
          end

          data = json['data']['organization']
        end

        it 'returns paginated customers' do
          seen = {}

          collect = lambda do |edges|
            edges.each do |customer_edge|
              id = customer_edge['node']['id']
              expect(seen).to_not have_key(id)
              seen[id] = true
            end
          end

          edges = %w(customerSearch customersById edges)

          data = do_request
          collect.call(data.dig(*edges))

          end_cursor = %w(customerSearch customersById pageInfo endCursor)

          data = do_request(after: data.dig(*end_cursor))
          collect.call(data.dig(*edges))

          data = do_request(after: data.dig(*end_cursor))
          collect.call(data.dig(*edges))

          data = do_request(after: data.dig(*end_cursor))
          collect.call(data.dig(*edges))

          data = do_request(after: data.dig(*end_cursor))
          collect.call(data.dig(*edges))

          customers.each do |customer|
            expect(seen).to have_key(customer.id.to_s)
          end
        end
      end
    end
  end
end
