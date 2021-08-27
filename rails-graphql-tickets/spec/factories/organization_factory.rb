FactoryBot.define do
  factory :organization do
    name { "#{Faker::Commerce.color} #{Faker::Ancient.titan}".titleize }
  end
end
