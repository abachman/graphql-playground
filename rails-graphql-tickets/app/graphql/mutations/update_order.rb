module Mutations
  class UpdateOrder < BaseMutation
    null true

    argument :receipt_id, ID, required: true
    argument :performance_id, ID, required: true
    argument :ticket_type_id, ID, required: true
    argument :action, String, required: true

    field :receipt, Types::ReceiptType, null: false

    def resolve(receipt_id:, performance_id:, ticket_type_id:, action:)
      # current_customer = context[:current_customer]
      current_user = context[:current_user]

      unless current_user
        raise GraphQL::ExecutionError, 'authenticated user required'
      end

      { receipt: nil }
    end
  end
end
