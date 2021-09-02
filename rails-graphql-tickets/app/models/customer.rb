class Customer < ApplicationRecord
  has_many :customers_organizations, dependent: :destroy
  has_many :organizations, through: :customers_organizations
  has_many :receipts, dependent: :nullify
  has_one :user

  def draft_receipt
    # FIXME: could create multiple draft receipts
    receipts.draft.first.presence || receipts.create
  end
end
