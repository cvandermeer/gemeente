require 'test_helper'

class EventTest < ActiveSupport::TestCase
  setup :initialize_event

  def teardown
    @event = nil
  end

  test 'should not create event without any input' do
    event = Event.new
    assert_not event.save, 'Saved an event without any input!'
  end

  test 'should not create event without title' do
    event = Event.new(description: @event.description,
                      street: @event.street,
                      housenumber: @event.housenumber,
                      town: @event.town,
                      start_date: @event.start_date)
    assert_not event.save, 'Saved an event without title!'
  end

  test 'should not create event without description' do
    event = Event.new(title: @event.title,
                      street: @event.street,
                      housenumber: @event.housenumber,
                      town: @event.town,
                      start_date: @event.start_date)
    assert_not event.save, 'Saved an event without description!'
  end

  test 'should not create event without street' do
    event = Event.new(title: @event.title,
                      description: @event.description,
                      housenumber: @event.housenumber,
                      town: @event.town,
                      start_date: @event.start_date)
    assert_not event.save, 'Saved an event without street!'
  end

  test 'should not create event without housenumber' do
    event = Event.new(title: @event.title,
                      description: @event.description,
                      street: @event.street,
                      town: @event.town,
                      start_date: @event.start_date)
    assert_not event.save, 'Saved an event without housenumber!'
  end

  test 'should not create event without town' do
    event = Event.new(title: @event.title,
                      description: @event.description,
                      street: @event.street,
                      housenumber: @event.housenumber,
                      start_date: @event.start_date)
    assert_not event.save, 'Saved an event without town!'
  end

  test 'should not create event without start_date' do
    event = Event.new(title: @event.title,
                      description: @event.description,
                      street: @event.street,
                      housenumber: @event.housenumber,
                      town: @event.town)
    assert_not event.save, 'Saved an event without start_date!'
  end

  private

  def initialize_event
    @event = events(:event1)
  end
end
