module Mutations
  class CreatePerformance < BaseMutation
    null true

    argument :production_id, ID, required: true
    argument :performance, Inputs::PerformanceInput, required: true

    field :performance, Types::PerformanceType, null: false
    field :production, Types::ProductionType, null: false

    def resolve(production_id:, performance:)
      current_user = context[:current_user]

      unless current_user
        raise GraphQL::ExecutionError, 'expected authenticated user'
      end

      production =
        current_user.organization.productions.find_by(id: production_id)

      # ensures we have a production owned by the current user
      unless production
        raise GraphQL::ExecutionError, 'failed to find production'
      end

      p = production.performances.create(performance.to_h)

      { performance: p, production: production }
    end
  end
end
