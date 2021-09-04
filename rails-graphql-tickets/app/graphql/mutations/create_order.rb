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

      customer = current_user.customer.presence || current_user.create_customer
      receipt = customer.draft_receipt

      { receipt: receipt }
    end
  end
end
