module Types
  class Customer < Types::BaseObject
    Input = Struct.new(:id)

    delegate :name, :email, :user, :receipts, to: :record

    field :id, ID, null: false
    def id
      object.id
    end

    field :name, String, null: true
    field :email, String, null: true
    field :user, Types::UserType, null: true
    field :receipts, [Types::ReceiptType], null: true

    private

    def record
      return object if object.is_a?(::Customer)
      @record ||= ::Customer.find(object.id)
    end
  end
end
