class NotificationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_notification

  def read
    if @notification.update(read: true)
      render json: @notification
    end
  end

  def destroy
    render json: @notification if @notification.destroy
  end

  private

  def set_notification
    @notification = Notification.find(params[:id])
  end
end
