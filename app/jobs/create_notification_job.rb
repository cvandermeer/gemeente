class CreateNotificationJob < ActiveJob::Base
  queue_as :default

  def perform(report)
    Notification.create(title: "Uw melding: #{report.category.title} is aangemaakt",
                        user_id: report.user_id,
                        category_id: Notification::CATEGORY_REPORT,
                        record_id: report.id)
  end
end
