class EventsController < ApplicationController
  before_action :set_event, only: [:show]

  def show
  end

  def index
    @events = Event.all
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      redirect_to root_path
    else
      render :new
    end
  end

  def new
    @event = Event.new
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(:title, :description, :street, :housenumber, :town,
                                  :start_date, :end_date, :start_time, :end_time, :latitude,
                                  :longitude)
  end
end
