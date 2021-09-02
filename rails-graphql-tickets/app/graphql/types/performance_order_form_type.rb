module Types
  class PerformanceOrderFormType < Types::BaseObject
    field :performance, Types::PerformanceType, null: false
    field :production, Types::ProductionType, null: false
    field :organization, Types::OrganizationType, null: false
    field :ticket_types, [Types::TicketTypeType], null: false

    def performance
      object
    end

    def production
      object.production
    end

    def organization
      object.production.organization
    end

    def ticket_types
      object.production.ticket_types
    end
  end
end
