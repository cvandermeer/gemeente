require 'test_helper'

class EventsControllerTest < ActionController::TestCase
  setup :initialize_event
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

  # test 'should create event' do
  #   assert_difference('Event.count') do
  #     post :create, event: { title: @event.title,
  #                            description: @event.description,
  #                            street: @event.street,
  #                            housenumber: @event.housenumber,
  #                            town: @event.town,
  #                            start_date: @event.start_date }
  #   end
  #   assert_redirected_to root_path
  # end

  # test 'should render new on create fail' do
  #   post :create, event: { title: @event.title }
  #   assert_template 'new'
  # end

  private

  def initialize_event
    @event = events(:event1)
  end

  def login_user
    sign_in users(:user1)
  end
end
