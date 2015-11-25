class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin!, only: [:index]
  layout false, only: [:new]

  def profile
    @user = current_user
    @reports = @user.reports
    @community_reports = @user.community.reports if @user.community
  end

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def generate_user
    @email = params[:user][:email]
    generated_password = Devise.friendly_token.first(8)
    user = User.create!(email: @email, password: generated_password)
    RegistrationMailer.welcome(user, generated_password).deliver
    redirect_to admin_panel, notice: "Registratiemail verstuurd naar #{@email}"
  end
end
