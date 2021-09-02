module Types
  class OrganizationType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :productions, [Types::ProductionType], null: false
    field :users, [Types::UserType], null: false
  end
end
