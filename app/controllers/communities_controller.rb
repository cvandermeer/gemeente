class CommunitiesController < ApplicationController
  before_action :authenticate_user!

  def index
    @communities = Community.all
  end
end
