require 'test_helper'

class UserFlowTest < ActionDispatch::IntegrationTest
  include Capybara::DSL
  setup :initialize_event

  def teardown
    @event = nil
  end

  # test 'should create an event' do
  #   visit('/')
  #   click_link 'Evenement aanmaken'
  #   # Dit kan niet worden uitgevoerd omdat wordt aangeroepen met AJAX
  #   # fill_in('#event_title', with: 'Zevenkamp')
  #   # fill_in('event_description', with: @event.description)
  #   # fill_in('event_street', with: @event.street)
  #   # fill_in('event_housenumber', with: @event.housenumber)
  #   # fill_in('event_town', with: @event.town)
  #   # fill_in('event_start_date', with: @event.start_date)
  #   # click_button 'Aanmaken'
  #   # assert_selector 'li.event', text: 'Zevenkamp'
  # end

  private

  def initialize_event
    @event = events(:event1)
  end
end
