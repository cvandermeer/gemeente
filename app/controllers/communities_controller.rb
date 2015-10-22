class CommunitiesController < ApplicationController
  before_action :authenticate_user!, :authenticate_admin!

  def index
    @communities = Community.all
  end
end
