module ApplicationHelper
  def current_page_class(link_path)
    current_page?(link_path) ? 'active' : ' '
  end

  def notifications_count(user_id)
    Notification.where(read: false, user_id: user_id).count
  end
end
