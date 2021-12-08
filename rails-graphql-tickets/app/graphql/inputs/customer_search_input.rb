module Inputs
  class CustomerSearchInput < Types::BaseInputObject
    argument :query, String, required: false
    argument :ids, [ID], required: false
  end
end
