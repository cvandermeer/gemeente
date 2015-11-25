class StaticPagesController < ApplicationController
  before_action :authenticate_admin!

  def admin_panel
    @users = User.all
    @communities = Community.all
  end
end
