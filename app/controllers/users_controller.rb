class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin!, only: [:index]

  def profile
    @community_subscription = CommunitySubscription.new
    @community_list = Community.all - current_user.communities
  end

  def user_reports
  end

  def user_notifications
  end

  def index
    @users = User.all
  end
end
