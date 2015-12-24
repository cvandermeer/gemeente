class ReportsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show, :markers, :report_index, :info_window, :new, :create]
  before_action :set_report, except: [:index, :new, :create, :markers]
  before_action :authenticate_owner, only: [:edit, :update, :destroy]
  before_action :authenticate_community_owner, only: [:edit, :update, :destroy]
  layout false, except: [:index, :show]

  def index
  end

  def show
    render 'show'
  end

  def markers
    if params[:id]
      show_marker
    else
      near_markers
    end
  end

  def show_marker
    render json: Report.find(params[:id]).as_json(include: :category)
  end

  def near_markers
    render json: Report.near([params[:lat], params[:lng]],
                             params[:km], units: :km).as_json(only: [:latitude, :longitude, :id],
                                                              include: :category)
  end

  def report_index
    render partial: 'report', locals: { report: @report }
  end

  def info_window
    render 'info_window'
  end

  def new
    @report = Report.new
    @report_category = ReportCategory.new
  end

  def create
    @report = Report.new(report_params)
    @report.user ||= current_user
    if @report.save
      respond_to do |format|
        format.js
      end
    else
      @report_category = ReportCategory.new
      render partial: 'form', locals: { report: @report, report_category: @report_category }
    end
  end

  def edit
    @report_category = @report.report_category
  end

  def update
    if params[:report][:status] && @report.update(report_params)
      redirect_to community_admin_reports_path, notice: "Status van #{@report.title} aangepast naar #{@report.status}"
    elsif @report.update(report_params)
      render json: @report
    else
      render 'edit'
    end
  end

  def delete
    title = 'Melding verwijderen'
    text = "Deze melding verwijderen?"
    render partial: 'delete', locals: { title: title, text: text, report: @report,
                                               el: @report, controller_route: 'reports' }
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
    params.require(:report).permit(:title, :description, :address, :email, :town, :latitude, :status,
                                   :longitude, :resolved_at, :image_one, :image_two, :image_three,
                                   :community_check_name, report_category_attributes: [:category_id])
  end
end
