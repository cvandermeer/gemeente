class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def after_sign_in_path_for(_)
    if current_user.user?
      reports_path
    elsif current_user.community?
      community_dashboard_path
    elsif current_user.admin?
      admin_dashboard_path
    end
  end
end
