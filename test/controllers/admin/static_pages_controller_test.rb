require 'test_helper'

module Admin
  class StaticPagesControllerTest < ActionController::TestCase
    setup :login_user

    def teardown
      @bill = nil
    end

    test 'should get dashboard' do
      get :dashboard
      assert_response :success
    end

    private

    def login_user
      sign_in users(:user_admin)
    end
  end
end
