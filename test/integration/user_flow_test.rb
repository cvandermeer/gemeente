require 'test_helper'

class UserFlowTest < ActionDispatch::IntegrationTest
  include Capybara::DSL
  setup :initialize_report

  def teardown
    @report = nil
  end

  private

  def initialize_report
    @report = reports(:report1)
  end
end
