class GeneralMailer < ApplicationMailer
  def new_community_notice
    mail(subject: 'Nieuwe Gemeente')
  end
end
