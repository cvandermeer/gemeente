class CreateNotificationJob < ActiveJob::Base
  queue_as :default

  def perform(report)
    Notification.create(title: 'Melding aangemaakt!',
                        user_id: report.user,
                        category_id: Notification::CATEGORY_REPORT,
                        record_id: report.id)
  end
end
