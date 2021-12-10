module Types
  class Organization < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :productions, [Types::ProductionType], null: false
    field :users, [Types::UserType], null: false

    field :customers, Types::Customer.connection_type, null: false

    field :customerSearch, Types::CustomerConnectionWrapper, null: false do
      argument :input, Inputs::CustomerSearchInput, required: true
    end
    def customerSearch(input:)
      Types::CustomerConnectionWrapper::Input.new(object, input.query, input.ids)
    end
  end
end
