module Mutations
  class SignInUser < BaseMutation
    null true

    argument :credentials, Inputs::AuthProviderCredentialsInput, required: false

    field :token, String, null: true
    field :user, Types::UserType, null: true

    def resolve(credentials: nil)
      # basic validation
      raise 'expected credentials, received nil' unless credentials

      user = User.find_by email: credentials[:email]

      # ensures we have the correct user
      raise 'failed to find user' unless user
      unless user.authenticate(credentials[:password])
        raise 'invalid password for user'
      end

      # use Ruby on Rails - ActiveSupport::MessageEncryptor, to build a token
      token = user.token

      context[:session][:token] = token

      { user: user, token: token }
    end
  end
end
