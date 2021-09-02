module Mutations
  class CreateOrder < BaseMutation
    null true

    field :receipt, Types::ReceiptType, null: false

    def resolve()
      # current_customer = context[:current_customer]
      current_user = context[:current_user]

      unless current_user
        raise GraphQL::ExecutionError, 'authenticated user required'
      end

      current_customer =
        current_user.customer.presence || current_user.create_customer

      receipt = current_customer.draft_receipt

      { receipt: receipt }
    end
  end
end
