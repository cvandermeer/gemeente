class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin!, only: [:index]

  def show
    @user = User.find(params[:id])
    @reports = @user.reports
    @community_reports = @user.community.reports if @user.community?
  end

  def index
    @users = User.all
  end
end
