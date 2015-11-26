class CommunitySubscriptionsController < ApplicationController
  before_action :authenticate_user!

  def create
    @community_list = Community.all - current_user.communities
    @community_subscription = CommunitySubscription.new(community_subscription_params)
    @community_subscription.user_id = current_user.id
    if @community_subscription.save
      redirect_to profile_path, notice: "Uw volgt nu de gemeente: #{@community_subscription.community.name}"
    else
      redirect_to profile_path, notice: "Kies een gemeente om the volgen!"
    end
  end

  def delete
    @community_subscription = CommunitySubscription.find(params[:id])
    render json: @community_subscription
  end

  def destroy
    @community_subscription = CommunitySubscription.find(params[:id])
    if @community_subscription.destroy
      redirect_to profile_path, notice: "U volgt niet langer de gemeente: #{@community_subscription.community.name}"
    end
  end

  private

  def community_subscription_params
    params.require(:community_subscription).permit(:community_id)
  end

end
