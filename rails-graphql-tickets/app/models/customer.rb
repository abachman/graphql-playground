class Customer < ApplicationRecord
  has_many :customers_organizations, dependent: :destroy
  has_many :organizations, through: :customers_organizations
end
