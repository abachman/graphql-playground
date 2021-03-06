module Types
  class ReceiptType < Types::BaseObject
    field :id, ID, null: false
    field :customer, Types::Customer, null: false
    field :aasm_state, String, null: false
    field :tickets, [Types::TicketType], null: false
  end
end
