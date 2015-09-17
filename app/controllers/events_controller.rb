class EventsController < ApplicationController
  before_action :set_event, only: [:edit, :update]

  def index
    @events = Event.all
  end

  def new
    @event = Event.new
    render 'new'
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render json: @event
    else
      render 'new'
    end
  end

  def edit
    render 'edit'
  end

  def update
    if @event.update(event_params)
      render json: @event
    else
      render partial: 'edit'
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
