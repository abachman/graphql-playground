class CustomersOrganization < ApplicationRecord
  belongs_to :customer
  belongs_to :organization
end
