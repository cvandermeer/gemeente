class CommunitySuscriptionsController < ApplicationController
  before_action :authenticate_user!

  def new
    @community_subscription = CommunitySubscription.new()
  end

  def create
    @community_subscription = CommunitySubscription.new(community_subscription_params)
    @community_subscription.user_id = current_user.id
    if @community_subscription.save
      render json: @community_subscription
    end
  end

  def destroy
    @community_subscription = CommunitySubscription.find(params[:id])
  end

  private

  def community_subscription_params
    params.require(:community_subscription).permit(:community_id)
  end

end
