class NewslettersController < ApplicationController
  before_action :set_newsletter, only: [:show]
  before_action :authenticate_community!, only: [:new, :create]
  layout false, only: [:new]

  def index
    if current_user && current_user.community
      @newsletters = current_user.community.newsletters.reverse
    else
      @newsletters = Newsletter.all.reverse
    end
  end

  def show
  end

  def new
    @newsletter = Newsletter.new
    render 'form'
  end

  def create
    @newsletter = Newsletter.new(newsletter_params)
    @newsletter.community = current_user.community
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
