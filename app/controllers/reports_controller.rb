class ReportsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :dashboard]
  before_action :set_report, only: [:edit, :update, :destroy, :delete]
  layout false, except: [:index, :community_dashboard, :admin_dashboard]

  def dashboard
    if user_signed_in?
      handle_signed_in_redirect
    else
      redirect_to reports_path
    end
  end

  def handle_signed_in_redirect
    if current_user.user?
      redirect_to reports_path
    elsif current_user.community?
      redirect_to community_dashboard_path
    elsif current_user.admin?
      redirect_to admin_dashboard_path
    end
  end

  def community_dashboard
    @reports = Report.all
  end

  def admin_dashboard
    @reports = Report.all
  end

  def index
    @reports = Report.all
  end

  def new
    @report = Report.new
    render 'form'
  end

  def create
    @report = Report.new(report_params)
    @report.set_zipcode
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
