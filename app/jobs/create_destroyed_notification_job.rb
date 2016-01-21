class CreateDestroyedNotificationJob < ActiveJob::Base
  queue_as :default

  def perform(report)
    Notification.create(title: "Uw melding: #{report.category.title} is verwijderd",
                        user_id: report.user_id,
                        category_id: Notification::CATEGORY_RECORD_DESTROYED,
                        record_id: report.id)
  end
end
