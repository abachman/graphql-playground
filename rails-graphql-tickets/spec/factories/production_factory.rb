FactoryBot.define do
  factory :production do
    title { Faker::Commerce.product_name.titleize }
    organization
    runtime_minutes { rand(20..200) }

    after(:create) do |production|
      create_list(:ticket_type, 3, production: production)
    end
  end
end
