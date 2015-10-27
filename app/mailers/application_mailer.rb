class ApplicationMailer < ActionMailer::Base
  default from: Proc.new { ['cvandemeer@live.nl', 'bart-hoekstra@live.nl'] }
  layout 'mailer'
end
