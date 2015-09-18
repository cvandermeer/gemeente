class EventsController < ApplicationController
  before_action :set_event, only: [:edit, :update]

  def index
    @events = Event.all
    @event = Event.new
  end

  def new
    @event = Event.new
    render partial: 'form', locals: { event: @event }
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render @event
    else
      render partial: 'form', locals: { event: @event }
    end
  end

  def edit
    render partial: 'form', locals: { event: @event }
  end

  def update
    if @event.update(event_params)
      render @event
    else
      render partial: 'form', locals: { event: @event }
    end
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :street, :housenumber, :town,
                                  :start_date, :end_date, :start_time, :end_time, :latitude,
                                  :longitude)
  end

  def set_event
    @event = Event.find(params[:id])
  end
end
