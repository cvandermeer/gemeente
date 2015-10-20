require 'test_helper'

class ReportsControllerTest < ActionController::TestCase
  setup :initialize_report
  setup :login_user

  def teardown
    @bill = nil
  end

  private

  def initialize_report
    @report = reports(:report1)
  end

  def login_user
    sign_in users(:user1)
  end
end
