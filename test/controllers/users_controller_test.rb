require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  include Devise::TestHelpers
  setup :initialize_user

  def teardown
    @user = nil
  end

  test 'user authentication error' do
    assert_raises(Exception) { get :show, id: @user }
  end

  test 'user authentication no error' do
    sign_in @user
    get :show, id: @user
    assert_response :success
  end

  private

  def initialize_user
    @user = users(:user1)
  end
end
