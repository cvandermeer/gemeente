class UsersController < ApplicationController
  before_action :authenticate_admin!, only: [:index, :new_admin_user, :generate_user]
  before_action :authenticate_user!
  before_action :get_user_params, only: :generate_user
  layout false, only: [:new_admin_user]

  def index
    @users = User.all
  end

  def profile
    @user = current_user
    @reports = current_user.reports
    @community_reports = @user.try(:community_reports)
    @community_subscription = CommunitySubscription.new
    @community_list = Community.all - current_user.communities
  end

  def reports
  end

  def notifications
>>>>>>> cd439a7b7144b03ab538e07c9721c26489049dc4
  end

  def new_admin_user
    @user = User.new
  end

  def generate_user
    @generated_password = Devise.friendly_token.first(8)
    User.create!(email: @email, password: @generated_password, role_id: @role_id.to_i, community_id: @community_id)
    GeneralMailer.generated_user(@email, @generated_password).deliver
    redirect_to admin_users_path, notice: "Gebruiker #{@email} aangemaakt met wachtwoord #{@generated_password}"
  end

  private

  def get_user_params
    @role_id = params[:user][:role_id]
    @community_id = nil
    @community_id = params[:user][:community_id] if @role_id.to_i == 1
    @email = params[:user][:email]
  end
end
