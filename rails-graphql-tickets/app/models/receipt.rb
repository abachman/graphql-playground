class Receipt < ApplicationRecord
  belongs_to :customer

  include AASM

  aasm do
    state :draft, initial: true
    state :final
    state :cancelled

    event :checkout do
      transitions from: :draft, to: :final
    end

    event :cancel do
      transitions from: :draft, to: :cancelled
    end
  end
end
