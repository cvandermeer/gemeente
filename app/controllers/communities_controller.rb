class CommunitiesController < ApplicationController
  layout false, only: [:community_list]
  before_action :set_community, only: [:news, :show]

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

  private

  def set_community
    @community = Community.find(params[:id])
  end
end
