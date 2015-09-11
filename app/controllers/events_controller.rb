class EventsController < ApplicationController
  def index
    @events = Event.all
  end

  def new
    @event = Event.new
    render partial: 'new', event: @event
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render json: @event
    else
      render partial: 'new', event: @event
    end
  end

  def edit

  end

  def update
    if @event.update(event_params)
      render json: @event
    else
      render partial: 'new', event: @event
    end
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :street, :housenumber, :town,
                                  :start_date, :end_date, :start_time, :end_time, :latitude,
                                  :longitude)
  end
end
