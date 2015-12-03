class DeliveriesController < ApplicationController
  def create
    @delivery = Delivery.new(delivery_params)
    if @delivery.save
    else
    end
  end

  private

  def delivery_params
    params.require(:delivery).permit(:streets, :newsletter_id)
  end
end
