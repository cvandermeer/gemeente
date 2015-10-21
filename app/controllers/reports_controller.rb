class ReportsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show, :info_window, :new, :create]
  before_action :set_report, except: [:index, :new, :create]
  before_action :authenticate_owner, only: [:edit, :update, :destroy]
  before_action :authenticate_community_owner, only: [:edit, :update, :destroy]
  layout false, except: [:index]

  def index
    # Find by geocode
    @reports = Report.unresolved
  end

  def show
    render 'show'
  end

  def info_window
    render 'info_window'
  end

  def new
    @report = Report.new
    render 'form'
  end

  def create
    @report = Report.new(report_params)
    @report.user ||= current_user
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

  def authenticate_owner
    message = 'U bent niet de eigenaar van deze melding!'
    redirect_to root_path, alert: message if current_user.user? && !(@report.user == current_user)
  end

  def authenticate_community_owner
    message = 'U bent geen beheerder van deze gemeente!'
    redirect_to root_path, alert: message if current_user.community? && !(@report.community == current_user.community)
  end

  def set_report
    @report = Report.find(params[:id])
  end

  def report_params
    params.require(:report).permit(:title, :description, :address, :email, :town, :latitude, :longitude, :resolved_at)
  end
end
