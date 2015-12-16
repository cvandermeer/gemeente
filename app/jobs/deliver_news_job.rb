class DeliverNewsJob < ActiveJob::Base
  queue_as :default

  def perform(delivery)
    streets = delivery.streets
    newsletter_id = delivery.newsletter_id
    User.where(street: streets).each do |user|
      Notification.create(title: 'Je hebt nieuws ontvangen',
                          user_id: user.id,
                          category_id: Notification::CATEGORY_NEWS,
                          record_id: newsletter_id)
    end
  end
end
