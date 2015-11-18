class NewslettersController < ApplicationController
  before_action :set_newsletter, only: [:show]
  layout false, only: [:new]

  def index
    @newsletters = Newsletter.all.reverse
  end

  def show
  end

  def new
    @newsletter = Newsletter.new
    render 'form'
  end

  def create
    @newsletter = Newsletter.new(newsletter_params)
    redirect_to newsletters_path if @newsletter.save
  end

  private

  def set_newsletter
    @newsletter = Newsletter.find(params[:id])
  end

  def newsletter_params
    params.require(:newsletter).permit(:title, :body, :valid_from, :valid_until)
  end
end
