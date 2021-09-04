module Inputs
  class UpdateOrderInput < Types::BaseInputObject
    argument :ticket_type_quantities,
             [Inputs::TicketTypeQuantityInput],
             required: true
    argument :performance_id, ID, required: true
  end
end
