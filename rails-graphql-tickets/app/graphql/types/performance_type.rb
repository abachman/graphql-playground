module Types
  class PerformanceType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :production, Types::ProductionType, null: false
    field :showtime_at, GraphQL::Types::ISO8601DateTime, null: true
    field :doors_open_at, GraphQL::Types::ISO8601DateTime, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
