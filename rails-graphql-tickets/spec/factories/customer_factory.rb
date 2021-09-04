FactoryBot.define do
  factory :customer do
    email { Faker::Internet.email }
    name { Faker::Name.name }

    after(:create) { |record| record.organizations << create(:organization) }
  end
end
