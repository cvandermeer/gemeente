require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  setup :initialize_user

  def teardown
    @user = nil
  end

  test 'user authentication error' do
    get :show, id: @user
    assert_redirected_to root_path
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
