module CommunityAdmin
  class StaticPagesController < ApplicationController
    before_action :authenticate_community!
    before_action :set_community

    def dashboard
      @users = @community.users.paginate(page: params[:page], per_page: 20)
    end

    def users
      @subscribers = @community.subscribers.paginate(page: params[:page], per_page: 20)
    end

    def reports
      @reports = @community.reports
    end

    private

    def set_community
      @community = current_user.community
    end
  end
end
