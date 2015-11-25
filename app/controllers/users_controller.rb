class UsersController < ApplicationController
  #before_action :authenticate_admin!, only: [:index, :new_admin_user, :generate_user]
  layout false, only: [:new_admin_user]

  def index
    @users = User.all
  end

  def profile
    @user = current_user
    @reports = current_user.reports
    @community_reports = @user.try(:community_reports)
  end

  def new_admin_user
    @user = User.new
  end

  def generate_user
    role_id = params[:user][:role_id]
    @email = params[:user][:email]
    @generated_password = Devise.friendly_token.first(8)
    user = User.create!(email: @email, password: @generated_password, role_id: role_id.to_i)
    GeneralMailer.generated_user(@email, @generated_password).deliver
    redirect_to admin_panel_path, notice: "Gebruiker #{@email} aangemaakt met wachtwoord #{@generated_password}"
  end
end
