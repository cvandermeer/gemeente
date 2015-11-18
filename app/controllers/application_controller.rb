class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def authenticate_community!
    redirect_to root_path, alert: 'U bent niet gemachtigd!' unless current_user.community?
  end

  def authenticate_admin!
    redirect_to root_path, alert: 'U bent niet gemachtigd!' unless current_user.admin?
  end
end
