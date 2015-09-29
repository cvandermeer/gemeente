require 'test_helper'

class UserFlowTest < ActionDispatch::IntegrationTest
  include Capybara::DSL
  setup :initialize_report

  def teardown
    @report = nil
  end

  # test 'should create an report' do
  #   visit('/')
  #   click_link 'Evenement aanmaken'
  #   # Dit kan niet worden uitgevoerd omdat wordt aangeroepen met AJAX
  #   # fill_in('#report_title', with: 'Zevenkamp')
  #   # fill_in('report_description', with: @report.description)
  #   # fill_in('report_street', with: @report.street)
  #   # fill_in('report_housenumber', with: @report.housenumber)
  #   # fill_in('report_town', with: @report.town)
  #   # fill_in('report_start_date', with: @report.start_date)
  #   # click_button 'Aanmaken'
  #   # assert_selector 'li.report', text: 'Zevenkamp'
  # end

  private

  def initialize_report
    @report = reports(:report1)
  end
end
