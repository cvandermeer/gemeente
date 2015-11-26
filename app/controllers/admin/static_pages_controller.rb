module Admin
  class StaticPagesController < ApplicationController
    before_action :authenticate_admin!

    def dashboard
    end

    def users
      @users = User.paginate(page: params[:page], per_page: 20)
    end

    def communities
      @communities = Community.paginate(page: params[:page], per_page: 20)
    end
  end
end
