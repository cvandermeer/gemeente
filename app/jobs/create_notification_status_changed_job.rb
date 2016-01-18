class CreateNotificationStatusChangedJob < ActiveJob::Base
  queue_as :default

  def perform(report)
    Notification.create(title: "De status van uw melding is verandert naar: #{report.status}",
                        user_id: report.user_id,
                        category_id: Notification::CATEGORY_REPORT,
                        record_id: report.id)
  end
end
