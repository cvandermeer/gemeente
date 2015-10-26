class GeneralMailer < ActionMailer::Base
  default from: 'ikbeninwoner.nl'

  def new_community_notice
    recipient = 'cvandermeer@live.nl'
    subject = 'Nieuwe Gemeente'
    mail(to: recipient, subject: subject)
  end
end
