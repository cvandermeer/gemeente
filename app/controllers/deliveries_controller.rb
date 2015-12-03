class DeliveriesController < ApplicationController
  before_action :authenticate_community!
  layout false, only: :new

  def new
    @delivery = Delivery.new
    @community = current_user.community
    community_name = @community.name
    @streets = Zipcode.where(community: community_name).order(:street).map(&:street).uniq
    @newsletters = @community.newsletters
  end

  def create
    @delivery = Delivery.new(delivery_params)
    @delivery.community = current_user.community
    if @delivery.save
      redirect_to community_admin_location_news_path, notice: 'Melding verstuurd'
    else
      redirect_to community_admin_location_news_path, alert: 'Er is iets misgegaan'
    end
  end

  private

  def delivery_params
    params.require(:delivery).permit(:newsletter_id, streets: [])
  end
end
