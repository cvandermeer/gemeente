require 'test_helper'

class NotificationsControllerTest < ActionController::TestCase
  test 'should get read' do
    get :read, id: notifications(:notification1)
  end
end
