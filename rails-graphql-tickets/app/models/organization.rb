class Organization < ApplicationRecord
  has_many :users, dependent: :destroy

  has_many :customers_organizations, dependent: :destroy
  has_many :customers, through: :customers_organizations

  has_many :productions, dependent: :nullify
end
