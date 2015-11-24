class CreateNotificationJob < ActiveJob::Base
  queue_as :default

  def perform(user)
    Notification.create(title: 'Melding aangemaakt!',
                        user: user,
                        category_id: Notification::CATEGORY_REPORT)
  end
end
