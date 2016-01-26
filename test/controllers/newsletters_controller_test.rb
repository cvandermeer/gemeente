require 'test_helper'

class NewslettersControllerTest < ActionController::TestCase
  test 'should get index' do
    get :index
    assert_response :success
  end

  test 'should get show' do
    get :show, id: newsletters(:newsletter1)
  end
end
