module Mutations
  class SignInUser < BaseMutation
    null true

    argument :credentials, Types::AuthProviderCredentialsInput, required: false

    field :token, String, null: true
    field :user, Types::UserType, null: true

    def resolve(credentials: nil)
      puts "resolve: #{credentials}"

      # basic validation
      raise 'expected credentials, received nil' unless credentials

      user = User.find_by email: credentials[:email]

      puts "user #{user}"

      # ensures we have the correct user
      raise 'failed to find user' unless user
      unless user.authenticate(credentials[:password])
        raise 'invalid password for user'
      end

      puts 'success!'

      # use Ruby on Rails - ActiveSupport::MessageEncryptor, to build a token
      crypt =
        ActiveSupport::MessageEncryptor.new(
          Rails.application.credentials.secret_key_base.byteslice(0..31),
        )
      token = crypt.encrypt_and_sign("user-id:#{user.id}")

      # context[:session][:token] = token

      { user: user, token: token }
    end
  end
end
