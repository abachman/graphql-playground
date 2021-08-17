module Types
  class TicketType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :price_in_cents, Integer, null: true
    field :production_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
