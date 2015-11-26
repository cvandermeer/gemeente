class CommunitySubscriptionsController < ApplicationController
  layout false, only: :delete

  before_action :authenticate_user!
  before_action :set_community_subscription, only: [:delete, :destroy]
  before_action :check_community_subscription_owner, only: [:delete, :destroy]

  def create
    @community_subscription = CommunitySubscription.new(community_subscription_params)
    @community_subscription.user = current_user
    if @community_subscription.save
      redirect_to profile_path, notice: "Uw volgt nu de gemeente: #{@community_subscription.community.name}"
    else
      redirect_to profile_path, notice: 'Kies een gemeente om the volgen!'
    end
  end

  def delete
    title = 'Gemeente niet meer volgen!'
    text = "Weet uw zeker dat u de gemeente: #{@community_subscription.community.name} niet meer wil volgen"
    render partial: 'shared/delete', locals: { title: title, text: text,
                                               el: @community_subscription, controller_route: 'reports' }
  end

  def destroy
    @community_subscription.destroy
    redirect_to profile_path, notice: "U volgt niet langer de gemeente: #{@community_subscription.community.name}"
  end

  private

  def set_community_subscription
    @community_subscription = CommunitySubscription.find(params[:id])
  end

  def check_community_subscription_owner
    redirect_to root_path, notice: 'U bent niet gemachtigd!' if @community_subscription.user != current_user
  end

  def community_subscription_params
    params.require(:community_subscription).permit(:community_id)
  end
end
