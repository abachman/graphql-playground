class LazyCustomer
  def initialize(id)
    @id = id
    @_record = nil
  end

  def record
    @_record ||= ::Customer.find(@id)
    @_record
  end

  delegate :id, :name, :email, to: :record
end

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

    field :customersById, Types::Customer.connection_type, null: false
    def customersById
      object.ids.map do |id|
        LazyCustomer.new(id)
      end
    end
  end
end
