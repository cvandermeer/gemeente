class CommunitiesController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin!

  def index
    @communities = Community.all
  end
end
