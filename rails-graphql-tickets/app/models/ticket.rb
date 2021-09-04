class Ticket < ApplicationRecord
  belongs_to :receipt
  belongs_to :performance # which belongs to production
  belongs_to :ticket_type # which belongs to production

  has_one :production, through: :performance
end
