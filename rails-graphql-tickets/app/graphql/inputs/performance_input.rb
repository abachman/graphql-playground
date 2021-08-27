module Inputs
  class PerformanceInput < Types::BaseInputObject
    argument :name, String, required: false
    argument :showtime_at, GraphQL::Types::ISO8601DateTime, required: true
    argument :doors_open_at, GraphQL::Types::ISO8601DateTime, required: false
  end
end
