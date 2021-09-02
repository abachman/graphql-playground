module Types
  class ProductionType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: true
    field :organization_id, Integer, null: false
    field :runtime_minutes, Integer, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :performanceCount, Integer, null: false

    def performanceCount
      object.performances.count
    end

    field :performances,
          [Types::PerformanceType],
          null: true,
          description: 'Performances of the given production'

    field :ticket_types, [Types::TicketTypeType], null: true
  end
end
