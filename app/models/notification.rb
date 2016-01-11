class Notification < ActiveRecord::Base
  ### ASSOCIATIONS ###
  belongs_to :user

  ### CONSTANTS ###
  CATEGORY_REPORT = 0
  CATEGORY_NEWS = 1

  enum category_id: {
    report: CATEGORY_REPORT,
    news: CATEGORY_NEWS
  }

  ### CALLBACKS ###
  after_create :send_notification_email

  def send_notification_email
    GeneralMailer.new_notification(self).deliver_later if user && user.get_mail?
  end
end
