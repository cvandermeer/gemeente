class DeliveriesController < ApplicationController
  before_action :authenticate_community!
  before_action :set_delivery, only: :deliver
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

  def deliver
    @delivery.delivered = true
    @delivery.delivered_at = Time.zone.now
    if @delivery.save
      DeliverNewsJob.perform_later(@delivery)
      redirect_to community_admin_location_news_path, notice: 'Nieuws verstuurd'
    else
      redirect_to community_admin_location_news_path, alert: 'Er is iets foutgegaan'
    end
  end

  private

  def set_delivery
    @delivery = Delivery.find(params[:id])
  end

  def delivery_params
    params.require(:delivery).permit(:newsletter_id, streets: [])
  end
end
