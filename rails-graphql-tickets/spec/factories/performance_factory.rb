FactoryBot.define do
  factory :performance do
    production
    showtime_at { rand(2..10).days.from_now }
  end
end
