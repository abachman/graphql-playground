module Types
  class ReceiptType < Types::BaseObject
    field :id, ID, null: false
    field :customer, Types::CustomerType, null: false
    field :aasm_state, String, null: false
  end
end
