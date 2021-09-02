module Types
  class QueryType < Types::BaseObject
    field :production, Types::ProductionType, null: false do
      description 'A single production'
      argument :organizationId, ID, required: true
      argument :id, ID, required: true
    end

    def production(organizationId:, id:)
      Production.find_by(id: id, organization_id: organizationId)
    end

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

    field :current_user,
          Types::UserType,
          null: true,
          description: 'Current user'

    def current_user
      context[:current_user]
    end

    field :performance_order_form,
          Types::PerformanceOrderFormType,
          null: true do
      description 'Performance order form fields'
      argument :id, ID, required: true
    end

    def performance_order_form(id:)
      Performance
        .includes(production: %i[ticket_types organization])
        .find_by(id: id)
    end
  end
end
