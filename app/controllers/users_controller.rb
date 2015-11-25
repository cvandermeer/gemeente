class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin!, only: [:index]
  layout false, only: [:new]

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def generate_user
    @email = params[:user][:email]
    @generated_password = Devise.friendly_token.first(8)
    user = User.create!(email: @email, password: @generated_password)
    GeneralMailer.generated_user(@email, @generated_password).deliver
    redirect_to admin_panel_path, notice: "Gebruiker #{@email} aangemaakt met wachtwoord #{@generated_password}"
  end
end
