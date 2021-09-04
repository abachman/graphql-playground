module Queries
  module OrganizationQuery
    extend ActiveSupport::Concern

    included do
      field :organization, Types::OrganizationType, null: false do
        description 'A single organization'
        argument :id, GraphQL::Types::ID, required: true
      end

      field :organizations,
            [Types::OrganizationType],
            null: true,
            description: 'All organizations'
    end

    def organization(id:)
      Organization.find(id)
    end

    def organizations
      Organization.all
    end
  end
end
