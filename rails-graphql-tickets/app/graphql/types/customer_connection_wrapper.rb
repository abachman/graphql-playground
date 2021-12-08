module Types
  class CustomerConnectionWrapper < Types::BaseObject
    Input = Struct.new(:organization, :query, :ids)

    field :customers, Types::Customer.connection_type, null: false
    def customers
      if object.ids
        object.organization.customers.where(id: object.ids)
      else
        object.organization.customers.search(object.query)
      end
    end
  end
end
