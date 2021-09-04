module Types
  class ProductionType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: true
    field :organization, Types::OrganizationType, null: false
    field :runtime_minutes, Integer, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :performances, [Types::PerformanceType], null: true
    field :ticket_types, [Types::TicketTypeType], null: true

    field :performanceCount, Integer, null: false

    def performanceCount
      object.performances.count
    end
  end
end
