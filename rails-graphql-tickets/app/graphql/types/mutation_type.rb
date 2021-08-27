module Types
  class MutationType < Types::BaseObject
    field :sign_in_user, mutation: Mutations::SignInUser
    field :create_performance, mutation: Mutations::CreatePerformance
  end
end
