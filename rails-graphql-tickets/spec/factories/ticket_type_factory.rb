FactoryBot.define do
  factory :ticket_type do
    name { Faker::Games::SuperSmashBros.fighter.titleize }
    price_in_cents { (Faker::Commerce.price * 100).floor }
  end
end
