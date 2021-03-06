class NewslettersController < ApplicationController
  before_action :set_newsletter, only: [:show]
  before_action :set_community, only: [:community_index]
  before_action :authenticate_community!, only: [:new, :create]
  layout false, only: [:new]

  def index
    @communities = Community.all
    @newsletters = Newsletter.all.paginate(page: params[:page], per_page: 5).order('created_at DESC')
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
    @newsletter.user = current_user
    if @newsletter.save
      redirect_to newsletter_path(@newsletter), notice: 'Nieuwsbrief aangemaakt'
    else
      redirect_to newsletters_path, alert: 'Er is iets misgegaan'
    end
  end

  private

  def set_newsletter
    @newsletter = Newsletter.find(params[:id])
  end

  def set_community
    @community = Community.find(params[:community_id])
  end

  def newsletter_params
    params.require(:newsletter).permit(:title, :body, :valid_from, :valid_until, :pdf)
  end
end
