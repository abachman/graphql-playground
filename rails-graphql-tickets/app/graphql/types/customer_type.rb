module Types
  class CustomerType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :email, String, null: true
    field :user, Types::UserType, null: true
    field :receipts, [Types::ReceiptType], null: true
  end
end
