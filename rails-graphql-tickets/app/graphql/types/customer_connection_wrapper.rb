module Types
  class CustomerConnectionWrapper < Types::BaseObject
    Input = Struct.new(:organization, :query, :ids)

    field :customers, Types::Customer.connection_type, null: false
    def customers
      if object.ids
        object.ids.map do |id|
          Types::Customer::Input.new(id)
        end
        # object.organization.customers.where(id: object.ids)
      else
        object.organization.customers.search(object.query)
      end
    end

    field :customersById, Types::Customer.connection_type, connection: true, null: false
    def customersById
      object.ids.map do |id|
        Types::Customer::Input.new(id)
      end
    end
  end
end
