require 'test_helper'

class CommunitiesControllerTest < ActionController::TestCase
  test 'should get index' do
    get :index
    assert_response :success
  end

  test 'should get community news' do
    get :news, id: communities(:community1)
    assert_response :success
  end

  test 'should get community show' do
    get :show, id: communities(:community1)
    assert_response :success
  end
end
