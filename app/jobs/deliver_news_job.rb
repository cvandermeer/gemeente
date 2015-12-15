class DeliverNewsJob < ActiveJob::Base
  queue_as :default

  def perform(delivery)
    streets = delivery.streets
    User.where(street: streets).each do |user|
      Notification.create(title: 'Je hebt nieuws ontvangen',
                          user: user,
                          category_id: Notification::CATEGORY_NEWS)
    end
  end
end
