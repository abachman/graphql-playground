class User < ApplicationRecord
  include AuthenticationToken

  has_secure_password

  validates :email, presence: true, uniqueness: true

  belongs_to :organization
end
