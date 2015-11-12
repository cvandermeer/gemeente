# Preview all emails at http://localhost:3000/rails/mailers/general_mailer
class GeneralMailerPreview < ActionMailer::Preview
  def send_community_notice_preview
    GeneralMailer.new_community(Community.first)
  end
end
