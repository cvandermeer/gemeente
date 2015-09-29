class ReportsController < ApplicationController
  before_action :authenticate_user!, except: :index
  before_action :set_report, except: [:index, :new, :create]
  layout false, except: :index

  def index
    @reports = Report.all
  end

  def new
    @report = Report.new
    render 'form'
  end

  def create
    @report = Report.new(report_params)
    if @report.save
      render @report
    else
      render 'form'
    end
  end

  def edit
    render 'form'
  end

  def update
    if @report.update(report_params)
      render @report
    else
      render 'form'
    end
  end

  def delete
    render json: @report
  end

  def destroy
    render json: @report if @report.destroy
  end

  private

  def report_params
    params.require(:report).permit(:title, :description, :street, :housenumber, :town,
                                   :start_date, :end_date, :start_time, :end_time, :latitude,
                                   :longitude)
  end

  def set_report
    @report = Report.find(params[:id])
  end
end