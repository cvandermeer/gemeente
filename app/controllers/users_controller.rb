class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin!, only: [:index]

  def profile
    @community_subscription = CommunitySubscription.new
    @community_list = Community.all - current_user.communities
  end

  def reports
  end

  def notifications
  end

  def index
    @users = User.all
  end
end
