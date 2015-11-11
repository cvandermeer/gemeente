class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin!, only: [:index]

  def show
    @user = User.find(params[:id])
    @reports = @user.reports
  end

  def index
    @users = User.all
  end
end
