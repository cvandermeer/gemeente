class GeneralMailer < ApplicationMailer
  def new_community(community)
    @community = community
    mail(subject: 'Er is een nieuwe gemeente aangemaakt!')
  end
end
