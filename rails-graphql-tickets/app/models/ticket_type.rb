class TicketType < ApplicationRecord
  belongs_to :production

  has_many :tickets, dependent: :nullify
end
