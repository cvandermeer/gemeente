class GeneralMailer < ApplicationMailer
  def new_community_notice
    mail(to: 'cvandermeer@live.nl', subject: 'Nieuwe Gemeente')
  end
end
