# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts '--- db:seed ---'

RUNTIMES = [30, 60, 90, 120, 150]

customers = []
100.times do
  customers << Customer.create!(
    name: Faker::Name.name,
    email: Faker::Internet.email,
  )
end

3.times do
  # customers
  # org + performances
  org =
    Organization.create!(
      name: "#{Faker::Commerce.color} #{Faker::Ancient.titan}".titleize,
    )
  puts "[org] populate #{org.name}"

  rand(50..75).times do
    org.customers << customers.sample
  end


  rand(2..4).times do
    User.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
      organization: org,
      password: 'password',
    )
  end

  rand(2..8).times do
    production =
      Production.create!(
        title: Faker::Commerce.product_name.titleize,
        organization: org,
        runtime_minutes: RUNTIMES.sample,
      )

    rand(2..4).times do
      TicketType.create!(
        production: production,
        price_in_cents: (Faker::Commerce.price * 100).floor,
        name: Faker::Commerce.material,
      )
    end

    at_time = rand(10..60).days.from_now
    rand(4..10).times do
      Performance.create!(production: production, showtime_at: at_time)
      at_time += 24.hours
    end
  end
end
