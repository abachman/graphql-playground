class Production < ApplicationRecord
  belongs_to :organization

  has_many :performances
  has_many :ticket_types
end
