class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin!, only: [:index]

  def profile
    @user = current_user
    @reports = @user.reports
    @community_reports = @user.community.reports if @user.community
  end

  def index
    @users = User.all
  end
end
