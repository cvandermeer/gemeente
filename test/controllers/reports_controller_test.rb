require 'test_helper'

class ReportsControllerTest < ActionController::TestCase
  setup :initialize_report
  setup :login_user

  private

  def initialize_report
    @report = reports(:report1)
  end

  def login_user
    sign_in users(:user_admin)
  end
end
