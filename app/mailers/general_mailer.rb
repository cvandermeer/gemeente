class GeneralMailer < ApplicationMailer
  def new_community(community)
    @community_name = community.name
    mail(subject: 'Er is een nieuwe gemeente aangemaakt!')
  end

  def new_notification(notification)
    @recipient = notification.user.email
    @subject = notification.title
    mail(subject: @subject, recipient: @recipient)
  end

  def generated_user(email, password)
    @email = email
    @password = password
    mail(subject: 'Er is een account voor je aangemaakt', recipient: @email)
  end
end
