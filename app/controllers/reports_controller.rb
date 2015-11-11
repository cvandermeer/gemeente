class ReportsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show, :markers, :report_index, :info_window, :new, :create]
  before_action :set_report, except: [:index, :new, :create, :markers]
  before_action :authenticate_owner, only: [:edit, :update, :destroy]
  before_action :authenticate_community_owner, only: [:edit, :update, :destroy]
  layout false, except: [:index, :show]

  def index
    # @reports = Report.unresolved
    # This is to fill up the page
    @featured = Report.where.not(image_one: nil).limit(4)
    @recents = Report.all.limit(3)
  end

  def show
    render 'show'
  end

  def markers
    @reports = Report.near([params[:lat], params[:lng]], params[:km], units: :km)
    render json: @reports
  end

  def report_index
    render partial: 'report', locals: { report: @report }
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
      respond_to do |format|
        format.js
      end
    else
      render 'form'
    end
  end

  def edit
    render 'form'
  end

  def update
    if @report.update(report_params)
      respond_to do |format|
        format.js
      end
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
    params.require(:report).permit(:title, :description, :address, :email, :town, :latitude,
                                   :longitude, :resolved_at, :image_one, :image_two, :image_three)
  end
end
