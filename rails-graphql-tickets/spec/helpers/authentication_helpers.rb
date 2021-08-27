module AuthenticationHelpers
  def sign_in(user)
    allow_any_instance_of(ActionDispatch::Request).to receive(:session) {
      { token: user.token }
    }
  end
end
