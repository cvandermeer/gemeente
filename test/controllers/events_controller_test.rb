require 'test_helper'

class EventsControllerTest < ActionController::TestCase
  setup :initialize_event

  def teardown
    @bill = nil
  end

  test 'should get index' do
    get :index
    assert_response :success
  end

  test 'should get new' do
    get :new
    assert_response :success
  end

  test 'should create event' do
    assert_difference('Event.count') do
      post :create, event: { title: @event.title,
                             description: @event.description,
                             street: @event.street,
                             housenumber: @event.housenumber,
                             town: @event.town,
                             start_date: @event.start_date }
    end
    assert_redirected_to root_path
  end

  private

  def initialize_event
    @event = events(:event1)
  end
end
