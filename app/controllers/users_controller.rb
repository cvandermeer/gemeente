class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = User.find(params[:id])
    if current_user.community?
      @reports = current_user.community.reports
    else
      @reports = current_user.reports
    end
  end
end
