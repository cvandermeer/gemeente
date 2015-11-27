module ApplicationHelper
  def current_page_class(link_path)
    current_page?(link_path) ? 'active' : ''
  end
end
