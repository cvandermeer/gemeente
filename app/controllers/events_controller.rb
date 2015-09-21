class EventsController < ApplicationController
  before_action :set_event, except: [:index, :new, :create]

  def index
    @events = Event.all
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

  def delete
    render json: @event
  end

  def destroy
    render json: @event if @event.destroy
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
