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
      @reports_stasuses = [@community.reports.todo, @community.reports.doing, @community.reports.done]
    end

    def location_news
      @deliveries = @community.deliveries
    end

    private

    def set_community
      @community = current_user.community
    end
  end
end
