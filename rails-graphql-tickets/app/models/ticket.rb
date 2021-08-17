class Ticket < ApplicationRecord
  belongs_to :receipt
  belongs_to :performance
  belongs_to :ticket_type
end
