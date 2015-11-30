module CommunityAdmin
  class StaticPagesController < ApplicationController
    before_action :authenticate_community!

    def dashboard
      @community = current_user.community
      @subscribers = @community.subscribers.paginate(page: params[:page], per_page: 20)
    end

    def users
      @community = current_user.community
      @users = @community.users.paginate(page: params[:page], per_page: 20)
    end
  end
end
