module Mutations
  class UpdateOrder < BaseMutation
    null true

    argument :receipt_id, ID, required: true
    argument :update, Inputs::UpdateOrderInput, required: true

    field :receipt, Types::ReceiptType, null: false

    # bulk update a receipt for a given performance
    def resolve(receipt_id:, update:)
      current_user = context[:current_user]
      unless current_user
        raise GraphQL::ExecutionError, 'authenticated user required'
      end

      current_customer = current_user.customer
      unless current_customer
        raise GraphQL::ExecutionError, 'customer should already exist'
      end

      receipt = current_customer.draft_receipt
      ReceiptUpdater.process(receipt: receipt, update: update)

      { receipt: current_customer.draft_receipt }
    end
  end
end
