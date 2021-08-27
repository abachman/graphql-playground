module Mutations
  class CreateOrder < BaseMutation
    null true

    def resolve()
      { receipt: nil }
    end
  end
end
