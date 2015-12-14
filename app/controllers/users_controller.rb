class UsersController < ApplicationController
  before_action :authenticate_admin!, only: [:index, :new_admin_user]
  before_action :authenticate_community!, only: [:new_community_admin_user]
  before_action :authenticate_user!
  before_action :set_user_params, only: :generate_user
  layout false, only: [:new_admin_user, :new_community_admin_user]

  def index
    @users = User.all
  end

  def profile
    @community_reports = current_user.community.try(:reports)
    @community_subscription = CommunitySubscription.new
    @community_list = Community.all - current_user.communities
  end

  def reports
  end

  def notifications
    @notifications = current_user.notifications.order('created_at DESC').paginate(page: params[:page],
                                                                                  per_page: 5).order('created_at DESC')
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

  def new_community_admin_user
    @user = User.new
  end

  def generate_community_admin_user
    community = current_user.community
    @email = params[:user][:email]
    @generated_password = Devise.friendly_token.first(8)
    User.create!(email: @email, password: @generated_password, role_id: 1, community: community)
    GeneralMailer.generated_user(@email, @generated_password).deliver
    redirect_to community_admin_dashboard_path,
                notice: "Gebruiker #{@email} aangemaakt met wachtwoord #{@generated_password}"
  end

  private

  def set_user_params
    @role_id = params[:user][:role_id]
    @community_id = nil
    @community_id = params[:user][:community_id] if @role_id.to_i == 1
    @email = params[:user][:email]
  end
end
