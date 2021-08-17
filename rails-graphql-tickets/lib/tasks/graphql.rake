require "graphql/rake_task"

GraphQL::RakeTask.new(
  schema_name: "TicketsSchema",
  directory: "./export/graphql",
  dependencies: [:environment]
)
