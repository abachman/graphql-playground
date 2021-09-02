module Types
  class TicketTypeType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :price_in_cents, Integer, null: false
    field :production_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
