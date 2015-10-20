class ReportsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :dashboard]
  before_action :set_report, only: [:show, :edit, :update, :destroy, :delete]
  before_action :set_reports, only: []
  layout false, except: [:index, :community_dashboard, :admin_dashboard]

  def community_dashboard
    @reports = Report.where(community: current_user.community)
  end

  def admin_dashboard
    @reports = Report.all
  end

  def index
    # Find by geocode
    @reports = Report.all
  end

  def show
    render 'show'
  end

  def new
    @report = Report.new
    render 'form'
  end

  def create
    @report = Report.new(report_params)
    @report.set_community
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
    params.require(:report).permit(:title, :description, :address, :email, :town, :latitude, :longitude)
  end

  def set_report
    @report = Report.find(params[:id])
  end
end
