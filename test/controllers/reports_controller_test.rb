require 'test_helper'

class ReportsControllerTest < ActionController::TestCase
  setup :initialize_report
  setup :login_user

  def teardown
    @bill = nil
  end

  # test 'should get index' do
  #   get root_path
  #   assert_response :success
  # end

  # test 'should get new' do
  #   get :new
  #   assert_response :success
  # end

  # test 'should create report' do
  #   assert_difference('Report.count') do
  #     post :create, report: { title: @report.title,
  #                             description: @report.description,
  #                             street: @report.street,
  #                             housenumber: @report.housenumber,
  #                             town: @report.town,
  #                             start_date: @report.start_date }
  #   end
  #   assert_redirected_to root_path
  # end

  # test 'should render new on create fail' do
  #   post :create, report: { title: @report.title }
  #   assert_template 'new'
  # end

  private

  def initialize_report
    @report = reports(:report1)
  end

  def login_user
    sign_in users(:user1)
  end
end
