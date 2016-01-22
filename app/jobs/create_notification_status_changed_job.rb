class CreateNotificationStatusChangedJob < ActiveJob::Base
  queue_as :default

  def perform(report, status)
    Notification.create(title: "De status van uw melding: #{report.category.title} is verandert naar: #{status}",
                        user_id: report.user_id,
                        category_id: Notification::CATEGORY_REPORT,
                        record_id: report.id)
  end
end
