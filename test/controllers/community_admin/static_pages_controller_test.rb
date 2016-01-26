require 'test_helper'

module CommunityAdmin
  class StaticPagesControllerTest < ActionController::TestCase
    setup :login_user

    test 'should get dashboard' do
      get :dashboard
      assert_response :success
    end

    test 'should get users' do
      get :users
      assert_response :success
    end

    test 'should get reports' do
      get :reports
      assert_response :success
    end

    test 'should get location_news' do
      get :location_news
      assert_response :success
    end

    private

    def login_user
      sign_in users(:user_community)
    end
  end
end
