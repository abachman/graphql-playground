class ReceiptUpdater
  def self.process(receipt:, update:) # Receipt, Inputs::UpdateOrderInput
    update.ticket_type_quantities.each do |ttq|
      type_count =
        receipt.tickets.where(ticket_type_id: ttq.ticket_type_id).count
      if type_count < ttq.quantity
        # asked for more
        (ttq.quantity - type_count).times do
          receipt.tickets.create(
            ticket_type_id: ttq.ticket_type_id,
            performance_id: update.performance_id,
          )
        end
      elsif type_count > ttq.quantity
        # asked for fewer
        (type_count - ttq.quantity).times { receipt.tickets.last.destroy }
      end
    end
  end
end
