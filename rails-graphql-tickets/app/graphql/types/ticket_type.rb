module Types
  class TicketType < Types::BaseObject
    field :id, ID, null: false
    field :ticket_type, Types::TicketTypeType, null: false
    field :performance, Types::PerformanceType, null: false
  end
end
