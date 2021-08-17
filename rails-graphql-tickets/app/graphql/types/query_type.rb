module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :organization, Types::OrganizationType, null: false do
      description 'A single organization'
      argument :id, ID, required: true
    end
    def organization(id:)
      Organization.find(id)
    end

    field :organizations,
          [Types::OrganizationType],
          null: true,
          description: 'All organizations'
    def organizations
      Organization.all
    end
  end
end
