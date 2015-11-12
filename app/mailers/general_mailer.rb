class GeneralMailer < ApplicationMailer
  def new_community(community)
    @community_name = community.name
    mail(subject: 'Er is een nieuwe gemeente aangemaakt!')
  end

  def send_message(message)
    @name = message.name
    @email = message.email
    @body = message.body
    mail(subject: "#{@name} wilt contact met je opnemen.")
  end
end
