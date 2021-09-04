module Types
  class PerformanceOrderFormType < Types::BaseObject
    field :performance, Types::PerformanceType, null: false
    field :production, Types::ProductionType, null: false
    field :organization, Types::OrganizationType, null: false
    field :ticket_types, [Types::TicketTypeType], null: false
    field :receipt, Types::ReceiptType, null: false

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

    def receipt
      current_user = context[:current_user]

      unless current_user
        raise GraphQL::ExecutionError, 'authenticated user required'
      end

      customer = current_user.customer.presence || current_user.create_customer
      customer.draft_receipt
    end
  end
end
