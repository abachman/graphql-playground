FactoryBot.define do
  factory :production do
    title { Faker::Commerce.product_name.titleize }
    organization
    runtime_minutes { rand(20..200) }
  end
end
