class CommunitiesController < ApplicationController
  layout false

  def index
    @communities = Community.all
  end

  def show
    @community = Community.find(params[:id])
    @reports = @community.reports.unresolved
  end
end
