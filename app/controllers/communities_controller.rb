class CommunitiesController < ApplicationController
  layout false, only: [:community_list]
  before_action :set_community, only: [:news, :show, :update]

  def index
    @communities = Community.all
  end

  def community_list
    @communities = Community.all
  end

  def news
    @newsletters = @community.newsletters.reverse
  end

  def show
  end

  def update
    if @community.update(community_params)
      redirect_to community_admin_dashboard_path, notice: 'Gemeente aangepast'
    else
      redirect_to community_admin_dashboard_path, alert: 'Er is iets misgegaan!'
    end
  end

  private

  def set_community
    @community = Community.find(params[:id])
  end

  def community_params
    params.require(:community).permit(:avatar)
  end
end
