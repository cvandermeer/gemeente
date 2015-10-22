class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin!, only: :index

  def show
    @user = User.find(params[:id])
    if current_user.community?
      @reports = current_user.community.reports
    else
      @reports = current_user.reports
    end
  end

  def index
  end
end
